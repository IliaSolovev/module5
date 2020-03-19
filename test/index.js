const expect = require("chai").expect;
const memo = require('../index').memo;
const createHashName = require('../index').createHashName;

describe('test memo', () => {

  it('a function with 1 equal arg should called once', () => {
    let count = 0;
    const func = (a) => {
      count++;
      return a ** 2
    };
    const memoFunc = memo(func);
    memoFunc(2);
    memoFunc(2);
    expect(count).to.equal(1)
  });

  it('a function with 1 unequal arg should called twice', () => {
    let count = 0;
    const func = (a) => {
      count++;
      return a ** 2
    };
    const memoFunc = memo(func);
    memoFunc(2);
    memoFunc(3);
    expect(count).to.equal(2)
  });

  it('a function with 2 equal args should called once', () => {
    let count = 0;
    const func = (a, b) => {
      count++;
      return a ** b
    };
    const memoFunc = memo(func);
    memoFunc(2, 2);
    memoFunc(2, 2);
    expect(count).to.equal(1)
  });

  it('a function called twice with first equal arg and second unequal', () => {
    let count = 0;
    const func = (a, b) => {
      count++;
      return a ** b
    };
    const memoFunc = memo(func);
    memoFunc(2, 2);
    memoFunc(2, 3);
    expect(count).to.equal(2)
  });

  it('a function with 4 equal arg should called once', () => {
    let count = 0;
    const func = (a, b, c, d) => {
      count++;
      return a + b + c + d
    };
    const memoFunc = memo(func);

    memoFunc(1, 2, 3, 4);
    memoFunc(1, 2, 3, 4);

    expect(count).to.equal(1)
  });

  it('a function with 4 unequal arg should called twice', () => {
    let count = 0;
    const func = (a, b, c, d) => {
      count++;
      return a + b + c + d
    };
    const memoFunc = memo(func);

    memoFunc(7, 2, 3, 4);
    memoFunc(1, 3, 3, 4);

    expect(count).to.equal(2)
  })

});

describe('create hash name', () => {
  it('hash of one arguments', () => {
    const hashName = createHashName(['a']);
    expect(hashName).to.equal('a')
  });

  it('hash of two arguments', () => {
    const hashName = createHashName(['a','b']);
    expect(hashName).to.equal('a,b')
  })
  it('hash of three arguments', () => {
    const hashName = createHashName(['a','b','c']);
    expect(hashName).to.equal('a,b,c')
  })
});
