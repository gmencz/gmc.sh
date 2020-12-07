import { V1ApiTypes } from '@gmcsh/shared'
import { Static } from '@sinclair/typebox'
import jwt from 'jsonwebtoken'
import { createTestContext } from 'test/create-test-context'
import { contactsClient } from 'utils/sendinblue-api'

const ctx = createTestContext()

const testListId = 1
const testSubscriberEmail = 'test@example.com'
const testSubscriberId = 1

test('returns a 400 if the token is invalid/expired', async () => {
  ;(jwt.verify as any) = jest
    .fn()
    .mockImplementationOnce((_token, _secret, cb) =>
      cb(new jwt.JsonWebTokenError('Invalid JWT')),
    )

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/mailing/join-list',
    payload: {
      token: '123',
    },
  })

  const body = JSON.parse(response.body) as V1ApiTypes.ErrorResponse
  expect(response.statusCode).toBe(400)
  expect(body.message.search(/invalid link/i)).not.toBe(-1)
  expect(jwt.verify).toHaveBeenCalled()
  expect(jwt.verify).toHaveBeenCalledTimes(1)
})

test('adds contact to mailing list if the contact already exists', async () => {
  ;(jwt.verify as any) = jest
    .fn()
    .mockImplementationOnce((_token, _secret, cb) =>
      cb(null, {
        listId: testListId,
        subscriberEmail: testSubscriberEmail,
      } as Static<typeof V1ApiTypes['joinMailingListBody']>),
    )

  contactsClient.createContact = jest
    .fn()
    .mockRejectedValueOnce({
      response: { body: { code: 'duplicate_parameter' } },
    })

  contactsClient.addContactToList = jest
    .fn()
    .mockResolvedValueOnce({ body: { contacts: [testSubscriberId] } })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/mailing/join-list',
    payload: {
      token: '123',
    },
  })

  const body = JSON.parse(response.body) as V1ApiTypes.JoinMailingListResponse
  expect(body.subscriberEmail).toBe(testSubscriberEmail)
  expect(jwt.verify).toHaveBeenCalled()
  expect(jwt.verify).toHaveBeenCalledTimes(1)
  expect(contactsClient.createContact).toHaveBeenCalled()
  expect(contactsClient.createContact).toHaveBeenCalledTimes(1)
  expect(contactsClient.createContact).toHaveBeenCalledWith({
    email: testSubscriberEmail,
  })
  expect(contactsClient.addContactToList).toHaveBeenCalled()
  expect(contactsClient.addContactToList).toHaveBeenCalledTimes(1)
  expect(contactsClient.addContactToList).toHaveBeenCalledWith(testListId, {
    emails: [testSubscriberEmail],
  })
})

test(`creates contact if it doesn't exist and adds it to mailing list`, async () => {
  ;(jwt.verify as any) = jest
    .fn()
    .mockImplementationOnce((_token, _secret, cb) =>
      cb(null, {
        listId: testListId,
        subscriberEmail: testSubscriberEmail,
      } as Static<typeof V1ApiTypes['joinMailingListBody']>),
    )

  contactsClient.createContact = jest
    .fn()
    .mockResolvedValueOnce({ body: { id: testSubscriberId } })

  contactsClient.addContactToList = jest
    .fn()
    .mockResolvedValueOnce({ body: { contacts: [testSubscriberId] } })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/mailing/join-list',
    payload: {
      token: '123',
    },
  })

  const body = JSON.parse(response.body) as V1ApiTypes.JoinMailingListResponse
  expect(body.subscriberEmail).toBe(testSubscriberEmail)
  expect(jwt.verify).toHaveBeenCalled()
  expect(jwt.verify).toHaveBeenCalledTimes(1)
  expect(contactsClient.createContact).toHaveBeenCalled()
  expect(contactsClient.createContact).toHaveBeenCalledTimes(1)
  expect(contactsClient.createContact).toHaveBeenCalledWith({
    email: testSubscriberEmail,
  })
  expect(contactsClient.addContactToList).toHaveBeenCalled()
  expect(contactsClient.addContactToList).toHaveBeenCalledTimes(1)
  expect(contactsClient.addContactToList).toHaveBeenCalledWith(testListId, {
    emails: [testSubscriberEmail],
  })
})
