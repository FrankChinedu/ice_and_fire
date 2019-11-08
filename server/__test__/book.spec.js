const supertest = require('supertest');
const { app } = require('../app');
const Book = require('../models/books');
const mongoose = require('mongoose');
const dummyBooks = require('../seed/index');

const server = () => supertest(app);
const DATABASE_URL_TEST = process.env.DATABASE_URL_TEST || 'mongodb://localhost:27017/books-test';
const bodyResult = {
  status_code: '',
  status: '',
  data: []
};

const dataArrar = {
  authors: '',
  _id: '',
  name: '',
  isbn: '',
  country: '',
  number_of_pages: '',
  publisher: '',
  release_date: ''
};

describe('BOOKS', ()=>{
  beforeAll(async () => {

    const url = DATABASE_URL_TEST;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true, 
      useUnifiedTopology: true
    });
  });

  afterEach(async () => {
    await Book.deleteMany();
  });

  describe('CREATE BOOK', () => {

    it('should throw validation error if book values are not passed', async ()=>{
      const { status, body } = await server().post(
        '/api/v1/books')

        expect(body.status_code).toBe(400);
        expect(body.status).toBe('error');
        expect(body).toMatchSnapshot();
    });

    it('should create a new book', async ()=>{
      const { status, body } = await server().post(
        '/api/v1/books').send(dummyBooks[0]);
        
        expect(status).toBe(201);
        expect(Object.keys(body)).toEqual(Object.keys(bodyResult));
        expect(body.status_code).toBe(201);
        expect(body.status).toBe('success');
        expect(Object.keys(body)).toMatchSnapshot();
    });

    it('should throw validation error if data is not unique', async ()=>{

      await Book.create(dummyBooks[0]);

      const { status, body } = await server().post(
        '/api/v1/books').send(dummyBooks[0]);
        expect(status).toBe(400);
        expect(body.status_code).toBe(400);
        expect(body.status).toBe('error');
        expect(body).toMatchSnapshot();
    });

  });

  describe('READ BOOK', () => {
    it('should get all availbales', async () => {
      await Book.collection.insert(dummyBooks);

      const { status, body } = await server().get(
        '/api/v1/books');

        expect(status).toBe(200);
        expect(body.status_code).toBe(200);
        expect(body.status).toBe('success');
        expect(Object.keys(body)).toEqual(Object.keys(bodyResult));
        expect(Object.keys(body.data[0])).toEqual(Object.keys(dataArrar));
        expect(Object.keys(body)).toMatchSnapshot();
    });


    it('should get a single book by its Id', async () => {
      const result = await Book.collection.insert(dummyBooks);

      const id = result.insertedIds['0'];

      const { status, body } = await server().get(
        `/api/v1/books/${id}`);

        expect(status).toBe(200);
        expect(body.status_code).toBe(200);
        expect(body.status).toBe('success');
        expect(Object.keys(body)).toEqual(Object.keys(bodyResult)); 
        expect(Object.keys(body.data)).toEqual(Object.keys(dataArrar));
        expect(Object.keys(body)).toMatchSnapshot();
    });

    it('should return a validation error iF not valid objectID', async () => {

      const id = '123423444';

      const { status, body } = await server().get(
        `/api/v1/books/${id}`);

        expect(status).toBe(400);
        expect(body.status_code).toBe(400);
        expect(body.status).toBe('error');
        expect(Object.keys(body)).toEqual(Object.keys(bodyResult)); 
        expect(Object.keys(body)).toMatchSnapshot();
    });
  });

  describe('UPDATE', () => {
    it('should update a book', async () => {
      const result = await Book.create(dummyBooks[0]);

      const id = result._id;
      const name = 'the good, bad ugly';

      const {
        status,
        body
      } = await server().patch(
        `/api/v1/books/${id}`).send({
          name
        })

      expect(status).toBe(200);
      expect(body.status_code).toBe(200);
      expect(body.status).toBe('success');
      expect(body.data.result.name).toEqual(name);
      expect(Object.keys(body)).toEqual(Object.keys(bodyResult));
      expect(Object.keys(body)).toMatchSnapshot();
    });
  });

  describe('DELETE', () => {
    it('should delete a book', async () => {
      const result = await Book.create(dummyBooks[0]);

      const id = result._id;

      const {
        status,
        body
      } = await server().delete(
        `/api/v1/books/${id}`);
        
      expect(status).toBe(204);
    });
  });
});
