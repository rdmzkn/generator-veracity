const Generator = require("yeoman-generator")
const say = require("yosay")
const chalk = require("chalk")

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts)
	}

	initializing() {
		this.log(say(
`${chalk.bold.green("Veracity")}
${chalk.cyan(" Single-Page-Application")}
 Node`))
		this.log("Welcome! This generator will help you set up a framework for a Node based Single Page Web Application with the following features: ")
		this.log(
`- React/Redux front-end
- Client side routing
- Express powered backend
- Authentication with passport and passport-azure-ad
- Routes for logging in and logging out
- Development environment optimized for VisualStudio Code
`)
		this.log(chalk.bold(
`Before you begin you should register an application in a project on https://developer.veracity.com/
You will then be provided with the necessary parameters to authenticate with Veracity and access the APIs.
`)
		)
	}
/*
	async prompting() {
		this.answers = await this.prompt([
			{
				type: "input",
				name: "name",
				message: "Please give your project a name",
				default: this.appname
			},
			{
				type: "input",
				name: "companyName",
				message: "Please enter your company name",
				default: "Incognito"
			},
			{
				type: "input",
				name: "clientId",
				message: "Please enter the client id you received when creating the application in developer.veracity.com or hit enter to add it later",
				default: "[client-id-goes-here]"
			},
			{
				type: "input",
				name: "clientSecret",
				message: "Please enter the client secret you recevied when creating the application in developer.veracity.com or hit enter to add it later",
				default: "[client-secret-goes-here]"
			},
			{
				type: "input",
				name: "apiKey",
				message: "Please enter the API Subscription id you recevied when subscribing to the api or hit enter to add it later",
				default: "[api-key-goes-here]"
			}
		])
	}
*/
	writing() {
		/*
		this.fs.copyTpl(
			this.templatePath("./**"),
			this.destinationPath("./"),
			{
				...this.answers,
				ignoreTokens: "tokens.js"
			},
			{globOptions: { dot: true }}
		)*/
		
		this.fs.copy(
			this.templatePath("./**"),
			this.destinationPath("./"),
			{globOptions: { dot: true }})
	}
	install() {
		/*this.installDependencies({
			npm: true,
			bower: false
		})*/
	}
}