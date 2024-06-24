const request = require('supertest');
const { app } = require('../index');

let server: any;


beforeAll(async () => {
  server = app.listen(8888) 
});

afterAll(async () => {
  server.close()
});

describe('Story endpoint', () => {
  it('Should return a story', async () => {
    const response = await request(server)
      .post('/story')
      .send({
        'age': 10,
        'location': 'castle',
        'readingTime': 10,
        'themes': ['funny'],
        'simpleLanguage': true,
        'words': [10, 500] })
    
    expect(response.status).toBe(200);
    const story = response.text;
    const words = story.split(' ').length;
    // TODO: test that the first line of the story is a title
    expect(words).toBeGreaterThanOrEqual(10);
    expect(words).toBeLessThanOrEqual(500);
    expect(story).toContain('castle');
  }, 1000 * 60 * 1);

});