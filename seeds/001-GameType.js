"use strict";
const upsert = require('../utils/upsert');
module.exports.seed = function(knex,Promise){
    let rows =[{
        id:1,
        name:'MMO'
    },{
        id:2,
        name:'FPS'
    },{
        id:3,
        name:'MOBO'
    }];
    return Promise.all(rows.map(row=>{
        return;
//        return upsert(knex,'GameType',row);
    }));
};
