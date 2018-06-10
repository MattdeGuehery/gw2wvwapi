const request = require('request');
const rp = require('request-promise');
let PUBLIC = {};

PUBLIC.httpGet = function(url_address) {
    let options = {
        method: 'GET',
        url: url.parse(url_address),
    }

    return rp(options);
}

PUBLIC.httpPost = function(url_address, body) {
    let options = {
        method: 'POST',
        url: url.parse(url_address),
    }

    return rp(options);
}

PUBLIC.httpGetWithAuth = function(url_address, apikey) {
    let options = {
        method: 'GET',
        url: url.parse(url_address),
        auth: {
            user: null,
            pass: null,
            sendImmediately: true,
            bearer: apiKey
        }
    }

    return rp(options);
}

PUBLIC.httpPostWithAuth = function(url_address, apikey) {
    let options = {
        method: 'POST',
        url: url.parse(url_address),
        auth: {
            user: null,
            pass: null,
            sendImmediately: true,
            bearer: apiKey
        }
    }

    return rp(options);
}

module.exports = PUBLIC;