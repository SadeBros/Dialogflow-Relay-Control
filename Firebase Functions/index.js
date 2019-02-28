//  For more information about this code, please click
//  https://firebase.google.com/docs/functions/get-started

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var database = admin.database();

exports.relay = functions.https.onRequest((request, response) => {

    //  Dialogflow sends API V2 json file to Firebase Functions via HTTP POST request.
    //  https://us-central1-MY_PROJECT.cloudfunctions.net/relay
    let params = request.body.queryResult.parameters;

    console.log("This message will be printed on /functions/logs on Firebase.");
    console.log(params);

    database.ref().set(params);

    //  API V2 needs below response format.
    response.send(
        {
            "payload": {
                "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                        "items": [
                            {
                                "simpleResponse": {
                                    "textToSpeech": "Relay is controlled succesfully."
                                }
                            }
                        ]
                    }
                }
            }
        }
    );
});
