const express = require('express');
const sendEmail = require('../../helpers/sendEmailHelper');
const {
  NAME_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  DOB_REGEX
} = require('../../utils/Constants');
const router = express.Router();

// Import form model
const Form = require('../../models/Form');

// @route GET /forms
// @desc Get all forms
// @access Public
router.get('/forms', (req, res) => {
  Form.find()
    .sort({ createdOn: -1 })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    })
});

// @route  POST /form
// @desc   Add new form
// @access Public
router.post('/form', (req, res) => {
  const { name, dob, email, phone } = req.body;
  const isValidPhone = phone && phone.match(PHONE_REGEX);
  const isValidName = name && name.match(NAME_REGEX);
  const isValidEmail = email && email.match(EMAIL_REGEX);
  const isValidDOB = dob && dob.match(DOB_REGEX);
  if (isValidPhone && isValidName && isValidDOB && isValidEmail) {
    const formObject = {
      name: name,
      email: email,
      dob: dob,
      phone: phone
    };
    Form.findOne(formObject)
      .then((form) => {
        if (form === null) {
          const newForm = new Form(formObject);
          newForm.save().then((newForm) => res.json({
            'message': "Form saved!"
          }));
          sendEmail(name, email);
        } else {
          res.status(409).json({
            'message': "Duplicate form"
          });
        }
      });
  } else {
    res.status(400).json({
      'message': "Bad request"
    });
  }
})

module.exports = router;