const HTTP = require('../WebRequest');
const API = require('../API');
let PUBLIC = {};

const base_endpoint = '/v2/wvw';
const matches_endpoint = '/matches';
const current_url = API.base_url + base_endpoint + matches_endpoint;

PUBLIC.Get = {};
PUBLIC.Get.Matches = {};

PUBLIC.Get.Matches.All = function() {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/matches
     */
    let url = current_url;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

PUBLIC.Get.Matches.ById = function(matchid) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/matches
     * @param: string matchid of format x-x e.g. 1-3
     */
    let url = current_url + matchid;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

PUBLIC.Get.Matches.ByWorld = function(worldid) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/matches
     * @param: comma separated string or array of match ids
     */
    let url = current_url + '?world=' + worldid;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

PUBLIC.Get.Matches.ByIds = function(matchids) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/matches
     * @param: comma separated string or array of match ids
     */
    let query_params = API.parseIDQueryParams(matchids);
    let url = current_url + query_params;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

module.exports = PUBLIC;