"use strict";
let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
let http = require('http');
let https = require('https');
let Promise = require('bluebird');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let path = require('path');
let Launcher = function(){
    let self = this;
    self.app = express();
    self.app.use(bodyParser.json({limit:'4mb'}));


    self.app.config = require('../config');

    self.app.databases = require('./DatabaseLoader')(self.app);
    self.app.migrator = require('./Migrator')(self.app);
    self.app.models = require('./ModelLoader')(self.app);
    self.app.middleware = require('./MiddlewareLoader')(self.app);
    self.app.controllers = require('./ControllerLoader')(self.app);
    self.app.services = require('./ServiceLoader')(self.app);
    self.app.seeder = require('./Seeder')(self.app);
    // self.app.use(express.urlencoded({extended:false}));
    // self.app.use(cookieParser());
     self.app.use(express.static(path.join(__dirname, 'public')));
    require('./RouteLoader')(self.app);
    self.httpServer = http.createServer(self.app);
};

Launcher.prototype.run = function(seedsTorun){

    let self = this;
    return Promise.resolve()
        .then(()=>{
            return self.app.migrator.run();
        })
        .then(()=>{
            return self.app.seeder.run(seedsTorun);
        })
        .then(()=>{
            self.httpServer.listen(self.app.config.port);
        });
}
module.exports = new Launcher();
