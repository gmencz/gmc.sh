import { V1ApiTypes } from '@gmcsh/shared'
import { FastifyPluginCallback } from 'fastify'
import { joinMailingList } from 'handlers/v1/mailing/join-mailing-list'
import { verifyReleaseSubscription } from 'handlers/v1/mailing/verify-release-subscription'

const mailingRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.post(
    '/join-list',
    {
      schema: { body: V1ApiTypes['confirmJoinMailingListBody'] },
      attachValidation: true,
    },
    joinMailingList,
  )

  instance.post(
    '/verify-release-subscription',
    {
      schema: { body: V1ApiTypes['joinMailingListBody'] },
      attachValidation: true,
    },
    verifyReleaseSubscription,
  )

  next()
}

export { mailingRoutes }
