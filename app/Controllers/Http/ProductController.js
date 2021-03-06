'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */

 const Product = use('App/Models/Product');
class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {


    try {
      const queryData = request.get();
      const type = queryData.type;
      const zone = queryData.zone;
      const companyType = queryData.companyType;
      const orderPrice = queryData.orderPrice == 'desc' ? 'desc': 'asc';

      const products = Product
      .query()
      .with('companies', (builder) =>
         builder.select('id', 'name', 'address', 'phone1', 'zone', 'instagram', 'hasWaitingList', 'type', 'cnpj')
         .orderBy('price', orderPrice)
         );
      
      if(!!type)
        products.where('type','=', type)
      
      let fetchedData = await products.fetch()
      if(!!zone) {
        const res = JSON.parse(JSON.stringify(fetchedData))
        fetchedData = res.map(element => {
        const compa=element.companies.filter(el=>el.zone ===zone)
         if(compa.length > 0) return {...element, companies: compa};
          else return null
        }).filter(el=>!!el);
      }
      if(!!companyType) {
        const res = JSON.parse(JSON.stringify(fetchedData))
        fetchedData = res.map(element => {
        const compa=element.companies.filter(el=>el.type ===companyType)
         if(compa.length > 0) return {...element, companies: compa};
          else return null
        }).filter(el=>!!el);
      }
      return response.status(200).send(fetchedData);
     } catch (error) {
       return response.status(400).send({error})
     }
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const product = request.all();

    try {
     const productResponse = await Product.create(product)
     return response.status(201).send(productResponse);
    } catch (error) {
      return response.status(400).send({error})
    }
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const product = await Product.findOrFail(params.id);

    return product;
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const product = await Product.findOrFail(params.id)

    const data = request.all();

    product.merge(data);

    await product.save();

    return product;
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const product = await Product.findOrFail(params.id);

    await product.delete()
  }
}

module.exports = ProductController
