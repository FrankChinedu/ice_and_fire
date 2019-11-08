const transform = require('../../utils/resquestUtil');
const Book = require('../../models/books');

const create = async (req, res) => {

  const body = req.body;

  let authors = body.authors.split(',');
  body.authors = authors;
  
  try {
    const result = await Book.create(body);
    return res.status(201).json(transform.response(201, 'success', result));
  } catch (e) {
    return res.status(400).json(transform.response(400, 'error', {
      message: e.message
    }));
  }
};

const get = async (req, res) => {
  try {
    const result = await Book.find({});
    return res.status(200).json(transform.response(200, 'success', result));
  } catch (e) {
    return res.status(400).json(transform.response(400, 'error', {
      message: e.message
    }));
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Book.findById(id);
    return res.status(200).json(transform.response(200, 'success', result));
  } catch (e) {
    return res.status(400).json(transform.response(400, 'error', {
      message: e.message
    }));
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  let body = req.body
  body = body ? body : {};

  try {
    await Book.findByIdAndUpdate(id, {...body}); // this does not return the updated value 
    const result = await Book.findById(id); // hence this following your test book..
    return res.status(200).json(transform.response(200, 'success',
     {message: `the Book ${result.name} was updated successfully`, result}));
  } catch (e) {
    return res.status(400).json(transform.response(400, 'error', {
      message: e.message
    }));
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  let body = req.body
  body = body ? body : {};

  try {
    const result = await Book.findByIdAndDelete(id);
    return res.status(204).json(transform.response(204, 'success',result));
  } catch (e) {
    return res.status(400).json(transform.response(400, 'error', {
      message: e.message
    }));
  }
};

module.exports = {
  create,
  get, 
  getById,
  update,
  deleteBook
};
