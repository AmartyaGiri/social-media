const express = require('express');
const { route } = require('./Routes/userRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//Route imports
const user = require('./Routes/userRoute');



app.use('/api/v1', user);



module.exports = app






