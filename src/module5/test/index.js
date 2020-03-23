const { describe } = require("mocha");
const { assert } = require("chai");
const { memo } = require("../index");
const { deepEqual } = require("../index");
const { createHashName } = require("../index");

describe("test memo", () => {
  describe("none ref type", () => {
    it("a function with 1 equal arg should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a ** 2;
      };
      const memoFunc = memo(func);
      memoFunc(2);
      memoFunc(2);
      assert.equal(count, 1);
    });

    it("a function with 1 unequal arg should called twice", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a ** 2;
      };
      const memoFunc = memo(func);
      memoFunc(2);
      memoFunc(3);
      assert.equal(count, 2);
    });

    it("a function with 2 equal args should called once", () => {
      let count = 0;
      const func = (a, b) => {
        count++;
        return a ** b;
      };
      const memoFunc = memo(func);
      memoFunc(2, 2);
      memoFunc(2, 2);
      assert.equal(count, 1);
    });

    it("a function called twice with first equal arg and second unequal", () => {
      let count = 0;
      const func = (a, b) => {
        count++;
        return a ** b;
      };
      const memoFunc = memo(func);
      memoFunc(2, 2);
      memoFunc(2, 3);
      assert.equal(count, 2);
    });

    it("a function with 4 equal arg should called once", () => {
      let count = 0;
      const func = (a, b, c, d) => {
        count++;
        return a + b + c + d;
      };
      const memoFunc = memo(func);

      memoFunc(1, 2, 3, 4);
      memoFunc(1, 2, 3, 4);

      assert.equal(count, 1);
    });

    it("a function with 4 unequal arg should called twice", () => {
      let count = 0;
      const func = (a, b, c, d) => {
        count++;
        return a + b + c + d;
      };
      const memoFunc = memo(func);

      memoFunc(7, 2, 3, 4);
      memoFunc(1, 3, 3, 4);

      assert.equal(count, 2);
    });
  });

  describe("ref type", () => {
    it("a function with 1 object arg should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a;
      };
      const memoFunc = memo(func);

      memoFunc({ state: 1 });
      memoFunc({ state: 1 });

      assert.equal(count, 1);
    });

    it("a function with 1 object different arg should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a;
      };
      const memoFunc = memo(func);

      memoFunc({ state: 1 });
      memoFunc({ state: 2 });

      assert.equal(count, 2);
    });

    it("a function with 1 func equal arg should called once", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a();
      };
      const memoFunc = memo(func);

      function test() {}

      memoFunc(test);
      memoFunc(test);

      assert.equal(count, 1);
    });

    it("a function with 1 func unequal arg should called twice", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a();
      };
      const memoFunc = memo(func);

      function test1() {}

      function test2() {}

      memoFunc(test1);
      memoFunc(test2);

      assert.equal(count, 2);
    });

    it("a function with 2 unequal complex object", () => {
      let count = 0;
      const func = (a) => {
        count++;
        return a;
      };
      const memoFunc = memo(func);

      memoFunc({
        text: "asd",
        obj1: {
          text2: "gsd",
        },
      });
      memoFunc({
        text: "asd",
        obj1: {
          text2: "gsd",
        },
      });

      assert.equal(count, 1);
    });
  });
});

describe("create hash name", () => {
  it("hash of one arguments", () => {
    const hashName = createHashName("a");
    assert.equal(hashName, "a");
  });

  it("hash of two arguments", () => {
    const hashName = createHashName([ "a", "b" ]);

    assert.equal(hashName, "[a,b]");
  });

  it("hash of three arguments", () => {
    const hashName = createHashName([ "a", "b", "c" ]);
    assert.equal(hashName, "[a,b,c]");
  });
});

describe("is equal objects", () => {
  it("simple equal objects", () => {
    const bool = deepEqual({ text: "text" }, { text: "text" });
    assert.equal(bool, true);
  });

  it("simple unequal objects", () => {
    const bool = deepEqual({ text: "text" }, { text: "text1" });
    assert.equal(bool, false);
  });

  it("object with unequal methods", () => {
    const func1 = () => {};
    const func2 = () => {};
    const bool = deepEqual({ text: "text", func: func1 }, { text: "text1", func: func2 });
    assert.equal(bool, false);
  });
});
