const express = require('express');
const validations = require('../data_validations/validateKeys');
const dataTranslations = require('../data_translations/translations');
var app = express();
var bodyParser = require('body-parser');
var status; // Keys are present in request or not
var TranslationObject; //This object contains filename and l10n data object returned from translations module
var keysTranslations = {}; //This object contains translation of requested keys
var fileName, l10nDataObject;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
	extended: true
})); // support encoded bodies

app.post('/translate', function(req, res) {
	status = validations.validate(req.body); //check if there are any keys or not
	if (status === false) {
		res.send('Please provide any key');
	} else {
		TranslationObject = dataTranslations.getL10nTranslationObject(req.body);
		fileName = TranslationObject.fileName;
		l10nDataObject = TranslationObject.l10nDataObj;

		req.body.keys.forEach(function(entry) {

			if (l10nDataObject[entry] === undefined) {
				keysTranslations[entry] = entry;
			} else {
				keysTranslations[entry] = l10nDataObject[entry];
			}
		});
		console.log(fileName);
		res.send(keysTranslations);
	}
});

module.exports = app;
