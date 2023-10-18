const request=require("supertest");
const {app}=require("../index");

describe('Create Operation', () => {
    it('should create a new book', async() => {
        const response = await request(app)
        .post('/book/create')
        .send({
          title: 'Sample Book',
          author: 'John Doe',
          isbn: '1234567890',
          description: 'A great book',
          published_date: '2023-10-17T12:30:00Z',
        });
        
        expect(response.status).toBe(201); // Assert the response status code
        expect(response.body.msg).toBe('Book is created');
      
    });
  });
