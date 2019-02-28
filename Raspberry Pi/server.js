/* Firebase Admin SDK Configuration */
var admin = require("firebase-admin");
var fs = require('fs');

const ACTIVATE = "activate";
const DEACTIVATE = "deactivate";
const RELAY = "number";

const PATH_TO_RELAYS = {
	1: "/sys/class/gpio/gpio23/value",
	2: "/sys/class/gpio/gpio24/value"
};

var serviceAccount = require("<PATH to Your serviceAccountKey.json File>");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "<PATH to Your Database URL>"
});

// Database Init 
var defaultDatabase = admin.database();
var ref = defaultDatabase.ref();

// You can retrieve services via the defaultApp variable...
var defaultDatabase = admin.database();
var ref = defaultDatabase.ref();

entitiesFromAssistant = {}

var ref = defaultDatabase.ref();

ref.on('value', function (snapshot) {
	snapshot.forEach(function (childSnapshot) {

		var key = childSnapshot.key;
		var val = childSnapshot.val();

		entitiesFromAssistant[key] = val;

	}); // snapshot.forEach(function (childSnapshot)

	console.log(entitiesFromAssistant);

	Object.entries(PATH_TO_RELAYS).forEach(([relay, path]) => {
		if (relay == entitiesFromAssistant[RELAY]) {
			if (entitiesFromAssistant[ACTIVATE]) {
				fs.writeFileSync(path, entitiesFromAssistant[ACTIVATE], function (err) {
					if (err) throw err;
				}); // fs.writeFileSync
			} else {
				fs.writeFileSync(path, entitiesFromAssistant[DEACTIVATE], function (err) {
					if (err) throw err;
				}); // fs.writeFileSync
			} // else
		} // if (relay == entitiesFromAssistant[RELAY])
	}); // Object.entries(PATH_TO_RELAYS).forEach
}); // ref.on('value', function (snapshot)
