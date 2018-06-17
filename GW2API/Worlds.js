const HTTP = require('./WebRequest');
const API = require('./API');
let PUBLIC = {};

const base_endpoint = '/v2/worlds';
/**
 * Possible query parameters: 
 * id
 */
PUBLIC.Get = {};

PUBLIC.Get.All = function() {
    let URL = API.base_url + base_endpoint;
    return HTTP.Promise.httpGet(URL).then((result) => {
        return result;
    });
}

PUBLIC.Get.ById = function(worldids) {
    /**
     * Takes a comma separated strings of worldids
     */
    var query_param = API.parseQueryParams(worldids);
    let URL = API.base_url + base_endpoint + query_param;
    return HTTP.Promise.httpGet(URL).then((result) => {
        return result;
    })
}

module.exports = PUBLIC;