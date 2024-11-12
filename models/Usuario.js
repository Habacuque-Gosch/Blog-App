const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
    nome : {
        type: db.Sequelize.STRING,
        require: true
    },
    email : {
        type: db.Sequelize.STRING,
        require: true
    },
    senha : {
        type: db.Sequelize.STRING,
        require: true
    },
    flag_admin: {
        type: db.Sequelize.BOOLEAN,
        default: false
    }
})

// SYNC MODEL
// Usuario.sync({force: true}).then(() => {
//     console.log('Model Usuario criado com sucesso')
// }).catch((erro) => {
//     console.log('erro ao sync table user '+erro)
// })

module.exports = Usuario