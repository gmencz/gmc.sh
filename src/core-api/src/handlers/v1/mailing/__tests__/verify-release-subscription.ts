import { V1ApiTypes } from '@gmcsh/shared'
import { createTestContext } from 'test/create-test-context'
import { contactsClient, transactionalEmailsClient } from 'utils/sendinblue-api'

const ctx = createTestContext()

const testEmail = 'test@example.com'
const testListId = 1

test('returns a 400 if user is already subscribed to the mailing list', async () => {
  contactsClient.getContactInfo = jest.fn().mockResolvedValueOnce({
    body: { listIds: [testListId] },
  })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/mailing/verify-release-subscription',
    payload: {
      listId: testListId,
      subscriberEmail: testEmail,
    },
  })

  const body = JSON.parse(response.body) as V1ApiTypes.ErrorResponse

  expect(contactsClient.getContactInfo).toHaveBeenCalled()
  expect(contactsClient.getContactInfo).toHaveBeenCalledTimes(1)
  expect(response.statusCode).toBe(400)
  expect(body.message.search(/you're already subscribed/i)).not.toBe(-1)
})

test(`returns a 200 if verification email was successfully sent to the user's email`, async () => {
  contactsClient.getContactInfo = jest.fn().mockResolvedValueOnce({
    body: { listIds: [] },
  })

  transactionalEmailsClient.sendTransacEmail = jest.fn().mockResolvedValueOnce({
    body: { messageId: '1' },
  })

  const response = await ctx.server.inject({
    method: 'POST',
    url: '/v1/mailing/verify-release-subscription',
    payload: {
      listId: testListId,
      subscriberEmail: testEmail,
    },
  })

  const body = JSON.parse(response.body) as V1ApiTypes.JoinMailingListResponse
  expect(response.statusCode).toBe(200)
  expect(body.subscriberEmail).toBe(testEmail)
})
