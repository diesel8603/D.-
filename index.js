const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

let tokens = [];

exports.registerToken = functions.https.onRequest((req, res) => {
  const { token } = req.body;
  if (!tokens.includes(token)) tokens.push(token);
  res.send({ success: true });
});

exports.sendNotification = functions.https.onRequest(async (req, res) => {
  const message = {
    notification: {
      title: req.body.title,
      body: req.body.body
    },
    tokens: tokens
  };
  const response = await admin.messaging().sendMulticast(message);
  res.send(response);
});
