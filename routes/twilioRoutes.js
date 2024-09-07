const express = require('express');
const twilio =  require('twilio');
const router = express.Router();
require('dotenv').config();


const VoiceResponse = twilio.twiml.VoiceResponse;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER;
const interviewLink = process.env.INTERVIEW_LINK;

const client = new twilio(accountSid, authToken);

// Call Handler

router.post('/ivr', (req, res) => {
    console.log('Received /ivr request:', req.body);

    const twiml = new VoiceResponse();

    const gather = twiml.gather({
        input: 'dtmf',
        timeout: 10,
        numDigits: 1,
        action: '/twilio/gather',
    });

    gather.play('https://1drv.ms/u/s!AssNWNmUSYNtjv9VSb0TQm5cQ8_YQQ?e=ubsLY3');

    res.type('text/xml');
    res.send(twiml.toString());
});

//Keypress Handling

router.post('/gather', (req, res) => {
    console.log('Received /gather request:', req.body);

    const digits = req.body.Digits;
    const twiml = new VoiceResponse();

    if (digits === '1') { 
        
        twiml.say('Thank you! You will receive a personalized interview link.');
    

    //Send Interview link through SMS
    client.messages.create({
        body: `Here is your interview link: ${interviewLink}`,
        from: twilioPhoneNumber,
        to: recipientPhoneNumber,

    })
    .then(message => console.log('SMS sent:', message.sid))
    .catch(err => console.log('Error:', err));

    }else {
        twiml.say('Invalid input. Please press 1.');
      }

      res.type('text/xml');
      res.send(twiml.toString());

});

//Calling route

router.get('/makeCall', (req, res) => {
    client.calls.create({
        url: 'https://1drv.ms/u/s!AssNWNmUSYNtjv9VSb0TQm5cQ8_YQQ?e=ubsLY3',
        to: recipientPhoneNumber,
        from: twilioPhoneNumber
    })
    .then(call => console.log('Call initiated:', call.sid))
    .catch(err => console.log('Error:', err));

    res.send('Call initiated!');
});

module.exports = router;
