const HTTP = require('./WebRequest');
const API = require('./API');
let PUBLIC = {};

const base_endpoint = '/v2/guild';

PUBLIC.Get = {};

PUBLIC.Get.ById = function(guildid) {
    let url = API.base_url + base_endpoint + '/' + guildid;
    return HTTP.Promise.httpGet(url).then((result) => {
        return result;
    });
}