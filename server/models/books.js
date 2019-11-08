const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  isbn: {
    type: String,
    required: true,
    unique: true
  },
  authors: {
    type: Array,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  number_of_pages: {
    type: Number,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  release_date: {
    type: Date,
    required: true
  },
  created_at: Date,
  updated_at: Date
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
