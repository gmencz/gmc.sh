import { handleValidationError } from 'utils/handle-validation-error'

test('Returns friendly error message for missing properties', () => {
  const validationErrors = [
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: {
        missingProperty: 'username',
      },
      message: "should have required property 'username'",
    },
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: {
        missingProperty: 'email',
      },
      message: "should have required property 'email'",
    },
    {
      keyword: 'required',
      dataPath: '',
      schemaPath: '#/required',
      params: {
        missingProperty: 'password',
      },
      message: "should have required property 'password'",
    },
  ]

  const handledErrors = handleValidationError(validationErrors)
  expect(handledErrors).toHaveLength(3)
  expect(handledErrors[0].friendlyMessage).toBe('Please, provide an username.')
  expect(handledErrors[1].friendlyMessage).toBe('Please, provide an email.')
  expect(handledErrors[2].friendlyMessage).toBe('Please, provide a password.')
})

test('Returns a friendly error message for too long/short properties', () => {
  const validationErrors = [
    {
      keyword: 'maxLength',
      dataPath: '.username',
      schemaPath: '#/properties/username/maxLength',
      params: { limit: 255 },
      message: 'should NOT be longer than 255 characters',
    },
    {
      keyword: 'minLength',
      dataPath: '.password',
      schemaPath: '#/properties/password/maxLength',
      params: { limit: 6 },
      message: 'should NOT be shorter than 6 characters',
    },
  ]

  const handledErrors = handleValidationError(validationErrors)
  expect(handledErrors).toHaveLength(2)
  expect(handledErrors[0].friendlyMessage).toBe(
    'username should NOT be longer than 255 characters.',
  )
  expect(handledErrors[1].friendlyMessage).toBe(
    'password should NOT be shorter than 6 characters.',
  )
})

test('returns the original validation error as part of the info object', () => {
  const validationErrors = [
    {
      keyword: 'maxLength',
      dataPath: '.username',
      schemaPath: '#/properties/username/maxLength',
      params: { limit: 255 },
      message: 'should NOT be longer than 255 characters',
    },
  ]

  const handledErrors = handleValidationError(validationErrors)
  expect(handledErrors).toHaveLength(1)
  expect(handledErrors[0].info).toMatchInlineSnapshot(`
    Object {
      "dataPath": ".username",
      "keyword": "maxLength",
      "message": "should NOT be longer than 255 characters",
      "params": Object {
        "limit": 255,
      },
      "schemaPath": "#/properties/username/maxLength",
    }
  `)
})
