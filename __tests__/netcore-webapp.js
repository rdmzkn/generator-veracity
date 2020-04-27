'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@veracity/generator-veracity:netcore-webapp', () => {
  beforeEach(() => {
    return helpers
	  .run(path.join(__dirname, '../generators/netcore-webapp'))
	  .withPrompts({ projectName: "test", cool: true });
  });

  it('creates files', () => {
    assert.file(['appnetcore.sln']);
  });
});
