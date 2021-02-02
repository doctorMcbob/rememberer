const { sequelize, User } = require("./models")

const bcrypt = require("bcrypt")

module.exports = function (fastify, opts, done) {
    fastify.post("/login", async (req, res) => {
	const username = req.body.name
	const password = req.body.password
	console.log(username)
	const user = await User.findAll({
	    where : {
		name : username
	    }
	})
	console.log(user)
	if (user == undefined || user.length == 0) {
	    res.code(404)
	    return res.send()
	}

	console.log(password, user.password)
	const match = await bcrypt.compare(password, user[0].password)

	if (match) {
	    const token = fastify.jwt.sign({
		user : username
	    })
	    res.send(token)
	} else {
	    res.code(401)
	    res.send()
	}
	
    })

    /*
    // comment out after setting up user
    fastify.post("/newuser", async (req, res) => {
	const username = req.body.user
	const password = req.body.password
	const salt = await bcrypt.genSalt()
	const hashedPassword = await bcrypt.hash(password, salt)

	User.create({
	    name     : username,
	    password : hashedPassword
	})

	const token = fastify.jwt.sign({
	    user : username
	})
	res.send(token)
    })
    */
    
    fastify.get("/static/login.js", (req, res) => {
	res.sendFile("login.js")
    })
    done()
}
