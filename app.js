require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contactsRoute');

const app = express();


app.use(bodyParser.json());

//Routes
app.use('/', contactRoutes);

//Setting PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
