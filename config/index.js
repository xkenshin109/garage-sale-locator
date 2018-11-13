"use strict";
let glob = require('glob');
let path = require('path');

let ret = {};
glob.sync("./config/*.js").forEach((file)=>{
    let name = path.basename(file,'.js');
    ret[name] = require(path.resolve(file));
});
let config = process.env.NODE_ENV || 'development';

module.exports = ret[config];
