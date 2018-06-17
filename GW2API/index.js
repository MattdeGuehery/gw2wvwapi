const Account = require('./Account');
const API = require('./API');
const Colors = require('./Colors');
const Emblem = require('./Emblem');
const Guilds = require('./Guilds');
const Helpers = require('./Helpers');
const WebRequest = require('./WebRequest');
const Worlds = require('./Worlds');
const WvW = require('./WvW');

let PUBLIC = {};

PUBLIC.Account = Account;
PUBLIC.API = API;
PUBLIC.Colors = Colors;
PUBLIC.Emblem = Emblem;
PUBLIC.Guilds = Guilds;
PUBLIC.Helpers = Helpers;
PUBLIC.WebRequest = WebRequest;
PUBLIC.Worlds = Worlds;
PUBLIC.WvW = WvW;


module.exports = PUBLIC;