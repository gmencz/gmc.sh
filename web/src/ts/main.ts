import { request } from 'graphql-request';
import { nanoid } from 'nanoid';
import * as clipboard from 'clipboard-polyfill';

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

const urlInput = document.querySelector(
  'input#url-to-shorten'
) as HTMLInputElement;

const errorBox = document.querySelector('.error-box') as HTMLDivElement;
const successBox = document.querySelector('.shortened-box') as HTMLDivElement;

urlInput.addEventListener('keydown', () => {
  errorBox.classList.add('invisible');
  successBox.classList.add('invisible');
});

urlShortenerForm.addEventListener('submit', async event => {
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

  if (!urlInput.checkValidity()) {
    errorBox.classList.remove('invisible');
    return;
  }

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
    slugForShortenedURL: slugForShortenedURL ? slugForShortenedURL : nanoid(4),
  };

  const submitButton = document.querySelector(
    'form.url-shortener button[type="submit"]'
  ) as HTMLButtonElement;

  console.log(process.env.NODE_ENV);

  const endpoint =
    process.env.NODE_ENV === 'production'
      ? 'http://graphql.gmc.sh/graphql'
      : 'http://localhost:8080/graphql';

  try {
    submitButton.disabled = true;
    const response: NewShortenedUrlMutationResponse = await request(
      endpoint,
      newShortenedURLMutation,
      newShortenedURLMutationVariables
    );

    submitButton.disabled = false;
    await clipboard.writeText(
      `https://gmc.sh/${response.addShortenedResource.shortenedresource[0].slug}`
    );
    (successBox.querySelector(
      'strong'
    ) as HTMLElement).innerHTML = `The shortened URL <strong>https://gmc.sh/${response.addShortenedResource.shortenedresource[0].slug}</strong> was copied to your clipboard.`;
    successBox.classList.remove('invisible');
    return;
  } catch (error) {
    submitButton.disabled = false;
    const splitByBracket = error.message.split('{');

    if (splitByBracket.length === 0) {
      (errorBox.querySelector(
        'strong'
      ) as HTMLElement).textContent = `Something went wrong, we're working on a fix`;
      return;
    }

    const [, ...rawGraphQLInfo] = splitByBracket;
    const parsedGraphQLErrors = JSON.parse('{' + rawGraphQLInfo.join('{'))
      .response.errors as GraphQLError[];

    const slugAlreadyExistsError = parsedGraphQLErrors.some(error =>
      error.message.includes('already exists')
    );

    if (slugAlreadyExistsError) {
      const generatedSlug = nanoid(4);
      const variables: NewShortenedUrlMutationVariables = {
        slugForShortenedURL: generatedSlug,
        urlToShorten,
      };

      const response: NewShortenedUrlMutationResponse = await request(
        'http://localhost:8080/graphql',
        newShortenedURLMutation,
        variables
      );

      await clipboard.writeText(
        `https://gmc.sh/${response.addShortenedResource.shortenedresource[0].slug}`
      );
      (successBox.querySelector(
        'strong'
      ) as HTMLElement).innerHTML = `The shortened URL <strong>https://gmc.sh/${response.addShortenedResource.shortenedresource[0].slug}</strong> was generated and copied to your clipboard because the slug you provided is already in use.`;
      successBox.classList.remove('invisible');
    }
  }
});
