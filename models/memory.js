const Seq = require("sequelize")

module.exports = function (sequelize) {
    return sequelize.define("Memory", {
	tags : {
	    type      : Seq.ARRAY(Seq.TEXT),
	    allowNull : false,
	},

	text : {
	    type      : Seq.STRING,
	    allowNull : false,
	}
    })
}
