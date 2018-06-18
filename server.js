const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const path = require('path');
const util = require('util');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const GW2API = require('./GW2API');

const PORT = 3000;

var DIST_DIR = path.join(__dirname, 'gw2wvwapi', 'dist');

app.use(express.static(DIST_DIR));
app.get('/api', api_request);
app.post('/api', api_request);
app.get('/abilities', ability_request);
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '. showing at http://localhost:' + PORT);
});

async function api_request(req, res) {
	let result;

	var data = req.body;
	var command = data.command;
	var functionCall = functionNameFromString(command);
	try {
		if (req.method === 'GET') {
			result = await functionCall();
		} else if (req.method === 'POST') {
			result = await functionCall(data.record);
		}
		result = new GW2API.API.gw2apiSuccess(result);
    } catch(e) {
		result = new GW2API.API.gw2apiError(e.toString());
	}

	res.send(result);
}

async function ability_request(req, res) {
	try {
		if (req.method === 'GET') {
			let ids = await GW2API.WvW.Get.Abilities.All();
			result = await GW2API.WvW.Get.Abilities.ByIds(ids.data);
		} else if (req.method === 'POST') {
			result = await GW2API.WvW.Get.Abilities.ByIds(data.record);
		}
		result = new GW2API.API.gw2apiSuccess(result);
    } catch(e) {
		result = new GW2API.API.gw2apiError(e.toString());
	}

	res.send(result);
}

function functionNameFromString(string) {
    var scope = GW2API;
    var scopeSplit = string.split('.');
    for (i = 0; i < scopeSplit.length - 1; i++) {
        scope = scope[scopeSplit[i]];
        if (scope == undefined) return;
    }

    return scope[scopeSplit[scopeSplit.length - 1]];
}
