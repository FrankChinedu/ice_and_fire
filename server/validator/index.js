const { validateAll } = require('indicative/validator');
const transform = require('../utils/resquestUtil');
const {
  message,
  sanitizeRules,
} = require('./validate-utils')


const create = async (req, res, next) => {
  const rules = {
    name: 'required',
    isbn: 'required|number',
    authors: 'required',
    country: 'required',
    publisher: 'required',
    number_of_pages: 'required|number',
    release_date: 'required|date',
  };

  const data = req.body;

  try {
    await validateAll(data, rules, message);
    return next();
  } catch (e) {
    return res.status(400).json(transform.response(400, 'error', {e}));
  }
}

const getbyId = (req, res, next) => {
  const id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json(transform.response(400, 'error', {message: 'id has to be a valid objectId'}));
  }
  next();
}

module.exports = {
  create,
  getbyId
};
