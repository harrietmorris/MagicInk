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
  it('Should create a story and save it to the DB', async () => {
    let response = await request(server)
      .post('/story')
      .send({
        'readingLevel': 'BR40L - 230L',
        'location': 'castle',
        'readingTime': 5,
        'themes': ['adventure'],
        'simpleLanguage': true,
        'words': [10, 500] })
    
    expect(response.status).toBe(200);
    const id = response.body.id;
    const title = response.body.title;
    expect(title.split(' ').length).toBeLessThanOrEqual(10);

    // check that the story is in the DB
    response = await request(server)
      .get(`/stories/${id}`);
    const story = response.body.storyString;
    const words = story.split(' ').length;
    const lines = story.split('\n');
    expect(lines[0].split(' ')[0]).toBe('##'); // First line should be a title
    expect(words).toBeGreaterThanOrEqual(10);
    expect(words).toBeLessThanOrEqual(500);
    expect(story).toContain('castle');
  }, 1000 * 60 * 1);

});