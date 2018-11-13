"use strict";
let path = require('path');
let glob = require('glob');
module.exports = function(app){
    let ret = {};
    glob.sync('./middleware/**/*.js').forEach(function(file){
        let name = path.basename(file,'.js');
        ret[name] = require(path.resolve(file))(app);
    });
    return ret;
};
