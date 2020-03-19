const memo = (func) => {
  const hash = new Map();
  return (...arg) => {
    const hashName = createHashName(arg);
    if (hash.has(hashName)) {
      return hash.get(hashName)
    } else {
      let res = func(...arg);
      hash.set(hashName, res);
      return res;
    }
  }
};

const createHashName = (data) => {
  if(data.length === 1 && typeof data[0] === "function"){
    return data[0];
  }
  switch (typeof data) {
    case "function":
      return data;
    case "object":
      return JSON.stringify(data);
    default:
      return data.toString()
  }
};

module.exports = {
  memo,
  createHashName
};