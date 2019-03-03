require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const server_phone = process.env.TWILIO_SERVER_PHONE;
const client = require('twilio')(accountSid, authToken);


function text(my_message, user_phone) {
    client.messages
      .create({
        body: my_message,
        from: server_phone,
        to: user_phone
      })
      .then(message => console.log(message.sid));
}

module.exports = {text: text}