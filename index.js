/*
Rememberer

goal : a server listening for me to send links to whenever i want to remember something

items will be stored as string

*/
const fastify = require('fastify')({
    logger : true,
    ignoreTrailingSlash : true,
})
const path = require('path')

fastify.register(require("point-of-view"), {
    engine : {
	pug : require("pug")
    }
})

fastify.register(require("fastify-static"), {
    root   : path.join(__dirname, "public"),
    prefix : "/public/"
})

fastify.register(require("./authentication"), {})
fastify.register(require("./memory_router"), {})
fastify.register(require("./login_router"), {})
fastify.register(require("./frontend_router"), {})

const start = async () => {
    try {
	await fastify.listen(3000)
	fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
	fastify.log.error(err)
	process.exit(1)
    }
}

start()
