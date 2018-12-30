module.exports = {
    database:
        {
            zergdb: {
                client: 'mysql',
                connection:{
                  //host:'35.232.46.203',
                  user:'gls-admin',
                  password:'THRunavdBFr3vK4',
                  database:'garage_sail_db',
                  charset:'utf8',
                  timezone:'UTC',
                  socketPath:"/cloudsql/garage-sail-locator:us-central1:garage-sail-locator-db"
                },
                // connection: {
                //     host: '107.180.58.44',
                //     user: 'zerg-admin',
                //     password: 'bacon123',
                //     database: 'zerg-for-life-db',
                //     charset: 'utf8',
                //     timezone: 'UTC'
                // },
                migrations: {
                    directory: './migrations'
                },
                seeds: {
                    directory: './seeds'
                }
            }
        },
    port:8080
};
