const express = require('express');
const twilio =  require('twilio');
const bodyParser = require('body-parser');
const twilioRoutes = require('./routes/twilioRoutes');
const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/twilio', twilioRoutes);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
