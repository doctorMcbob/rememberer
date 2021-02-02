module.exports = function (fastify, opts, done) {
    fastify.get("/", (req, res) => {
	res.view("/views/index.pug")
    })
    
    fastify.get("/login", (req, res) => {
	res.view("/views/login.pug")
    })

    fastify.get("/static/main.js", (req, res) => {
	res.sendFile("main.js")
    })

    done()
}
