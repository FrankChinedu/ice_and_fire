
const externalBooks = require('./externalBooks');
const books = require('./books');

module.exports = app => {
  app.use('/api/external-books', externalBooks);
  app.use('/api/v1/books', books);
};