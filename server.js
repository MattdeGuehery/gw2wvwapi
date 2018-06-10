require('express');
const request = require('request');
const rp = require('request-promise');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '. showing at http://localhost:' + PORT);
});

function handleRequest(req, res) {
    if (req.method == 'GET') {
        var body = getAccounts();
        res.send(body);
    }
}

function getAccounts() {

}