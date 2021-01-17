'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCompanySchema extends Schema {
  up () {
    this.create('product_companies', (table) => {
      table.increments()
      table.integer('company_id')
        .references('id')
        .inTable('companies')
      table.integer('product_id')
        .references('id')
        .inTable('products')
      table.string('price')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_companies')
  }
}

module.exports = ProductCompanySchema
