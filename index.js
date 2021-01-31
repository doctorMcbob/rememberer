/*
Rememberer

goal : a server listening for me to send links to whenever i want to remember something

items will be stored as string

*/
const fastify = require('fastify')({
    logger : true,
    ignoreTrailingSlash : true,
})

fastify.register(require("./db_router"), {})

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
