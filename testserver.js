var express = require('express');
var app = express();
const l10n = require('ad-frontend-l10n-data/helper')();

var inc = require('increment').increment;
var a = 5;
var vl = inc(a); // 2

app.get('/partner/:partner/locale/:locale/key/:key', function(req, res) {
	var filename = l10n.getFilename(null, req.params.partner, req.params.locale);
	console.log(filename);
	var l10ndataobj = l10n.getL10nData(null, req.params.partner, req.params.locale);
	var value = l10ndataobj[req.params.key];
	if (value != undefined) {
		console.log(value);
	} else {
		value = req.params.key;
		console.log('No such key found');
	};
	console.log("Incremented value = " + vl);
	res.send('<h1 style = "color:red;" >' + value + '</h1>');
});

app.get('/partner/:partner/variation/:variation/locale/:locale/key/:key', function(req, res) {
	var filename = l10n.getFilename(req.params.partner, req.params.variation, req.params.locale);
	console.log(filename);
	var l10ndataobj = l10n.getL10nData(req.params.partner, req.params.variation, req.params.locale);
	var value = l10ndataobj[req.params.key];
	if (value != undefined) {
		console.log(value);
	} else {
		value = req.params.key;
		console.log('No such key found');
	};
	res.send('<h1 style = "color:red;" >' + value + '</h1>');
});

app.get('/locale/:locale/key/:key', function(req, res) {
	var filename = l10n.getFilename(null, null, req.params.locale);
	console.log(filename);
	var l10ndataobj = l10n.getL10nData(null, null, req.params.locale);
	var value = l10ndataobj[req.params.key];
	if (value != undefined) {
		console.log(value);
	} else {
		value = req.params.key;
		console.log('No such key found');
	};
	res.send('<h1 style = "color:red;" >' + value + '</h1>');
});

app.get('/key/:key', function(req, res) {
	var filename = l10n.getFilename(null, null, null);
	console.log(filename);
	var l10ndataobj = l10n.getL10nData(null, null, null);
	var value = l10ndataobj[req.params.key];
	if (value != undefined) {
		console.log(value);
	} else {
		value = req.params.key;
		console.log('No such key found');
	};
	res.send('<h1 style = "color:red;" >' + value + '</h1>');
});

app.listen(5400, function() {
	//console.log(‘Chal pea fufad da’);
});
