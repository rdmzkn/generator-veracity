const promiseRouteHandler = require("../utils/promiseRouteHandler")
const {
	Aborter, 
	AnonymousCredential,
	ContainerURL
} = require("@azure/storage-blob")


module.exports = (app) => {
	app.get("/_api/files", promiseRouteHandler(async (req, res) => {
		const sasUrl = ""
		const containerUrl = new ContainerURL(sasUrl, ContainerURL.newPipeline(new AnonymousCredential()))
		const data = await containerUrl.listBlobFlatSegment(Aborter.none)
		res.send(data)
	}))
}