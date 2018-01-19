'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-veracity:node-webapp-demo', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/node-webapp-demo'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'start.js'
    ]);
  });
});
