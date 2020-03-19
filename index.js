const memo = (func) => {
  const hash = new Map();
  return (...arg) => {
    const hashName = createHashName(arg);
    if(hash.has(hashName)){
      return hash.get(hashName)
    }else{
      let res = func(...arg);
      hash.set(hashName,res);
      return res;
    }
  }
};

const createHashName = (array) => {
  return Array.from(array).join(',')
};

module.exports = {
  memo,
  createHashName
};