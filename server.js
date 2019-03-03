const http = require('http');
const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const text = require("./send_sms").text;
const messages = ["Hey honey, can you pick me up?", "Sorry, my car can't start"];

app.use(bodyParser.urlencoded({extended: false}));

app.post('/sms', (req, res) => {
  console.log(req.body.Body);
  text("hello Chenglin from SF!");
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});