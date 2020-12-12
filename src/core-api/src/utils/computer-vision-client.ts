import { ComputerVisionClient } from '@azure/cognitiveservices-computervision'
import { ApiKeyCredentials } from '@azure/ms-rest-js'

const contentModeratorKey = process.env.AZURE_COGNITIVE_SERVICES_KEY as string

const contentModeratorEndpoint = process.env
  .AZURE_COGNITIVE_SERVICES_ENDPOINT as string

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({
    inHeader: { 'Ocp-Apim-Subscription-Key': contentModeratorKey },
  }),
  contentModeratorEndpoint,
)

export { computerVisionClient }
