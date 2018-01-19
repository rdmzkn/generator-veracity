'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@veracity/generator-veracity:node-webapp', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/node-webapp'))
      .withPrompts({someAnswer: true});
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt'
    ]);
  });
});
