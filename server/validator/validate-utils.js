const message = {
  required: 'Input your {{ field }}',
  email: 'The value provided is not an email',
  integer: '{{ field }} must be an integer',
  unique: '{{ field }} already existed',
  alpha: 'Only letters allowed as {{ field }}',
  alphaNumeric: 'Only letters and numbers are allowed as {{ field }}',
  min: '{{ field }} should not be less than {{ argument.0 }}',
  max: '{{ field }} should not be more than {{ argument.0 }}',
};

const sanitizeRules = {
  name: 'trim',
  isbn: 'trim',
  authors: 'trim',
  country: 'trim',
  number_of_pages: 'trim',
  publisher: 'trim',
  release_date: 'trim',
};

module.exports = {
  message,
  sanitizeRules,
};
