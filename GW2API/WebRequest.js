const axios = require('axios');
let PUBLIC = {};

PUBLIC.Promise = {};

function _reqget(url) {
    return axios.get(url).then(function(result) {
        return result.data;
    });
}

function _reqpost(url, data) {
    return axios.post(url, data).then(function(result) {
        return result.data;
    });
}

PUBLIC.httpGet = async function(url_address) {
    return _reqget(url_address);
}

PUBLIC.httpPost = async function(url_address, body) {
    return _reqpost(url_address, body);
}

PUBLIC.httpGetWithAuth = async function(url_address, apikey) {
    let options = {
        method: 'GET',
        url: url_address,
        auth: {
            user: null,
            pass: null,
            sendImmediately: true,
            bearer: apiKey
        }
    }

    return _reqget(options);
}

PUBLIC.httpPostWithAuth = async function(url_address, body, apikey) {
    let options = {
        method: 'POST',
        url: url_address,
        data: body,
        auth: {
            user: null,
            pass: null,
            sendImmediately: true,
            bearer: apiKey
        }
    }

    return _reqpost(options);
}

PUBLIC.Promise.httpGet = async function(url_address) {
    /**
     * Returns a promise
     */
    return axios.get(url_address);
}

PUBLIC.Promise.httpPost = async function(url_address, body) {
    /**
     * Returns a promise
     */
    let options = {
        method: 'POST',
        data: body,
        url: url_address,
    }

    return axios.get(options);
}


PUBLIC.Promise.httpGetWithAuth = async function(url_address, apikey) {
    /**
     * Returns a promise
     */
    let options = {
        method: 'GET',
        url: url_address,
        auth: {
            user: null,
            pass: null,
            sendImmediately: true,
            bearer: apiKey
        }
    }

    return axios.get(options);
}


PUBLIC.Promise.httpPostWithAuth = async function(url_address, body, apikey) {
    /**
     * Returns a promise
     */
    let options = {
        method: 'POST',
        url: url_address,
        data: body,
        auth: {
            user: null,
            pass: null,
            sendImmediately: true,
            bearer: apiKey
        }
    }

    return axios.get(options);
}

module.exports = PUBLIC;