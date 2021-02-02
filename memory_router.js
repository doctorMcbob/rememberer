const { Op } = require("sequelize")
const { sequelize, Memory } = require("./models")

const memSchema = {
    body : {
	type       : "object",
	required   : ["tags", "text"],
	properties : {
	    tags : { type : "string" },
	    text : { type : "string" }
	}
    }
}

module.exports = function (fastify, opts, done) {
    fastify.get("/tags/:tags",
		{
		    "preValidation" : [fastify.authenticate]
		},
		async (req, res) => {
		    const tags = req.params.tags.split(",")
		    const memories = await Memory.findAll({
			where : {
			    tags : {[Op.contains] : tags}
			}
		    })
		    res.send(memories)
		})
    fastify.post("/mem",
		 {
		     "schema"        : memSchema, 
		     "preValidation" : [fastify.authenticate]
		 },
		 async (req, res) => {
		     const tags = req.body.tags.split(",")
		     const text = req.body.text

		     const mem = await Memory.create({
			 tags : tags,
			 text : text
		     })

		     res.send(mem)
		 })
    
    done()
}
