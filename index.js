const memo = (func) => {
  const hash = new Map();
  return (a) => {
    if(hash.has(a)){
      return hash.get(a)
    }else{
      let res = func(a);
      hash.set(a,res);
      return res;
    }
  }
};

module.exports = {
  memo
};