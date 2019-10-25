const { MemoryStore } = require("express-session")
const { setupWebAppAuth } = require("@veracity/node-auth")

module.exports = (app, config) => {
	const settings = {
		app,
		strategy: {
			clientId: config.clientID,
			clientSecret: config.clientSecret,
			replyUrl: config.replyUrl,
		},
		session: {
			secret: "<%= secret %>",
			store: new MemoryStore()
		}
	}
	setupWebAppAuth(settings)
}