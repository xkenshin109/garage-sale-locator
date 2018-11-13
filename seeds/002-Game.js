"use strict";
const upsert = require('../utils/upsert');
module.exports.seed = function(knex,Promise){
    let rows =[
        {
            id:1,
            name:'World of Warcraft - WOW',
            GameType_id:1
        },
        {
            id:2,
            name:'League of Legends',
            GameType_id:3
        },
        {
            id:3,
            name:'Overwatch',
            GameType_id:2
        }
    ];
    return Promise.all(rows.map(row=>{
        return;
        //return upsert(knex,'Game',row);
    }));
};
