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
				name: "clientId",
				message: "Please provide the client id you received when creating the application in developer.veracity.com or leave blank to add it later",
				default: "[client-id-goes-here]"
			},
			{
				type: "input",
				name: "clientSecret",
				message: "Please provide the client secret you recevied when creating the application in developer.veracity.com or leave blank to add it later",
				default: "[client-secret-goes-here]"
			},
			{
				type: "confirm",
				name: "confirmed",
				message: `The project will be created in "${chalk.bold(this.destinationRoot())}". Is this correct?`
			}
		])
		
		if (!this.answers.confirmed) {
			this.env.error("User cancelled the operation")
		}
	}

	writing() {
		this.log("Generating app")
	}
}