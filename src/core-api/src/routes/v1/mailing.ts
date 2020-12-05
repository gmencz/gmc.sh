import { joinMailingListBody } from '@gmcsh/shared/src/types/core-api/v1'
import { FastifyPluginCallback } from 'fastify'
import { joinMailingList } from 'handlers/v1/mailing/join-mailing-list'
import { verifyReleaseSubscription } from 'handlers/v1/mailing/verify-release-subscription'

const mailingRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.post(
    '/join-list',
    {
      schema: { body: joinMailingListBody },
      attachValidation: true,
    },
    joinMailingList,
  )

  instance.post(
    '/verify-release-subscription',
    {
      schema: { body: joinMailingListBody },
      attachValidation: true,
    },
    verifyReleaseSubscription,
  )

  next()
}

export { mailingRoutes }
