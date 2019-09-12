const express = require("express")
const httpProxy = require("http-proxy")
const morgan = require("morgan")

const config = require("./config.js")

const app = express()
const apiProxy = httpProxy.createProxyServer()

app.use(morgan("common"))

for (s of config.services) {
	app.all(s.PROXY_PATH, function(req, res) {
		apiProxy.web(req, res, { target: s.TARGET })
	})
}

app.listen(config.SERVICE_PORT, () => console.log(`Listening on ${config.SERVICE_PORT}`))
