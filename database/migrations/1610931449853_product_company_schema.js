'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCompanySchema extends Schema {
  up () {
    this.table('product_companies', (table) => {
      // alter table
      table.dropForeign('company_id')
      table.dropForeign('product_id')
      table.integer('company_id')
        .references('id')
        .inTable('companies')
        .onDelete('CASCADE')
        .alter()
      table.integer('product_id')
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .alter()
    })
  }

  down () {
    this.table('product_companies', (table) => {
      // reverse alternations
    })
  }
}

module.exports = ProductCompanySchema
