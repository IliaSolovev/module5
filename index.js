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

const deepEqual = (a,b) => {
  if (a === b) {
    return true;
  }

  if (a == null || typeof(a) != "object" ||
    b == null || typeof(b) != "object")
  {
    return false;
  }

  let propertiesInA = 0, propertiesInB = 0;
  for (let property in a) {
    propertiesInA += 1;
  }
  for (let property in b) {
    propertiesInB += 1;
    if (!(property in a) || !deepEqual(a[property], b[property])) {
      return false;
    }
  }
  return propertiesInA === propertiesInB;
};

module.exports = {
  memo,
  createHashName,
  deepEqual
};