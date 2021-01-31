const Seq = require('sequelize')
const sequelize = new Seq('remember', 'postgres', process.env.POSTGRES_PASSWORD, {
    host    : 'localhost',
    dialect : 'postgres',
    pool    : {
	max  : 9,
	nin  : 0,
	idle : 10000,
    }
})

const Memory = require('./memory')(sequelize)

module.exports = {
    sequelize : sequelize,
    Memory : Memory
}
