'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    companies () {
        return this
          .belongsToMany('App/Models/Company')
          .pivotTable('product_companies')
          .withPivot(['price'])
      }
}

module.exports = Product
