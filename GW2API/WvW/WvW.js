const HTTP = require('./WebRequest');
const API = require('./API');
let PUBLIC = {};

const base_endpoint = '/v2/wvw';
PUBLIC.base_endpoint = base_endpoint;
PUBLIC.Get = {};

PUBLIC.Get.WvW_Abilities = {};
PUBLIC.Get.WvW_Abilities.AllIds = function() {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/abilities
     * Return all WvW ability ids in an array
     */
    const endpoint = '/abilities';
    let url = API.base_url + base_endpoint + endpoint;
    HTTP.httpGet(url).then((result) => {
        return result;
    });
}

PUBLIC.Get.WvW_Abilities.ById = function(abilityid) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/abilities
     * Optional parameter: 
     * id
     */
    const endpoint = '/abilities';
    let url = API.base_url + base_endpoint + endpoint + '/' + abilityid;
    HTTP.httpGet(url).then((result) => {
        return result;
    });
}

PUBLIC.Get.WvW_Abilities.ByIds = function(abilityids) {
    /**
     * https://wiki.guildwars2.com/wiki/API:2/wvw/abilities
     * Optional parameter: 
     * ids as comma separated list
     */
    const endpoint = '/abilities';
    var query_params = API.parseIDQueryParams(abilityids);
    let url = API.base_url + base_endpoint + endpoint + query_params;

    HTTP.httpGet(url).then((result) => {
        return result;
    });
}

PUBLIC.Get.Matches = function() {
    /**
     * Optional parameter: 
     * id
     */
    const endpoint = '/matches';
}

PUBLIC.Get.Objectives = function() {
    /**
     * Optional parameter: 
     * id
     */
    const endpoint = '/objectives';
}

PUBLIC.Get.Ranks = function() {
    /**
     * Optional parameter: 
     * id
     */
    const endpoint = '/ranks';
}

PUBLIC.Get.Upgrades = function() {
    /**
     * Optional parameter: 
     * id
     */
    const endpoint = '/upgrades';
}

module.exports = PUBLIC;