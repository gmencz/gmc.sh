jest.mock('next-iron-session')

class MockIronStore {
  private static instance: MockIronStore

  private saved: { [key: string]: string | Record<string, unknown> | number }

  private unsaved: { [key: string]: string | Record<string, unknown> | number }

  private constructor() {
    this.saved = {}
    this.unsaved = {}
  }

  static getOrCreateStore(): MockIronStore {
    if (!MockIronStore.instance) {
      MockIronStore.instance = new MockIronStore()
    }
    return MockIronStore.instance
  }

  get(key: string) {
    return this.unsaved[key] || undefined
  }

  set(key: string, val: string | Record<string, unknown> | number) {
    this.unsaved[key] = val
  }

  unset(key: string) {
    delete this.unsaved[key]
  }

  seal() {
    this.saved = { ...this.unsaved }
  }

  clear() {
    this.unsaved = {}
  }
}
function throwOnNoPassword() {
  throw new Error('next-iron-session: Missing parameter `password`')
}

function throwOnNoCookieName() {
  throw new Error('next-iron-session: Missing parameter `cookieName`')
}

const applySession = jest.fn().mockImplementation(req => {
  const store = MockIronStore.getOrCreateStore()

  const session = {
    set: store.set.bind(store),
    get: store.get.bind(store),
    unset: store.unset,
    save() {
      store.seal()
    },
    destroy() {
      store.clear()
    },
  }

  req.session = session
})

const mockThrowOnNoCookieName = jest.fn()
const mockThrowOnNoPassword = jest.fn()

const withIronSession = jest
  .fn()
  .mockImplementation(
    (
      withIronSessionWrapperHandler,
      {
        ttl = 15 * 24 * 3600,
        cookieName = throwOnNoCookieName(),
        password = throwOnNoPassword(),
        cookieOptions = {},
      },
    ) => {
      return jest.fn().mockImplementation((...args) => {
        const handlerType = args[0] && args[1] ? 'api' : 'ssr'
        const req = handlerType === 'api' ? args[0] : args[0].req
        const res = handlerType === 'api' ? args[1] : args[0].res

        applySession(req, res, { ttl, cookieName, password, cookieOptions })

        return withIronSessionWrapperHandler(...args)
      })
    },
  )

export default { MockIronStore }
export {
  mockThrowOnNoCookieName as throwOnNoCookieName,
  mockThrowOnNoPassword as throwOnNoPassword,
  withIronSession,
  applySession,
}
