var assert = require("assert");
var express = require("express");
var mongo = require("mongodb");
var url = require("url");
var fs = require("fs");
var morgan = require("morgan");

var app = express();
var accessLogStream = fs.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var MongoClient = mongo.MongoClient;
var db = null;

var isPalindrome = require('./module/palindrome');

var MONGO_HOST = "localhost";
var MONGO_PORT = "27017";
var MONGO_DATABASE = "audition";

if (process.env.MONGODB_PORT != null) {
	var addr = url.parse(process.env.MONGODB_PORT); // e.g. tcp://172.17.0.5:5432
	MONGO_HOST = addr.hostname;
	MONGO_PORT = addr.port;
}

var MONGO_URL = "mongodb://" + MONGO_HOST + ":" + MONGO_PORT + "/" + MONGO_DATABASE;

var COLLECTION = "messages";
MongoClient.connect(MONGO_URL, function(err, _db) {
	assert.equal(null, err);
	console.log("Connected to mongodb server at " + MONGO_URL);
	db = _db;
});

app.use(express.static("static"));

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/api/messages", function(req, res){
	db.collection(COLLECTION).find().toArray(function(err, messages){
		if (err) {
			res.send(err);
		} else {
			res.json(messages);
		}
	});
});

app.get("/api/messages/:id", function (req, res, next) {
	// Cannot search _id with a string, you have to convert it to an ObjectId
	var id;
	try {
		id = mongo.ObjectId(req.params.id);
	} catch (e) {
		next();
		return;
	}

	db.collection(COLLECTION).findOne({_id: id}, function(err, doc) {
		assert.equal(null, err);

		if (doc !== null) {
			res.json(doc);
		} else {
			res.status(404);
			res.json({error: "No message with that object id"});
		}
	});
});

app.get("/api/messages/:message_id", function (req, res) {
	var id = parseInt(req.params.message_id);

	db.collection(COLLECTION).findOne({message_id: id}, function(err, doc) {
		assert.equal(null, err);

		if (doc !== null) {
			res.json(doc);
		} else {
			res.status(404);
			res.json({error: "No message with that id"});
		}
	});
});

var getNextSequence = function(callback) {
	db.collection("counters").findAndModify(
		{_id: "message_id"},
		[],
		{$inc: {seq: 1}},
		function (err, r) {
			if (r === null || r.value === null) {
				// counters collection doesn't exist, so add default values
				db.collection("counters").insert({_id: "message_id", seq: 1}, function(err, result) {
					callback(0);
				});
			} else {
				callback(r.value.seq);
			}
		}
	);
};

app.post("/api/messages", function(req, res) {
	if (req.body.hasOwnProperty("message")) {
		var palinDrome = isPalindrome(req.body.message);
		var d = new Date();
		var currentTime = d.toUTCString();
		getNextSequence(function(next_id) {
			db.collection(COLLECTION).insert(
				{message: req.body.message, message_id: next_id, is_palindrome: palinDrome, date: currentTime},
				function(err, result) {
					res.json({_id: result.insertedIds[0], message_id: next_id, message: req.body.message,
						is_palindrome: palinDrome, date: currentTime});
				}
			);
		});
	} else {
		res.status(400);
		res.json({error: "You must send a POST request with a 'message' key"});
	}
});

app.delete("/api/messages/:id", function(req, res) {
	var id = mongo.ObjectId(req.params.id);
	db.collection(COLLECTION).deleteOne({_id: id}, function(err, result) {
		if (result.result.n === 1) {
			res.json({success: "Message deleted"});
			// console.log(result.result.n);
		} else {
			res.status(404);
			res.json({error: "No message with that object id"});
		}
	});
});

app.listen(3000, function () {
  console.log("Audition project listening on port 3000!");
});
