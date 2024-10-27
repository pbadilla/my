
# myTheresa - Carrousel Movies, Card and Wishlist

- Carrousel with 3 differents types of movies. Details and Wishlist.

## Features

- Carrousel fetching data for different types of movie
- Details of the selected movie
- Possibility to add into a Wishlist
- Wishlist


## Appendix

made with React[18], SCSS, Axios, Redux-TLK, Vite, pnpm

## Other libraries

react-carrousel, react-router, tostify


## How to us it

To start the project you have to Clone this repository into your local

```bash
  https://github.com/pbadilla/my.git
```

If you don't have pnpm installed, you can install it with the following command:

```bash
  npm install -g pnpm
```

Then, install all the dependencies (with pnpm[better option] or yarn )

```bash
  pnpm install
```
or
```bash
  yarn install
```

And the start the project

```bash
  yarn start
```

## Running Tests

In order to run the tests, you need to install the following packages: 
 
 ```bash
  npm install -g playwright
  npm install -g @playwright/test
 ```

To run tests, run the following command

```bash
   yarn run test_e2e or npm run test_e2e
   yarn run test_e2e:view or npm run test_e2e:view
    "test_e2e:view": "npx playwright test src/tests/e2e --headed"
```

## SSR

I'm triying to use Vite to create a SSR for my project, so I'have write a `appServer.tsx` file in the `src/pages` folder but is not working yet.

## Authors

- [@pbadilla](https://www.github.com/pbadilla)


## API Reference

#### It is use MovieDBM database

- [MovieDBM](https://www.themoviedb.org/documentation/api)

## Optimizations

Possibly using another state manager as Zustand or TanTanQuery could better performance and cache

## TODO

- Use a DS to better UX experience
- Search movies feature
- Most use cases for testing e2e tests
- Try another unit test platform as BUN to check the performance

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
