const HTTP = require('./WebRequest');
let PUBLIC = {};

const base_url = 'https://api.guildwars2.com';
/**
 * Possible query parameters: 
 * id
 */

PUBLIC.base_url = base_url;

PUBLIC.getBuildNumber = function() {
    let endpoint = '/v2/build';
    HTTP.httpGet(base_url + endpoint);
}

PUBLIC.parseIDQueryParams = function(ids) {
    let formattedIds = '';
    if (ids && Array.isArray(ids) && ids.length) {
        // It's an array
        formattedIds = ids.split(',');
    } else if (typeof ids === 'string') {
        if (ids.indexOf(' ') !== -1) {
            throw new Error('ids parameter cannot contain spaces');
        }
        formattedIds = ids;
    }
    query_param = '?ids=' + formattedIds;
    return query_param;
}

PUBLIC.gw2apiSuccess = function(data, message) {
    this.success = true;
    this.data = data;
    this.message = message;
}

PUBLIC.gw2apiError = function(message) {
    this.success = false;
	this.data = null;
	this.message = message;
}

module.exports = PUBLIC;