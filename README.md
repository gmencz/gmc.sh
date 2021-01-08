# Gmc.sh

App features:

- Manage your favorite links and sites with our URL shortener and manager.
- Keep track of your projects and manage them with our project manager.
- Make notes and todo lists so you don't forget anything.
- Make schedules to keep your life on track with our scheduler.
- Make shopping lists or import existing ones from anywhere, even a piece of
  paper.
- Integrate with your favorite social networks so you don't miss any news.

## Contribute

1. Clone the repo on your pc and checkout to the branch you'll be working on or
   make a new branch.
2. Create a .env.local with the variables in .env.example and fill the variables
   with valid values.
3. `npm install`
4. `npm run dev` and good luck 💻!

## Testing and CI

All tests, lints and type checks are ran on every push with github actions to
make sure nothing broken gets into production. You can run some of these tests
locally with `npm t` or `npm test` or `npm run test`.

To run the E2E Cypress tests you must create a `cypress.env.json` in the
project's root with the keys in `cypress.env.sample.json`, these keys must be
filled with valid values otherwise tests won't work properly.
