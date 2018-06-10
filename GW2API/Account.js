const HTTP = require('./WebRequest');
const API = require('./API');
let public_methods = {};

const base_endpoint = '/v2/account';
/**
 * Possible parameters: 
 * Takes Authorization Bearer Header containing API Key
 */