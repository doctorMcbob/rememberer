const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
    fastify.register(require('fastify-jwt'), {
	secret : process.env.AUTH_KEY
    })

    fastify.decorate("authenticate", async (req, res) => {
	try {
	    await req.jwtVerify()
	} catch (err) {
	    res.send(err)
	}
    })
})



