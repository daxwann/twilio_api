const http = require('http');
const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const text = require("./send_sms").text;
const lt = /</g, 
    gt = />/g, 
    ap = /'/g, 
    ic = /"/g;
const topics = ['car', 'hospital', 'dog'];
const messages = {
  car: ["Hey honey, can you pick me up?", "Sorry, my car can't start", "Can you please hurry? xx", String.fromCodePoint(0x1F698)],
  hospital: ["babe, i'm sick", "can you take me to the hospital?", "can you call me?", String.fromCodePoint(0x1F912)],
  dog: ["sweetie, Marlie is not feeling well", String.fromCodePoint(0x1F436), "we need to get her to the vet", "it's an emergency"],
  generic: ["can you come home right now?", String.fromCodePoint(0x1F3E1), "it's an emergency", "call me right away"]
};

app.use(bodyParser.urlencoded({extended: false}));

//text user the set of messages in a period of time.
function text_messages(topic, user_phone) {
  topic.forEach(function(msg, idx){
    setTimeout(function(){
      text(msg, user_phone);
    }, 3000 * (idx + 1));
  });
}

//start texting service after period of time (5 minutes in usual scenario). Eventually user can set time.
app.post('/sms', (req, res) => {
  topic = req.body.Body.replace(lt, "&lt;").replace(gt, "&gt;").replace(ap, "&#39;").replace(ic, "&#34;").toLowerCase();
  if (topic == 'car') {
    topic = messages.car;
  } else if (topic == 'hospital') {
    topic = messages.hospital;
  } else if (topic == 'dog') {
    topic = messages.dog;
  } else {
    topic = messages.generic;
  }
  user_phone = req.body.From;
  setTimeout(function() {text_messages(topic, user_phone);}, 10000);
});

//open server
http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});