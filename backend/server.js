// Import packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Import routes
const forms = require('./routes/api/forms');

// Config env variables
dotenv.config({
  path: __dirname + '/.env'
});

const app = express();

app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

app.use(cors());

// Import db uri
const dbUri = require('./config/keys').mongoURI;

// connect to database
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('Could not connect to db', err));

// Use routes
app.use('/', forms);

// Define port to be used
const port = process.env.PORT || 8081;

app.listen(port, () => console.log(`server started on PORT ${port}`));