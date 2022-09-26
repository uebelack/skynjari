import AppModule from './app.module';

describe('AppModule', () => {
  it('should initialize', () => {
    expect(() => new AppModule()).not.toThrow();
  });
});
