'use strict'
const helper = require('../helper');


const controller = {};


controller.registerPayment = async (req, res) => {
    try {
        const data = req.body;

        let raw = `{
            "email"            : "${data.email}",
            "card_number"      : "${data.card_number}",
            "cvv"              : "${data.cvv}",
            "expiration_year"  : ${data.expiration_year},
            "expiration_month" : "${data.expiration_month}"
        }`;

        let headers = {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(raw),
            'authorization': 'Bearer ' + global.PK_CULQI
        };
        let rpta = await helper.makeRequest(global.TK_HOST, global.EP_TOKEN, 'POST', raw, headers);

        if (rpta.err) {
            throw rpta.err;
        }
        try {
            rpta = JSON.parse(rpta);
        } catch (err) {
            throw { msj: `Ocurrió un error al procesar la compra (token)`, err: err };
        }
        if (!rpta.id || !rpta.iin || !rpta.object) {
            throw { msj: rpta.user_message || 'Hubo un error al procesar la compra (token)', err: rpta };
        }
        if (rpta.active == false) {
            throw { msj: 'La tarjeta se encuentra inactiva', err: rpta };
        }

        //------------------------------------------------------------------------------------------
        let sales_id = rpta.id;
        let datos = `{
            "amount"        : ${data.amount},
            "currency_code" : "${data.currency_code}",
            "email"         : "${data.email}",
            "source_id"     : "${sales_id}",
            "description"   : "${data.description}",
            "antifraud_details": {
                "country_code" : "${global.PAIS}",
                "first_name"   : "${data.first_name}",
                "last_name"    : "${data.last_name}"
            }
        }`;
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'authorization': 'Bearer ' + global.SK_CULQI
        };

        rpta = await helper.makeRequest(global.CARGO_HOST, global.EP_CARGO, 'POST', datos, headers);
        if (rpta.err) {
            throw rpta.err;
        }
        try {
            rpta = JSON.parse(rpta);
        } catch(err) {
            throw { msj : `Ocurrió un error al procesar la compra (cargo)`, err : err };
        }
        //-------------------------------------------------------------------------------------------
        if (!rpta.id || !rpta.outcome || !rpta.object) {
            throw { msj: rpta.user_message || 'Hubo un error al procesar la compra (cargo)', err: rpta };
        }
        res.status(201).send(rpta);
    } catch (error) {
        res.status(500).send(error);
    }

}


module.exports = controller;