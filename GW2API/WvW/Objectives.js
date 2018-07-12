const HTTP = require('../WebRequest');
const API = require('../API');
let PUBLIC = {};

const base_endpoint = '/v2/wvw';
const objectives_endpoint = '/objectives';
const current_url = API.base_url + base_endpoint + objectives_endpoint;

PUBLIC.Get = {};
PUBLIC.Get.Objectives = {};

PUBLIC.Get.Objectives.All = function() {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/objectives
     */
    let url = current_url;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return PUBLIC.Get.Objectives.ByIds(result.data);
    });
}

PUBLIC.Get.Objectives.ById = function(objectiveid) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/objectives
     * @param: objective id as string or int
     */
    let url = current_url + '/' + objectiveid;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

PUBLIC.Get.Objectives.ByIds = function(objectiveids) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/objectives
     * @param: comma separated string or array of objective ids
     */
    let query_params = API.parseIDQueryParams(objectiveids);
    let url = current_url + query_params;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

module.exports = PUBLIC;