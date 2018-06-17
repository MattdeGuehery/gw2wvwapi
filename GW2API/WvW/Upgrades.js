const HTTP = require('../WebRequest');
const API = require('../API');
let PUBLIC = {};

const base_endpoint = '/v2/wvw';
const upgrades_endpoint = '/upgrades';
const current_url = API.base_url + base_endpoint + upgrades_endpoint;

PUBLIC.Get = {};
PUBLIC.Get.Upgrades = {};

PUBLIC.Get.Upgrades.All = function() {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/upgrades
     * Optional parameter: 
     * id
     */
    let url = current_url;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

PUBLIC.Get.Upgrades.ById = function(upgradeid) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/upgrades
     * @param: upgrade id as string or int
     */
    let url = current_url + '/' + upgradeid;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

PUBLIC.Get.Upgrades.ByIds = function(upgradeids) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/upgrades
     * @param: comma separated string or array of upgrade ids
     */
    let query_params = API.parseIDQueryParams(upgradeids);
    let url = current_url + query_params;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

module.exports = PUBLIC;