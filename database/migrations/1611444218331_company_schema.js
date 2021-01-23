'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.table('companies', (table) => {
      // alter table
      table.boolean('hasWaitingList').defaultTo(false)
    })
  }

  down () {
    this.table('companies', (table) => {
      // reverse alternations
    })
  }
}

module.exports = CompanySchema
