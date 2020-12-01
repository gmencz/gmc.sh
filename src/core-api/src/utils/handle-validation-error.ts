interface ValidationError {
  keyword: string
  dataPath: string
  schemaPath: string
  params: Record<string, string | number>
  message: string
  useDefaultMessage?: boolean
}

interface HandledError {
  friendlyMessage: string
  info: ValidationError
}

const startsWithVowel = (word: string) => {
  const vowels = ['a', 'e', 'i', 'o', 'u']
  return vowels.includes(word.trim()[0])
}

function handleValidationError(errors: ValidationError[]): HandledError[] {
  return errors.map(error => {
    if (error.useDefaultMessage) {
      return {
        friendlyMessage: error.message,
        info: {
          ...error,
        },
      }
    }

    let friendlyMessage = 'Oops! Something went wrong processing your request.'

    if (error.params.missingProperty) {
      const { missingProperty } = error.params
      friendlyMessage = `Please, provide ${
        startsWithVowel(missingProperty as string) ? 'an' : 'a'
      } ${missingProperty}.`
    } else if (error.params.format) {
      const dataPath = error.dataPath.split('.')
      const errorProperty = dataPath[dataPath.length - 1]
      friendlyMessage = `Invalid ${errorProperty}, please check its format.`
    } else {
      const dataPath = error.dataPath.split('.')
      const errorProperty = dataPath[dataPath.length - 1]
      friendlyMessage = `${errorProperty} ${error.message}.`
    }

    return {
      friendlyMessage,
      info: {
        ...error,
      },
    }
  })
}

export { handleValidationError }
