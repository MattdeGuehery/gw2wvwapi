const HTTP = require('../WebRequest');
const API = require('../API');
let PUBLIC = {};

const base_endpoint = '/v2/wvw';
const ranks_endpoint = '/ranks';
const current_url = API.base_url + base_endpoint + ranks_endpoint;

PUBLIC.Get = {};
PUBLIC.Get.Ranks = {};

PUBLIC.Get.Ranks.All = function() {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/ranks
     */
    let url = current_url;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}
PUBLIC.Get.Ranks.ById = function(rankid) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/ranks
     * @param: rank id as string or int
     */
    let url = current_url + '/' + rankid;
    
    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

PUBLIC.Get.Ranks.ByIds = function(rankids) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/ranks
     * @param: comma separated string or array of rank ids
     */
    let query_params = API.parseIDQueryParams(rankids);
    let url = current_url + query_params;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

module.exports = PUBLIC;