const request=require("supertest");
const {app}=require("../index");
const { BookModel } = require("../model/book_model");

describe('Read Operation (GET)', () => {
    let createdBookId;
  
    beforeAll(async () => {
      // Create a sample book for testing
      const sampleBook = new BookModel({
        title: 'Sample Book',
        author: 'John Doe',
        isbn: '1234567890',
        description: 'A great book',
        published_date: '2023-10-17T12:30:00Z',
      });
      const savedBook = await sampleBook.save();
      createdBookId = savedBook._id;
    });
  
    afterAll(async () => {
      // Clean up by deleting the created book
      await BookModel.findByIdAndDelete(createdBookId);
    });
  
    it('should retrieve a book by ID', async () => {
      const response = await request(app).get(`/book/retrieve/${createdBookId}`);
  
      expect(response.status).toBe(200);
      expect(response.body.msg._id).toEqual(createdBookId.toString());
    });
  
    it('should retrieve a book by title', async () => {
      const response = await request(app).get('/book/retrieve').query({ title: 'Sample Book' });
  
      expect(response.status).toBe(200);
      expect(response.body.msg.length).toBeGreaterThan(0);
      expect(response.body.msg[0].title).toBe('Sample Book');
    });
  
    it('should retrieve a book by author', async () => {
      const response = await request(app).get('/book/retrieve').query({ author: 'John Doe' });
  
      expect(response.status).toBe(200);
      expect(response.body.msg.length).toBeGreaterThan(0);
      expect(response.body.msg[0].author).toBe('John Doe');
    });
  
    it('should retrieve all books', async () => {
      const response = await request(app).get('/book/retrieve');
  
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.msg)).toBe(true);
      expect(response.body.msg.length).toBeGreaterThan(0);
    });
  });