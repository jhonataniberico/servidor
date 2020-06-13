'use strict'


function makeRequest(host, endpoint, method, data, headers) {
    return new Promise((resolve, reject) => {
        let http_req = require('follow-redirects').https;
        let querystring = require('querystring');
        // let headers = {};

        if (method == 'GET') {
            data = querystring.stringify(data)
            endpoint += '?' + data;
        } else {
            headers = headers
        }
        let options = {
            host    : host,
            path    : endpoint,
            method  : method,
            headers : headers
        };
        let req = http_req.request(options, (res) => {
            res.setEncoding('utf-8');
            var responseString = '';
            res.on('data', (data) => {
                responseString += data;
            });
            res.on('end', () => {
                try {
                    return resolve(responseString);
                } catch (err) {
                    return resolve({ msj: 'Hubo un error al hacer la petición', err: err });
                }
            });
            res.on('error', (err) => {
                return resolve({ msj: 'Hubo un error al hacer la petición (2)', err: err });
            });
        });
        req.write(data);
        req.end();
    });
}

module.exports = {
    makeRequest
};