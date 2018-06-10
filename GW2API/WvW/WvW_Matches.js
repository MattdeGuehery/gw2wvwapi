const HTTP = require('./GW2API/WebRequest');
const API = require('./GW2API/API');
const WvW = require('./WvW');
let PUBLIC = {};

const base_endpoint = '/v2/wvw';

PUBLIC.Get = {};

PUBLIC.Get.Matches = {};
PUBLIC.Get.Matches.All = function() {
    /**
     * Optional parameter: 
     * id
     */
    const endpoint = '/matches';
}

PUBLIC.Get.Matches.ById = function(matchid) {
    /**
     * Optional parameter: 
     * id
     */
    const endpoint = '/matches';
}

PUBLIC.Get.Matches.ByIds = function(matchids) {
    /**
     * Optional parameter: 
     * id
     */
    const endpoint = '/matches';
}

PUBLIC.Get.Matches.ByWorld = function(worldid) {
    /**
     * Optional parameter: 
     * id
     */
    const endpoint = '/matches';
}