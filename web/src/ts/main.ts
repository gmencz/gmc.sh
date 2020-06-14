import { request } from 'graphql-request';

interface NewShortenedUrlMutationVariables {
  urlToShorten: string;
  slugForShortenedURL: string;
}

const urlShortenerForm = document.querySelector(
  '.url-shortener'
) as HTMLFormElement;

urlShortenerForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const urlToShorten = (document.querySelector(
    'input#url-to-shorten'
  ) as HTMLInputElement).value;

  const slugForShortenedURL = (document.querySelector(
    'input#shortened-url-slug'
  ) as HTMLInputElement).value;

  // TODO: Validate form stuff

  console.log(urlToShorten);
  console.log(slugForShortenedURL);

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
          originalFQDN
        }
        numUids
      }
    }
  `;

  const newShortenedURLMutationVariables: NewShortenedUrlMutationVariables = {
    urlToShorten,
    slugForShortenedURL,
  };

  try {
    const data = await request(
      'http://localhost:8080/graphql',
      newShortenedURLMutation,
      newShortenedURLMutationVariables
    );

    console.log(data);
  } catch (error) {
    const splitByBracket = error.message.split('{');
    if (splitByBracket.length === 0) {
      alert(`Something went wrong, we're working on a fix`);
    }

    const [_, ...rawGraphQLError] = splitByBracket;
    const parsedGraphQLErrors = JSON.parse('{' + rawGraphQLError.join('{'))
      .response.errors;

    const slugAlreadyExistsError = parsedGraphQLErrors.some((error: any) =>
      error.message.includes('already exists')
    );

    if (slugAlreadyExistsError) {
      alert('Slug already exists');
    }
  }
});
