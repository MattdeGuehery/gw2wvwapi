const HTTP = require('./WebRequest');
const API = require('./API');
let PUBLIC = {};

const base_endpoint = '/v2/worlds';
/**
 * Possible query parameters: 
 * id
 */
PUBLIC.Get = {};

PUBLIC.Get.Worlds_All = function() {
    let URL = API.base_url + base_endpoint;
    HTTP.httpGet(URL).then((result) => {

    });
}

PUBLIC.Get.Worlds_ById = function(worldids) {
    /**
     * Takes a comma separated strings of worldids
     */
    var query_param = API.parseQueryParams(worldids);
    let URL = API.base_url + base_endpoint + query_param;
    HTTP.httpGet(URL).then((result) => {
        return result;
    })
}

module.exports = PUBLIC;