const request = require('supertest');
const app = require('../index');


beforeAll(async () => {
  console.log('beforeAll');
});

afterAll(async () => {
  console.log('afterAll');
  
});

describe('Story endpoint', () => {
  it('Should return a story', async () => {
    console.log('test');
    
  });

});