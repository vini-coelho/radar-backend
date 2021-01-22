'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Donation = use('App/Models/Donation');

/**
 * Resourceful controller for interacting with donations
 */
class DonationController {
  /**
   * Show a list of all donations.
   * GET donations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const companies = await Donation.all()

    return companies;
  }

  /**
   * Render a form to be used for creating a new donation.
   * GET donations/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
  }

  /**
   * Create/save a new donation.
   * POST donations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const data = request.all();

    const donation = await Donation.create(data);

    return donation;
  }

  /**
   * Display a single donation.
   * GET donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const donation = await Donation.findOrFail(params.id);

    return donation;
  }

  /**
   * Render a form to update an existing donation.
   * GET donations/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update donation details.
   * PUT or PATCH donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    const donation = await Donation.findOrFail(params.id)

    const data = request.all();

    donation.merge(data);

    await donation.save();

    return donation;
  }

  /**
   * Delete a donation with id.
   * DELETE donations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const donation = await Donation.findOrFail(params.id);

    await donation.delete()
  }
}

module.exports = DonationController
