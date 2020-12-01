jest.setTimeout(10000)

jest.mock('firebase-admin', () => {
  return {
    initializeApp: jest.fn(),
    auth: jest.fn(() => {
      return {
        createCustomToken: jest.fn(() => Promise.resolve('test_custom_token')),
        verifyIdToken: jest.fn(() => {
          return {
            auth_time: new Date().getTime() / 1000,
          }
        }),
        createSessionCookie: jest.fn(() =>
          Promise.resolve('test_session_cookie'),
        ),
        verifySessionCookie: jest.fn(() => {
          return {
            auth_time: new Date().getTime() / 1000,
            uid: '123',
          }
        }),
      }
    }),
  }
})

jest.mock('firebase', () => {
  return {
    initializeApp: jest.fn(),
    auth: jest.fn(() => {
      return {
        signInWithCustomToken: jest.fn(() => {
          return {
            user: {
              getIdToken: jest.fn(() => Promise.resolve('test_id_token')),
            },
          }
        }),
      }
    }),
  }
})
