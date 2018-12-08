module.exports = {
    up: function(knex){
        return knex.schema.createTable('FavoriteMapping',function(table){
            table.increments();
            table.integer('SiteListing_id').unsigned().notNullable().references('id').inTable('SiteListing');
            table.integer('Account_id').unsigned().notNullable().references('id').inTable('Account');
            table.timestamps(true,true);
        });
    },
    down:function(knex){
        return knex.schema.dropTable('FavoriteMapping');
    }
};
