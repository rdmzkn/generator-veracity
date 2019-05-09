const express = require("express")

module.exports = (app, staticPath, log) => {
	log.info(`Serving static files from ${staticPath}`)
	app.use(express.static(staticPath, {
		maxAge: 1000*60*60*24*30 // Set max age for static files served from disk
	}))
}