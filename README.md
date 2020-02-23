# DoobooIAP

[![CircleCI](https://circleci.com/gh/hyochan/DoobooIAP.svg?style=svg)](https://circleci.com/gh/hyochan/DoobooIAP)
[![codecov](https://codecov.io/gh/hyochan/DoobooIAP/branch/master/graph/badge.svg)](https://codecov.io/gh/hyochan/DoobooIAP)

![c6EeH7k2dN](https://user-images.githubusercontent.com/27461460/75103940-94f46c00-5645-11ea-8fcd-a069639ae3f4.gif)

> DoobooIAP repo aims to create full featured example app for in app purchase with [react-native-iap](https://github.com/dooboolab/react-native-iap). Bringing up the [issue provided in react-native-iap](https://github.com/dooboolab/react-native-iap/issues/855), we'd like to fully generate working example app.


### Setup firebase

Copy `.env.sample` to `.env` and add firebase variables of your own.
`cp .env.sample .env`


### Running the project

Running the project is as simple as running

```sh
yarn start
```

This runs the `start` script specified in our `package.json`, and will spawn off a server which reloads the page as we save our files.
Typically the server runs at `http://localhost:8080`, but should be automatically opened for you.

## Testing the project

Testing is also just a command away:

```sh
yarn test
```

### React version

16.9

### React Native version

0.61

### React navigation

4
