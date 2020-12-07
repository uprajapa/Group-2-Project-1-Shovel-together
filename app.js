/**
 * @file Main server file for the Application.
 * @author Krutin Trivedi, Banner No: B00843515 <krutin@dal.ca>
 */

const express = require('express');
var cors = require('cors')

const bodyParser = require('body-parser');

var app = express();

app.use(cors())
app.use(express.json());

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

// defining routes 
const JobRoute = require('./routes/profileManagement');
app.use('/', JobRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
