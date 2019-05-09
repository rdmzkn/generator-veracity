const {
	Aborter, 
	AnonymousCredential,
	ContainerURL
} = require("@azure/storage-blob")

/**
 * A very simple wrapper that allows us to use async handlers in routes
 * Note that the handler is still responsible for returning results to the client.
 * This helper only handles errors gracefully
 * @param {*} action 
 */
const promiseHandler = (action) => (req, res, next) => {
	const result = action(req, res, next)
	if (result.then) {
		result.catch(err => {
			next(err)
		})
	}
}

module.exports = (app, config) => {
	app.get("/_api/files", promiseHandler(async (req, res) => {
		const sasUrl = ""
		const containerUrl = new ContainerURL(sasUrl, ContainerURL.newPipeline(new AnonymousCredential()))
		const data = await containerUrl.listBlobFlatSegment(Aborter.none)
		res.send(data)
	}))
}