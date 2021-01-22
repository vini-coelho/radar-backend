'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DonationsSchema extends Schema {
  up () {
    this.create('donations', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('donations')
  }
}

module.exports = DonationsSchema
