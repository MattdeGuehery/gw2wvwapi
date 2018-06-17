const WvW_Abilities = require('./Abilities');
const WvW_Matches = require('./Matches');
const WvW_Objectives = require('./Objectives');
const WvW_Ranks = require('./Ranks');
const WvW_Upgrades = require('./Upgrades');

let PUBLIC = {};
PUBLIC.Get = {};

PUBLIC.Get.Abilities = WvW_Abilities.Get.Abilities;
PUBLIC.Get.Matches = WvW_Matches.Get.Matches;
PUBLIC.Get.Objectives = WvW_Objectives.Get.Objectives;
PUBLIC.Get.Ranks = WvW_Ranks.Get.Ranks;
PUBLIC.Get.Upgrades = WvW_Upgrades.Get.Upgrades;

module.exports = PUBLIC;