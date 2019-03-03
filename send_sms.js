require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const server_phone = process.env.TWILIO_SERVER_PHONE;
const user_phone = process.env.TWILIO_USER_PHONE;
const client = require('twilio')(accountSid, authToken);

console.log(server_phone);
console.log(user_phone);
let send_sms = {
  text: (my_message) => {
    client.messages
      .create({
        body: my_message,
        from: server_phone,
        to: user_phone
      })
      .then(message => console.log(message.sid));
  }
}

module.exports = send_sms