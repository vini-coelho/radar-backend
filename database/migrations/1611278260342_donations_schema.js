'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DonationsSchema extends Schema {
  up () {
    this.create('donations', (table) => {
      table.increments()
      table.string('title')
      table.string('instagram')
      table.text('description')
      table.string('bank')
      table.string('agency')
      table.string('account')
      table.string('phone1')
      table.string('phone2')
      table.string('phone3')
      table.string('pix1')
      table.string('pix2')
      table.string('pix3')
      table.timestamps()
    })
  }

  down () {
    this.drop('donations')
  }
}

module.exports = DonationsSchema
