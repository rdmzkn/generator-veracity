const app = require("express")() // Import express web server and create an app instance
const configLoader = require("./config")
const parseError = require("./utils/parseError")

const setupLogger = require("./init/setupLogging")
const setupRoutes = require("./init/setupRoutes")
const setupServer = require("./init/setupServer")

const start = async () => {
	let log = undefined
	let config = undefined
	const prestart = async () => {
		config = await configLoader()
		log = setupLogger(config.server.logDir)
	}
	await prestart().catch(error => {
		// eslint-disable-next-line no-console
		console.error(error)
		process.exit(1)
	})

	const startAsync = async () => {
		log.debug("Application starting")

		app.set("trust proxy", true) // Ensures that proxy servers such as those employed by Azure AppServices still result in a trusted secure connection
		app.set("etag", false) // Disable etags to prevent overzealous caching

		setupRoutes(app, config.server.staticRoot, log)

		await setupServer(app, log, config.server)
	}
	startAsync().catch(error => {
		log.error(parseError(error))
		process.exit(1)
	})
}
start()