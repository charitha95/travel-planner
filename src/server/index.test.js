const {getApiMeta} = require('./index');
test('test api values', () => {
    
    expect(getApiMeta().pixabay.baseUrl).toBe('https://pixabay.com/api');
  })