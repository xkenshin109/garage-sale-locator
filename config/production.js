module.exports = {
    database:
        {
            zergdb: {
                client: 'mysql',
                connection:{
                  host:'35.184.89.109',
                  user:'zerg-admin',
                  password:'THRunavdBFr3vK4',
                  database:'zergdb',
                  charset:'utf8',
                  timezone:'UTC',
                 // socketPath:"/cloudsql/{project-id}:us-central1:{database}"
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
