var express = require('express');
var app = express();

var mongo = require("mongodb");
var MongoClient = mongo.MongoClient;
var assert = require("assert");

var db = null;

var MONGO_URL = "mongodb://localhost:27017/audition";
var COLLECTION = "messages";
MongoClient.connect(MONGO_URL, function(err, _db) {
	assert.equal(null, err);
	console.log("Connected to mongodb server at " + MONGO_URL);
	db = _db;
});

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.get("/get/messages", function(req, res){	
	db.collection(COLLECTION).find().toArray(function(err, messages){
		if (err){
        res.send(err);
		} else
		{
        res.json(messages);
		}
	});
});

app.get("/get/:id", function (req, res) {
	// Cannot search _id with a string, you have to convert it to an ObjectId
	var id = mongo.ObjectId(req.params.id);

	db.collection(COLLECTION).findOne({_id: id}, function(err, doc) {
		assert.equal(null, err);

		if (doc != null) {
			res.send(doc.message);
		} else {
			res.send("No message with that id");
		}
	});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
