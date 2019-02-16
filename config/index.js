"use strict";
let glob = require('glob');
let path = require('path');

let ret = {};
console.log(path);

glob.sync("./config/*.js").forEach((file)=>{

    let name = path.basename(file,'.js');
    if(name=='index') return;
    ret[name] = require(path.resolve(file));
});
let config = process.env.NODE_ENV || 'development';

module.exports = ret[config];
