const Seq = require("sequelize")

module.exports = function(sequelize) {
    return sequelize.define("User", {
	name     : {
	    type      : Seq.STRING,
	    allowNull : false
	},
	
	password : {
	    type      : Seq.STRING,
	    allowNull : false
	} 
    })
}
