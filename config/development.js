module.exports = {
    database:
        {
            hunterDb: {
                client: 'mysql',
                connection: {
                    // host: '104.197.211.98',
                    host: 'localhost',
                    user: 'root',
                    password: 'bacon123',
                    database: 'garagehunterdb',
                    charset: 'utf8',
                    timezone: 'UTC'
                },
                migrations: {
                    directory: './migrations'
                },
                seeds: {
                    directory: './seeds'
                }
            }
        },
    host:'localhost',
    port:36000
};
