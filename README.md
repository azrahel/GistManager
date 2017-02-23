# Gist manager

Gist manager is simple frontend (served with webpck-dev-server) application trying to better utilise Github Gists API. Bare in mind - it is not fully functional Gists manager (lack of labels and stars management). But well, it s almost there.
Feel free to add whatever you feel necessary though :].

## Features

* Github Authentication
* 3 column layout
* Viewing user gists
* Separation between starred and not-starred gists
* Viewing parcitular gist details
* CRUD for gist (files CRUD included)

## Installing and running

To run project you have to:

1. Install NodeJS (`v6.2.1` was used for development)
2. Install all npm dependencies (`npm install` in main directory of the app)
3. Run project with `npm start`
 
## Testing

Currently all stores are being fully covered with unit tests.
Test frameworks used are Mocha and Chai. 
Tests reside in src/client/test directory.
To have whole app and all usecases covered integration and UItests should be implemented.

To run tests do `npm test` in main directory of the app.

## Technology stack

### Front-end

* [Webpack](https://webpack.github.io/) to automize tasks and bundle modules, provide aliasses, CSSModules and much more
* [Babel](https://babeljs.io/) so ES6, JSX and all the love can be used like no biggie
* [React, ReactDOM](https://facebook.github.io/react/) to build user interface
* [React-Router](https://github.com/ReactTraining/react-router) to utilize routing
* [MobX](http://www.material-ui.com/#/) to awesomely, functionally and reactively(!) manage state
* [MaterialUI](http://www.material-ui.com/#/) not to invent wheel again (providing basic UI components)
* [SASS](http://sass-lang.com/) as a styles preprocessor

### Back-end

Well, there s kinda no back-end. Webpack-dev-server managing it all.

## Why you should consider it `awesome`

* UXfriendly implementation of dialog ensures that only one instance of it may be displayed at a time.
  Meaning that as far as next dialogs will be implemented the same way, handling them will be highly
  encapsulated and repetetive which makes it simple and time saving
* stores singletons that with imports could well replace @inject decorator. They are also easy to test btw.
* only client side code being able to auth to github with your username and password, in no persistive token saving and no-redirections manner
* high MobX stores granulation and non-@action methods separation, that promotes separation of concerns, clarity, nice encapsulation and hence easy to understand, manage and extend
* webpack lazy react components loading
* high granulation level and clear concerns separation between directories/files and components
* css modules
* relative imports with webpack backed aliases 
* no backend at all

##Enjoy and have fun out there! :)
