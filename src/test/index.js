const { describe } = require("mocha");
const { assert } = require("chai");

const { memoize } = require("../index");

describe("test memoize", () => {
  describe("none ref type", () => {
    it("a function  should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a ** 2;
      };
      const memoizeFunc = memoize(func);
      memoizeFunc(2);
      memoizeFunc(2);
      assert.equal(count, 1);
    });

    it("a function should called twice", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a ** 2;
      };
      const memoizeFunc = memoize(func);
      memoizeFunc(2);
      memoizeFunc(3);
      assert.equal(count, 2);
    });

    it("a function should called once", () => {
      let count = 0;
      const func = (a, b) => {
        count++;
        return a ** b;
      };
      const memoizeFunc = memoize(func);
      memoizeFunc(2, 2);
      memoizeFunc(2, 2);
      assert.equal(count, 1);
    });

    it("a function should called twice", () => {
      let count = 0;
      const func = (a, b) => {
        count++;
        return a ** b;
      };
      const memoizeFunc = memoize(func);
      memoizeFunc(2, 2);
      memoizeFunc(2, 3);
      assert.equal(count, 2);
    });

    it("a function  should called once", () => {
      let count = 0;
      const func = (a, b, c, d) => {
        count++;
        return a + b + c + d;
      };
      const memoizeFunc = memoize(func);

      memoizeFunc(1, 2, 3, 4);
      memoizeFunc(1, 2, 3, 4);

      assert.equal(count, 1);
    });

    it("a function should called twice", () => {
      let count = 0;
      const func = (a, b, c, d) => {
        count++;
        return a + b + c + d;
      };
      const memoizeFunc = memoize(func);

      memoizeFunc(7, 2, 3, 4);
      memoizeFunc(1, 3, 3, 4);

      assert.equal(count, 2);
    });
  });

  describe("ref type", () => {
    it("a function  should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a;
      };
      const memoizeFunc = memoize(func);

      memoizeFunc({ state: 1 });
      memoizeFunc({ state: 1 });

      assert.equal(count, 1);
    });

    it("a function should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a;
      };
      const memoizeFunc = memoize(func);

      memoizeFunc({ state: 1 });
      memoizeFunc({ state: 2 });

      assert.equal(count, 2);
    });

    it("a function  should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a();
      };
      const memoizeFunc = memoize(func);

      function test() {}

      memoizeFunc(test);
      memoizeFunc(test);

      assert.equal(count, 1);
    });

    it("a function should called twice", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a();
      };
      const memoizeFunc = memoize(func);

      function test1() {}

      function test2() {}

      memoizeFunc(test1);
      memoizeFunc(test2);

      assert.equal(count, 2);
    });

    it("a function should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a;
      };
      const memoizeFunc = memoize(func);

      memoizeFunc({
        text: "asd",
        obj1: {
          text2: "gsd",
        },
      });
      memoizeFunc({
        text: "asd",
        obj1: {
          text2: "gsd",
        },
      });

      assert.equal(count, 1);
    });
  });
});
