'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require("fs-extra");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the wicked Veracity application generator!'));

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Whats the name of your demo app?',
        default : this.appname // Default to current folder name
      },{
        type: 'confirme',
        name: 'cool',
        message: 'Cool. When Im all done, please update the appsettings.json in the root folder with the client ID, client Secret, redirectUrl(if you are using different port).',
        default : true
      }
    ];
    
    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    fs.ensureDir(this.props.projectName);
    fs.ensureDir(this.props.projectName + '/bin');
    fs.ensureDir(this.props.projectName + '/Controllers');
    fs.ensureDir(this.props.projectName + '/Models');
    this.fs.copyTpl(this.templatePath('appnetcore/Controllers/AccountController.cs'), this.destinationPath(this.props.projectName + '/Controllers/AccountController.cs'),{projectName:this.props.projectName});
    this.fs.copyTpl(this.templatePath('appnetcore/Controllers/HomeController.cs'), this.destinationPath(this.props.projectName + '/Controllers/HomeController.cs'),{projectName:this.props.projectName});
    this.fs.copyTpl(this.templatePath('appnetcore/Models/AzureAdB2COptions.cs'), this.destinationPath(this.props.projectName + '/Models/AzureAdB2COptions.cs'),{projectName:this.props.projectName});
    this.fs.copyTpl(this.templatePath('appnetcore/Models/ErrorViewModel.cs'), this.destinationPath(this.props.projectName + '/Models/ErrorViewModel.cs'),{projectName:this.props.projectName});
    this.fs.copyTpl(this.templatePath('appnetcore/Models/MSALSessionCache.cs'), this.destinationPath(this.props.projectName + '/Models/MSALSessionCache.cs'),{projectName:this.props.projectName});
    this.fs.copyTpl(this.templatePath('appnetcore/Program.cs'),        this.destinationPath(this.props.projectName + '/Program.cs'),{projectName:this.props.projectName});
    this.fs.copyTpl(this.templatePath('appnetcore/Startup.cs'),        this.destinationPath(this.props.projectName + '/Startup.cs'),{projectName:this.props.projectName});
    this.fs.copyTpl(this.templatePath('appnetcore.sln'),  this.destinationPath(this.props.projectName + '.sln'),{projectName:this.props.projectName});
    fs.copy(this.templatePath('appnetcore/Properties/'),   this.destinationPath(this.props.projectName + '/Properties/'));
    fs.copy(this.templatePath('appnetcore/Views/'),        this.destinationPath(this.props.projectName + '/Views/'));
    fs.copy(this.templatePath('appnetcore/wwwroot/'),      this.destinationPath(this.props.projectName + '/wwwroot/'));
    fs.copy(this.templatePath('appnetcore/appnetcore.csproj'),  this.destinationPath(this.props.projectName + '/' + this.props.projectName + '.csproj'));
    fs.copy(this.templatePath('appnetcore/appsettings.Development.json'),   this.destinationPath(this.props.projectName + '/appsettings.Development.json'));
    fs.copy(this.templatePath('appnetcore/appsettings.json'),        this.destinationPath(this.props.projectName + '/appsettings.json'));
    fs.copy(this.templatePath('appnetcore/bundleconfig.json'),        this.destinationPath(this.props.projectName + '/bundleconfig.json'));
    fs.copy(this.templatePath('appnetcore/veracity.pfx'),        this.destinationPath(this.props.projectName + '/veracity.pfx'));
    fs.copy(this.templatePath('readme.md'),        this.destinationPath('readme.md'));
  }
};
