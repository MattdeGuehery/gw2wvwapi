const HTTP = require('./WebRequest');
const API = require('./API');
let PUBLIC = {};

const base_endpoint = '/v2/colors';

PUBLIC.Get = {};

PUBLIC.Get.Colors_All = function() {
    let url = API.base_url + base_endpoint;
    HTTP.httpGet(url).then((result) => {
        return result;
    });
}

PUBLIC.Get.Colors_ByIds = function(colorids) {
    let url = API.base_url + base_endpoint;
    var query_params = API.parseQueryParams(colorids);
    HTTP.httpGet(url + query_params).then((result) => {
        return result;
    });
}