'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the wicked Veracity application generator!'));

    const prompts = [
      {
        type: 'input',
        name: 'CreateApp',
        message: 'Whats the name of your demo app?',
        default : this.appname // Default to current folder name
      },{
        type: 'confirme',
        name: 'cool',
        message: 'Cool. When Im all done, you can start the app.',
        default : true
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('./**'),
      this.destinationPath('./')
    );
  }
};
