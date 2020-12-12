import { BlobServiceClient } from '@azure/storage-blob'

const AZURE_STORAGE_CONNECTION_STRING = process.env
  .AZURE_STORAGE_CONNECTION_STRING as string

const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING,
)

const containerName = 'profile-pictures'
const profilePicturesClient = blobServiceClient.getContainerClient(
  containerName,
)

export { profilePicturesClient }
