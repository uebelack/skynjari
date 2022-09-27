import LocaleService from './locale.service';

describe('LocaleService', () => {
  it('should return best matching locale', () => {
    expect(LocaleService.locale()).toEqual('en-US');
  });
});
