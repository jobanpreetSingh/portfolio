var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '1397',
        database: 'portfolioapp'
    }
});

module.exports = knex;