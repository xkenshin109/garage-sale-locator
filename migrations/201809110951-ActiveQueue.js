module.exports = {
    up: function(knex){
        return knex.schema.createTable('ActiveQueue',function(table){
            table.increments();
            table.integer('SiteListing_id').unsigned().notNullable().references('id').inTable('SiteListing');
            table.datetime('RemoveTime').nullable();
            table.timestamps(true,true);
        });
    },
    down:function(knex){
        return knex.schema.dropTable('ActiveQueue');
    }
};
