import Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable( 'users', table =>{
        table.increments('id').primary();
        table.string('login').notNullable();
        table.string('pass').notNullable();
        table.string('status').notNullable();
        table.timestamps(true,true);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('users');
}

