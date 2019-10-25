const { MemoryStore } = require("express-session")
const { setupWebAppAuth } = require("@veracity/node-auth")

module.exports = (app, config) => {
	const settings = {
		app,
		strategy: {
			clientId: config.clientID,
			clientSecret: config.clientSecret,
			replyUrl: config.replyUrl,
			apiScopes: [
				"https://dnvglb2cprod.onmicrosoft.com/83054ebf-1d7b-43f5-82ad-b2bde84d7b75/user_impersonation",
				"https://dnvglb2cprod.onmicrosoft.com/37c59c8d-cd9d-4cd5-b05a-e67f1650ee14/user_impersonation"
			]
		},
		session: {
			secret: "<%= secret %>",
			store: new MemoryStore()
		}
	}
	setupWebAppAuth(settings)
}