const path = require("path")

module.exports = {
	server: {
		// Configure the port or named pipe the server should listen for connections on.
		// process.env.PORT tries to resolve the port or pipe from the environment.
		// It should work out of the box for Azure AppServices or IIS running IISNode.
		portOrPipe: process.env.PORT || 3000,

		// This setting enables automatic generation of SSL certificates for development mode.
		// You should disable this setting in production.
		developerSSL: true,

		// The directory where log files are created. Note the process MUST have write permissions to this directory.
		logDir: path.resolve(__dirname, "../../logs"),

		// This is the folder where static assets (the client) should be served from.
		// You may need to change this for production
		staticRoot: path.resolve(__dirname, "../../../dist/client")
	}
}