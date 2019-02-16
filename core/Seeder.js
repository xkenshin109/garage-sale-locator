"use strict";
let _ = require('lodash');
let Promise = require('bluebird');
let path = require('path');
let glob = require('glob');

function Seeder(app){
    let self = this;
    self.app = app;
}

Seeder.prototype.run = function(seedsToRun){
    let self = this;
    let current = Promise.resolve();
    _.mapValues(self.app.databases,function(db){
        current = current.then(()=>{

            let configDir = path.resolve(process.cwd(), db.knex.client.config.seeds.directory);
            let seeds = glob.sync( `${configDir}/**/*.js` );
            seeds = _.map(seeds,(s)=> path.basename(s));

            if(seedsToRun){
                seeds = _.filter(seeds, s=> _.includes(seedsToRun,s));
            }

            return db.knex.seed._runSeeds(seeds);
        })
            .catch((err)=>{
                console.log(err.message);
            });

    });

    return current;
};

module.exports = function(app) { return new Seeder(app);};
