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
    return HTTP.Promise.httpGet(base_url + endpoint).then(function(result) {
        return result;
    });
}

PUBLIC.parseIDQueryParams = function(ids) {
    let formattedIds = '';
    if (ids && Array.isArray(ids) && ids.length) {
        // It's an array
        formattedIds = ids.join(',');
    } else {
        if (typeof ids === 'string') {
            if (ids.indexOf(' ') !== -1) {
                throw new Error('ids parameter cannot contain spaces');
            }
        }

        formattedIds = ids;
    }
    query_param = '?ids=' + formattedIds;
    return query_param;
}

PUBLIC.gw2apiSuccess = function(result, message) {
    if (arguments.length === 1 && typeof arguments[0] === 'string') {
        this.message = result;
    } else if (arguments.length === 1 && typeof arguments[0] !== 'string') {
        this.data = result.data;
        this.message = 'Success';
    } else {
        this.data = result.data;
        this.message = message;
    }
    this.success = true;
}

PUBLIC.gw2apiError = function(message) {
    this.success = false;
	this.data = null;
	this.message = message;
}

module.exports = PUBLIC;