import {
  ContactsApiApiKeys,
  ContactsApi,
  SMTPApi,
  SMTPApiApiKeys,
} from 'sib-api-v3-typescript'

const contactsClient = new ContactsApi()
contactsClient.setApiKey(
  ContactsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY as string,
)

const transactionalEmailsClient = new SMTPApi()
transactionalEmailsClient.setApiKey(
  SMTPApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY as string,
)

export { contactsClient, transactionalEmailsClient }
