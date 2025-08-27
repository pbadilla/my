
# myTheresa - Carrousel Movies, Card and Wishlist

- Carrousel with 3 differents types of Movies. Details and WishlList.

## Features

- Carrousel fetching data for different types of movie
- Details of the selected movie
- Add into a Wishlist and delete items from it

## Appendix

made with React[18], Vite, SCSS, Axios, Zustand, React-Query, pnpm

## Other libraries

React-router, react-tostify

## Tests

### Unit Test

Jest, react-testing-library, vitest

### E2E

 Playwright

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

Using VITE is not possible to do a SSR although I've create a AppServer file to introduce it to the project. (It could a better idea use another tool like NEXT for example)

## Authors

- [@pbadilla](https://www.github.com/pbadilla)

## API Reference

#### It is use MovieDBM database

- [MovieDBM](https://www.themoviedb.org/documentation/api)

## Optimizations

Using a i18n tool to create different languages

## TODO

- Search movies feature
- Language selector and i18n

## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
