# Veracity App Generator [![npm version](https://badge.fury.io/js/%40veracity%2Fgenerator-veracity.svg)](https://badge.fury.io/js/%40veracity%2Fgenerator-veracity) [![Dependency Status][daviddm-image]][daviddm-url]


## Installation

First, make sure you have [Node.js](https://nodejs.org/) installed.
Then, install [Yeoman](http://yeoman.io) and the Veracity App Generator using [npm](https://www.npmjs.com/):

```bash
npm install -g yo
npm install -g @veracity/generator-veracity
```

### Generate a Node.js web app
Run the generator from the command line
```bash
yo @veracity/veracity:node-webapp-demo
```
and see the [documentation](https://github.com/veracity/generator-veracity/tree/master/generators/node-webapp-demo/templates)
for more information about how to configure your application.

### Generate an ASP.NET Core web app
Run the Veracity app generator from the command line
```bash
yo @veracity/veracity:netcore-webapp
```
and see the [documentation](https://github.com/veracity/generator-veracity/tree/master/generators/netcore-webapp/templates)
for more information about how to configure your application.


### Generate a Python Django web app
```bash
yo @veracity/veracity:python-django
```
and see the [documentation](https://github.com/veracity/generator-veracity/tree/master/generators/python-django/templates)
for more information about how to configure your application.

## Update the Veracity App Generator
To update your Veracity App generator to the latest release, run the following command
```bash
npm update -g @veracity/generator-veracity
```

[npm-image]: https://badge.fury.io/js/generator-veracity.svg
[npm-url]: https://npmjs.org/package/generator-veracity
[travis-image]: https://travis-ci.org/Veracity/generator-veracity.svg?branch=master
[travis-url]: https://travis-ci.org/Veracity/generator-veracity
[daviddm-image]: https://david-dm.org/Veracity/generator-veracity.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Veracity/generator-veracity
