Function.prototype.after = function (afterfn) {
  const _self = this;

  return function () {
    const ret = _self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  };
};


// 深拷贝对象
const extend = (...args) => {
  const type = (v) => Object.prototype.toString.call(v);
  const isPlainObject = (obj) => !!obj && type(obj) === '[object Object]';
  let name,
    src,
    copy,
    clone,
    target = args[0] || {},
    i = 1,
    deep = false;
  const length = args.length;

  if (typeof target === 'boolean') {
    deep = target;
    target = args[1] || {};
    i++;
  }

  // 控制当target不是object或者function的情况
  if (typeof target !== 'object' && !type(target) === '[object Function]') {
    target = {};
  }

  // 当参数列表长度等于i的时候，扩展jQuery对象自身。
  if (length === i) {
    target = this; --i;
  }

  for (; i < length; i++) {
    const options = args[i];
    if (options != null) {
      // 扩展基础对象
      for (name in options) {
        src = target[name];
        copy = options[name];

        // 防止永无止境的循环，这里举个例子，如var i = {};i.a = i;$.extend(true,{},i);如果没有这个判断变成死循环了
        if (target === copy) {
          continue;
        }
        let copyIsArray = Array.isArray(copy);
        if (deep && copy && (isPlainObject(copy) || copyIsArray)) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : []; // 如果src存在且是数组的话就让clone副本等于src否则等于空数组。
          } else {
            clone = src && isPlainObject(src) ? src : {}; // 如果src存在且是对象的话就让clone副本等于src否则等于空数组。
          }
          // 递归拷贝
          target[name] = extend(deep, clone, copy);
        } else if (deep && typeof src === 'function' && copy && typeof copy === 'function') {
          target[name] = src.after(copy);
        } else if (copy !== undefined) {
          target[name] = copy; // 若原对象存在name属性，则直接覆盖掉；若不存在，则创建新的属性。
        }
      }
    }
  }

  // 返回修改的对象
  return target;
};

export default extend;
