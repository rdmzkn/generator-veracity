'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@veracity/generator-veracity:netcore-webapp', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/python-django'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['readme.md']);
  });
});
