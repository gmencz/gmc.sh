import { addWeeks, getUnixTime, isAfter } from 'date-fns'
import { preValidationHookHandler } from 'fastify'

const isAuthenticatedHook: preValidationHookHandler = async (
  request,
  reply,
) => {
  reply.log.info(request.cookies)
  const sessionData = request.session.get('data')
  if (!sessionData) {
    reply.status(401).send({
      message: 'Sign in required.',
      info: {},
    })
    return
  }

  // If the session is a week old (could be any time before expiry limit but I chose a week)
  // create a new session cookie so we have a session which never expires.
  const sessionCreatedAt = new Date(sessionData.createdAt)
  const sessionRefreshDate = addWeeks(sessionCreatedAt, 1)
  const today = new Date()
  if (isAfter(today, sessionRefreshDate)) {
    const now = new Date()
    const inTwoWeeks = addWeeks(now, 2)
    request.session.options({
      expires: inTwoWeeks,
      maxAge: getUnixTime(inTwoWeeks),
    })
    request.session.set('data', {
      ...sessionData,
      createdAt: new Date().toISOString(),
    })
  }
}

export { isAuthenticatedHook }
