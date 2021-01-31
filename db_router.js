const { Op } = require("sequelize")
const { sequelize, Memory } = require("./models")

module.exports = function (fastify, opts, done) {
    fastify.get("/tags/:tags", async (req, res) => {
	const tags = req.params.tags.split(",")
	const memories = await Memory.findAll({
	    where : {
		tags : {[Op.contains] : tags}
	    }
	})
	res.send(memories)
    })

    done()
}
