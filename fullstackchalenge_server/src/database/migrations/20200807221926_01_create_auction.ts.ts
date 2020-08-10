import Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable( 'auctions', table =>{
        table.increments('id').primary();
        table.string('name').notNullable();
        
        table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.dateTime('startdate');
        table.dateTime('enddate');
        table.string('status');

        table.timestamps(true,true);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('auctions');
}

