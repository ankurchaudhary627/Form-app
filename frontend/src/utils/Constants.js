// Layouts
const FORM_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 6 },
};
const FORM_TAIL_LAYOUT = {
  wrapperCol: { offset: 6, span: 6 },
};

// Urls
const BASE_URL = `${process.env.REACT_APP_BASE_URL}`;

// Messages
const AGE_WARNING_MESSAGE = `Age can't be less than 18 years`;
const VALID_PHONE_WARNING_MESSAGE = `Enter valid phone number!`;
const DUPLICATE_FORM_WARNING_MESSAGE = 'Form with these values exists. Try again!';
const INPUT_NAME_MESSAGE = 'Please input your name.';
const VALID_NAME_WARNING_MESSAGE = 'Please enter valid name.';
const NAME_REGEX = '^[A-Za-z]+[\\s,]?[A-Za-z]+$';
const INPUT_EMAIL_MESSAGE = 'Please input your email!';
const VALID_EMAIL_WARNING_MESSAGE = 'Please enter valid email.';
const EMAIL_REGEX = '^[^\\s@]+@[^\\s@]+$';
const INPUT_DOB_MESSAGE = 'Please input your date of birth!';
const INPUT_PHONE_MESSAGE = 'Please input your phone number!';

export {
  FORM_LAYOUT,
  FORM_TAIL_LAYOUT,
  BASE_URL,
  AGE_WARNING_MESSAGE,
  VALID_PHONE_WARNING_MESSAGE,
  DUPLICATE_FORM_WARNING_MESSAGE,
  INPUT_NAME_MESSAGE,
  VALID_NAME_WARNING_MESSAGE,
  NAME_REGEX,
  INPUT_EMAIL_MESSAGE,
  VALID_EMAIL_WARNING_MESSAGE,
  EMAIL_REGEX,
  INPUT_DOB_MESSAGE,
  INPUT_PHONE_MESSAGE,
}