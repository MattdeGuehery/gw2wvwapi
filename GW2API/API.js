/**
 * @ignore
 */
const HTTP = require('./WebRequest');
let PUBLIC = {};

/**
 * base url to use for API calls
 * @private
 */
const base_url = 'https://api.guildwars2.com';

/**
 * https url for Guild Wars 2 API
 * @public
 * @type {string}
 */
PUBLIC.base_url = base_url;

/**
 * checks if conditions are true. If they are not, passed in errorMessage is thrown
 * @public
 * @param {boolean} testAnswer - testCase should equal this value
 * @param {boolean} testCase - value to be tested
 * @param {string} errorMessage - error Message to throw if testAnswer is not equal to testCase
 * @returns {boolean} true if everything is good
 * @throws {Error} if testAnswer is not equivalent to testCase, throws an error wrapped in gw2apiError
 */
PUBLIC.checkParams = function(testAnswer, testCase, errorMessage) {
    if (arguments.length !== 3) {
        throw new Error('function checkParams requires three arugments: testAnswer, testCase and errorMessage');
    }

    if (testCase !== testAnswer) {
        throw new Error(errorMessage);
    } else {
        return true;
    }
}

/**
 * Calls to Guild Wars 2 API and gets their current build number
 * @public
 * @return {Object} buildnumber
 * @property {string} id - current ID of build
 */
PUBLIC.getBuildNumber = async function() {
    let endpoint = '/v2/build';
    return HTTP.Promise.httpGet(base_url + endpoint).then(function(result) {
        return result;
    });
}

/**
 * Ensures url parameters are formatted correctly for Guild Wars 2 API call
 * @public
 * @param {string|string[]|number[]} ids
 * @returns {string} url query string with passed in params as comma separated string
 * @throws {gw2apiError} if ids param doesn't exist or is a string that contains spaces
 */
PUBLIC.parseIDQueryParams = function(ids) {
    PUBLIC.checkParams(true, arguments.length === 1, 'function parseIDQueryParams requires a parameter of ids');
    let formattedIds = '';
    if (ids && Array.isArray(ids) && ids.length) {
        // It's an array
        formattedIds = ids.join(',');
    } else {
        if (typeof ids === 'string') {
            if (ids.indexOf(' ') !== -1) {
                throw new gw2apiError('ids parameter cannot contain spaces');
            }
        }

        formattedIds = ids;
    }
    query_param = '?ids=' + formattedIds;
    return query_param;
}

/**
 * Generic Success object that is returned from any client calls
 * @public
 * @param {!Object} result - response data from API call
 * @param {!Object} result.data - data object to return to client
 * @param {?string} [message=Success] - Success message to be given to client. defaults to Success if no message is given
 * @typedef {Object} gw2apiSuccess
 * @property {string} message - message to be given to client. defaults to Success
 * @property {Object} data - data object containing requested (passed in) data
 * @property {boolean} success - boolean that will always be true to denote the request was successful
 * @returns {gw2apiSuccess} gw2apiSuccess Object
 */
PUBLIC.gw2apiSuccess = function(result, message) {
    PUBLIC.checkParams(false, arguments.length === 0, 'gw2apiSuccess must have at least one parameter, result');
    PUBLIC.checkParams(false, arguments.length > 2, 'gw2apiSuccess only accepts a max of 2 parameters, result and message');
    PUBLIC.checkParams(true, typeof result === "object" && result.hasOwnProperty('data'), 'gw2apiSuccess result param must have property data');

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

/**
 * Generic Error object that is returned from any client calls
 * @public
 * @param {?string} [message=An Error Occurred] - Error message to be given to client. defaults to An Error Occurred if no message is given
 * @typedef {Object} gw2apiError
 * @property {string} message - error message to be given to client. defaults to An Error Occurred
 * @property {null} data - will be null when request fails
 * @property {boolean} success - boolean that will always be false to denote the request failed
 * @returns {gw2apiError} gw2apiError Object
 */
PUBLIC.gw2apiError = function(message) {
    PUBLIC.checkParams(false, arguments.length > 1, 'gw2apiError only accepts a max of 1 argument: message');

    this.success = false;
    this.data = null;
    this.message = message || 'An Error Occurred';
}

module.exports = PUBLIC;