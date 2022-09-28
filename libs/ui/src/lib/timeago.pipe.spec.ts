import TimeagoPipe from './timeago.pipe';

describe('TimeagoPipe', () => {
  it('should format date as timeago', () => {
    const pipe = new TimeagoPipe();
    expect(pipe.transform(new Date())).toEqual('just now');
  });
});
