<p>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Execute the app

1. Clone this repository

2. Install dependencies running `yarn install`, this project was build using node version 18.

3. Install nest-cli if its not installed
`npm install -g @nest/cli`

4. Execute the database with docker `docker-compose up -d`

5. If you want to run the seed process to populate the database you can make a GET request to: 
`http://localhost:3000/api/v2/seed`
Also, check the number passed in the url in `src/seed/seed.service.ts` you can change that number based on your data needs.

## Docs

See the docs folder in the root od this project to read more information related to nestJS.
