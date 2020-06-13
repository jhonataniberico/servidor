'use strict'

const express = require('express'),
    controller = require('../controllers/pagoController'),
    api = express.Router();

api
    .post('/registerPayment', controller.registerPayment);

module.exports = api;