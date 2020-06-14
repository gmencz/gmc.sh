import { request } from 'graphql-request';

interface NewShortenedUrlMutationVariables {
  urlToShorten: string;
  slugForShortenedURL: string;
}

interface NewShortenedUrlMutationResponse {
  addShortenedResource: {
    shortenedresource: {
      slug: string;
    }[];
  };
}

interface GraphQLError {
  message: string;
}

const urlShortenerForm = document.querySelector(
  '.url-shortener'
) as HTMLFormElement;

urlShortenerForm.addEventListener('submit', async (event) => {
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }

  const urlToShorten = (document.querySelector(
    'input#url-to-shorten'
  ) as HTMLInputElement).value;

  const slugForShortenedURL = (document.querySelector(
    'input#shortened-url-slug'
  ) as HTMLInputElement).value;

  // TODO: Validate form stuff

  const newShortenedURLMutation = `
    mutation ShortenURL(
      $urlToShorten: String!, 
      $slugForShortenedURL: String!
    ) {
      addShortenedResource(input: [{
        originalFQDN: $urlToShorten,
        slug: $slugForShortenedURL
      }]) {
        shortenedresource {
          slug
        }
      }
    }
  `;

  const newShortenedURLMutationVariables: NewShortenedUrlMutationVariables = {
    urlToShorten,
    slugForShortenedURL,
  };

  try {
    const response: NewShortenedUrlMutationResponse = await request(
      'http://localhost:8080/graphql',
      newShortenedURLMutation,
      newShortenedURLMutationVariables
    );

    // Here's the shortened url!
    console.log(
      `https://gmc.sh/${response.addShortenedResource.shortenedresource[0].slug}`
    );
  } catch (error) {
    console.log(error);
    const splitByBracket = error.message.split('{');
    if (splitByBracket.length === 0) {
      console.error(`Something went wrong, we're working on a fix`);
    }

    const [, ...rawGraphQLInfo] = splitByBracket;
    const parsedGraphQLErrors = JSON.parse('{' + rawGraphQLInfo.join('{'))
      .response.errors as GraphQLError[];

    const slugAlreadyExistsError = parsedGraphQLErrors.some((error) =>
      error.message.includes('already exists')
    );

    if (slugAlreadyExistsError) {
      console.error('Slug already exists');
    }
  }
});
