const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Form schema
const FormSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    required: false,
    default: Date.now,
  }
});

module.exports = Form = mongoose.model('form', FormSchema);