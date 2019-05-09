const notAuthMiddleware = (req, res, next) => {
	if (!req.user || !req.isAuthenticated()) {
		res.status(400).send("Unauthorized")
	}
	next()
}

module.exports = (app,) => {
	app.get("/_api/user", notAuthMiddleware, (req, res) => {
		res.send(req.user)
	})
}