'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('name')
      table.string('phone1')
      table.string('phone2')
      table.string('phone3')
      table.string('latitude')
      table.string('longitude')
      table.string('address')
      table.string('zip')
      table.string('zone')
      table.string('instagram')
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
