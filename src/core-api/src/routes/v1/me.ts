import { V1ApiTypes } from '@gmcsh/shared'
import { FastifyPluginCallback } from 'fastify'
import multer from 'fastify-multer'
import { me } from 'handlers/v1/me'
import { updateProfilePicture } from 'handlers/v1/me/update-profile-picture'
import { isAuthenticatedHook } from 'hooks/is-authenticated'

const storage = multer.memoryStorage()
const upload = multer({ storage })

const meRoutes: FastifyPluginCallback = (instance, _, next) => {
  instance.get<{
    Reply: V1ApiTypes.ErrorResponse | V1ApiTypes.MeResponse
  }>('/', { preValidation: isAuthenticatedHook }, me)

  instance.post<{
    Reply: V1ApiTypes.ErrorResponse | V1ApiTypes.MeResponse
  }>(
    '/update-profile-picture',
    {
      preHandler: upload.single('newProfilePicture'),
      preValidation: isAuthenticatedHook,
    },
    updateProfilePicture,
  )

  next()
}

export { meRoutes }
