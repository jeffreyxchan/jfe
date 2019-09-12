# JFE

A proxy server for my projects running on my personal GCP compute instance.
JFE stands for Jeffrey Front End, modeled after GFE.

## Config

To run, needs a config.js file in the root of the project that looks like

```js
module.exports = {
	// Port the server will bind to and listen on.
	SERVICE_PORT: 80,

	services: [
		{
			PROXY_PATH: "/hello/*",
			TARGET: "http://localhost:3000"
		}
	]
}
```

## Building and Running with Docker

```
docker build -f Dockerfile -t jfe .

docker run -d --net=host jfe
```
