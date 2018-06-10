const HTTP = require('./WebRequest');
const API = require('./API');
let PUBLIC = {};

const base_endpoint = '/v2/emblem';

/**
 * Optional query parameter:
 * id
 */

PUBLIC.Get = {};

PUBLIC.Get.Emblem = function(foregroundids, backgroundids) {
    var foreground, background;
    if (foregroundids) {
        var foreground = PUBLIC.Get.Foregrounds(foregroundids);
    }
    if (backgroundids) {
        var background = PUBLIC.Get.Backgrounds(backgroundids);
    }

    return {
        foreground: foreground,
        background: background
    }
}

PUBLIC.Get.Foregrounds = function(foregroundids) {
    const endpoint = '/foregrounds';
}

PUBLIC.Get.Backgrounds = function(backgroundids) {
    const endpoint = '/backgrounds';
}

module.exports = PUBLIC;