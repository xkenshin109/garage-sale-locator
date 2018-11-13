module.exports = {
    up: function(knex){
        return knex.schema.createTable('Account',function(table){
            table.increments();
            table.string('display_name',100);
            table.string('password',20);
            table.string('email',100);
            table.timestamps(true,true);
        });
    },
    down:function(knex){
        return knex.schema.dropTable('Account');
    }
};
