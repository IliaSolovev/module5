const createHashName = (data) => {
  if (data.length === 1 && typeof data[0] === "function") {
    return data[0];
  }

  switch (typeof data) {
    case "function":
      return data;
    case "object":
      return JSON.stringify(data);
    default:
      return data.toString();
  }
};

const memoize = (func) => {
  const map = new Map();
  const weakMap = new WeakMap();

  return (...arg) => {
    if (arg.length > 1) {
      if (weakMap.has(arg)) {
        console.log(arg)
        return weakMap.get(arg);
      } else {
        console.log(arg)
        const res = func(...arg);
        weakMap.set(arg, res);
        return res;
      }
    }else{
      if(typeof arg[0] === 'object' || typeof arg[0] === 'function'){
        if (weakMap.has(arg[0])) {
          return weakMap.get(arg[0]);
        } else {
          const res = func(arg[0]);
          weakMap.set(arg[0], res);
          return res;
        }
      }else{
        if (map.has(arg[0])) {
          return map.get(arg[0]);
        }
        const res = func(arg[0]);
        map.set(arg[0], res);
        return res;
      }
    }
  };
};

module.exports = {
  memoize,
};
