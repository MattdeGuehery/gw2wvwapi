const HTTP = require('../WebRequest');
const API = require('../API');
let PUBLIC = {};

const base_endpoint = '/v2/wvw';
const abilities_endpoint = '/abilities';
const current_url = API.base_url + base_endpoint + abilities_endpoint;

PUBLIC.Get = {};
PUBLIC.Get.Abilities = {};

PUBLIC.Get.Abilities.All = function() {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/abilities
     * @return all WvW abilities
     */

    this.ParamSchema = {};

    let url = current_url;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return PUBLIC.Get.Abilities.ByIds(result.data);
    });
}

PUBLIC.Get.Abilities.ById = function(abilityid) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/abilities
     * @param: ability id as string or int
     */
    let url = current_url + '/' + abilityid;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

PUBLIC.Get.Abilities.ByIds = function(abilityids) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/abilities
     * @param: comma separated string or array of ability ids
     */
    let query_params = API.parseIDQueryParams(abilityids);
    let url = current_url + query_params;

    return HTTP.Promise.httpGet(url).then(function(result) {
        return result;
    });
}

module.exports = PUBLIC;