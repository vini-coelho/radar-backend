'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with productcompanies
 */

const ProductCompany = use('App/Models/ProductCompany');
const Company = use('App/Models/Company');
const Product = use('App/Models/Product');


class ProductCompanyController {
  /**
   * Show a list of all productcompanies.
   * GET productcompanies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  /**
   * Render a form to be used for creating a new productcompany.
   * GET productcompanies/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new productcompany.
   * POST productcompanies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.all();
    try {
      const {companyId: company_id, productId: product_id, price} = data;
      const company = await Company.find(company_id)
      if(!company) throw ("Loja não existe!");
      const product = await Product.find(product_id)
      if(!product) throw ("Produto não existe!");
      const productCompany = await ProductCompany.create({company_id, product_id, price})
     return response.status(201).send(productCompany);
    } catch (error) {
      return response.status(400).send({error})
    }
  }
  
  /**
   * Display a single productcompany.
   * GET productcompanies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Render a form to update an existing productcompany.
   * GET productcompanies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update productcompany details.
   * PUT or PATCH productcompanies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const data = request.all();
    try {
      const productCompany = await ProductCompany.find(params.id)
      if (!productCompany) throw ("Relação inexistente!, falha ao encontrar productCompanyId:"+ params.id)

      const {companyId: company_id, productId: product_id, price} = data;

      const company = await Company.find(company_id)
      if(!company) throw ("Loja não existe!");
      const product = await Product.find(product_id)
      if(!product) throw ("Produto não existe!");

      productCompany.merge({company_id, product_id, price})

      await productCompany.save()
     return response.status(200).send(productCompany);
    } catch (error) {
      return response.status(400).send({error})
    }
  }

  /**
   * Delete a productcompany with id.
   * DELETE productcompanies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const productCompany = await ProductCompany.find(params.id);
      if (!productCompany) throw ("Relação inexistente!, falha ao encontrar productCompanyId:"+ params.id)
      await productCompany.delete()
      const message = `relação de id: ${params.id} apagada!`
      return response.status(200).send({message})
    } catch (error) {
      return response.status(400).send({error})
    }
  }
}

module.exports = ProductCompanyController
