import { joinMailingListQuerystring } from '@gmcsh/shared/src/types/core-api/v1'
import { FastifyPluginCallback } from 'fastify'
import { joinMailingList } from 'handlers/v1/mailing/join-mailing-list'

const mailingRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.post(
    'join-list',
    {
      schema: { querystring: joinMailingListQuerystring },
      attachValidation: true,
    },
    joinMailingList,
  )

  next()
}

export { mailingRoutes }
