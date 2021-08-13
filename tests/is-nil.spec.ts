import { isNil } from '../src/utils/is-nil';

describe('IsNil', () => {
  it('undefined', () => {
    expect(isNil(undefined)).toEqual(true);
  });

  it('null', () => {
    expect(isNil(null)).toEqual(true);
  });

  it('empty string', () => {
    expect(isNil('')).toEqual(true);
  });
});
