const express = require("express")
const httpProxy = require("http-proxy")
const morgan = require("morgan")

const config = require("./config.js")

const app = express()
const apiProxy = httpProxy.createProxyServer()

// Use the morgan logging package with it's "common" setting.
app.use(morgan("common"))

// Status endpoint to test if the proxy server is running and can be reached.
app.get("/status", (req, res) => {
	res.send("Ok")
})

// Configure all the proxy paths specified in config.js
for (s of config.services) {
	app.all(s.PROXY_PATH, function(req, res) {
		apiProxy.web(req, res, { target: s.TARGET })
	})
}

app.listen(config.SERVICE_PORT, () => console.log(`Listening on ${config.SERVICE_PORT}`))
