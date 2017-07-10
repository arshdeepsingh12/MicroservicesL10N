var express = require('express');

var app = express();

const PORT = process.env.PORT || 5401;

app.use('/', require('./routes'));

app.listen(PORT, function() {
	console.log('Server started on http://localhost:' + PORT);
});
