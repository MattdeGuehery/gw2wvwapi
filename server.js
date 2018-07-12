const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const GW2API = require('./GW2API');

const PORT = 3000;

var DIST_DIR = path.join(__dirname, 'gw2wvwapi', 'dist');

app.use(express.static(DIST_DIR));
app.get('/api', api_request);
app.post('/api', api_request);
app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '. showing at http://localhost:' + PORT);
});

async function api_request(req, res) {
	let result;

	var data = req.body;
	var command = data.command;
	try {
		var functionCall = functionNameFromString(command);
		if (req.method === 'GET') {
			res.send('Not Accepting GET requests at this time');
		} else if (req.method === 'POST') {
			result = await functionCall(data.record);
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

function SchemaValidator(dataReq) {
	let error = false;
	var command = dataReq.command;
	var record = dataReq.record;

	var functionCall = functionNameFromString(command);
	var schema = new functionCall().ParamSchema;

	if (!schema && record) {
		
	}

	if (error) {
		throw error;
	} else {
		return true;
	}
}