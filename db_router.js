const { sequelize, Memory } = require("./models")

module.exports = function (fastify, opts, done) {
    fastify.get("/tags/", async (req, res) => {
	console.log(req.body)
	res.send(200)
    })

    done()
}
