import {
  ContactsApiApiKeys,
  ContactsApi,
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} from 'sib-api-v3-typescript'

const contactsClient = new ContactsApi()
contactsClient.setApiKey(
  ContactsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY as string,
)

const transactionalEmailsClient = new TransactionalEmailsApi()
transactionalEmailsClient.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY as string,
)

export { contactsClient, transactionalEmailsClient }
