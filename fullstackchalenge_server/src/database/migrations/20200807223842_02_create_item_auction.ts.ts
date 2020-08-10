import Knex from "knex";


export async function up(knex: Knex) {
    return knex.schema.createTable( 'items_auction', table =>{
        table.increments('id').primary();
        table.string('item').notNullable();
        table.decimal('value').notNullable();
        table.string('type').notNullable();
        
        table.integer('auction_id')
        .notNullable()
        .references('id')
        .inTable('auctions')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

        table.timestamps(true,true);
    });
}


export async function down(knex: Knex) {
    return knex.schema.dropTable('items_auction');
}

