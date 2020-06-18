const xssFilters = require('xss-filters');
const express = require('express');
const nodemailer = require('nodemailer');
const validator = require('validator');

const app = express();

app.use(express.json());

app.get('/', function(req, res) {
  res.status(405).json({ error: 'Nothing to see here.' });
});

app.post('/', function(req, res) {
  const attributes = ['name', 'email', 'msg'];
  const sanitizedAttributes = attributes.map((n) =>
    validateAndSanitize(n, req.body[n])
  );
  const someInvalid = sanitizedAttributes.some((r) => !r);

  if (someInvalid) {
    return res.status(422).json({ error: 'Invalid email!' });
  }

  sendMail(...sanitizedAttributes);
  res.status(200).json({ message: 'Message Sent' });
});
module.exports = {
  path: '/api/contact',
  handler: app
};

const validateAndSanitize = (key, value) => {
  const rejectFunctions = {
    name: (v) => v.length < 4,
    email: (v) => !validator.isEmail(v),
    msg: (v) => v.length < 4
  };
  // If object has key and function returns false, return sanitized input. Else, return false
  return (
    rejectFunctions.hasOwnProperty(key) &&
    !rejectFunctions[key](value) &&
    xssFilters.inHTMLData(value)
  );
};

const sendMail = (name, email, msg) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.google.com',
    secure: false,
    port: 587,
    auth: {
      user: 'test.tollanes@gmail.com',
      pass: 'hmsjifpcbrtjwjlu'
    }
  });
  transporter.sendMail({
    from: email,
    to: 'andreas@tollanes.com',
    subject: `New contact from portfolio site - ${email}`,
    text: msg
  });
};
