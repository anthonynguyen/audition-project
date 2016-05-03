var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get("/get/:id", function (req, res) {
	res.send(req.params.id);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});