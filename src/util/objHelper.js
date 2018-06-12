//判断2个Object对象是否相等
function CompareObj(objA, objB, flag) {
  for (var key in objA) {
    if (!flag)
      //跳出整个循环
      break;
    if (!objB.hasOwnProperty(key)) {
      flag = false;
      break;
    }
    if (!isArray(objA[key])) {
      //子级不是数组时,比较属性值
      if (objB[key] != objA[key]) {
        flag = false;
        break;
      }
    } else {
      if (!isArray(objB[key])) {
        flag = false;
        break;
      }
      var oA = objA[key],
        oB = objB[key];
      if (oA.length != oB.length) {
        flag = false;
        break;
      }
      for (var k in oA) {
        if (!flag)
          //这里跳出循环是为了不让递归继续
          break;
        flag = CompareObj(oA[k], oB[k], flag);
      }
    }
  }
  return flag;
}

export default {
  cloneObj(obj) {
    // 这一行会报错  暂时注掉
    //var str, newobj = obj.constructor === Array ? [] : {};
    var str, newobj;
    if (typeof obj !== 'object') {
      return;
    } else if (window.JSON) {
      (str = JSON.stringify(obj)), //系列化对象
        (newobj = JSON.parse(str)); //还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
      }
    }
    return newobj;
  },
  isObj(obj) {
    return (
      Object.prototype.toString.call(obj) === '[object Object]' ||
      Object.prototype.toString.call(obj) === '[object Array]'
    );
  },
  typeIsObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },
  typeIsArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  },
  isEmptyObject(e) {
    var t;
    for (t in e) return !1;
    return !0;
  },
  //判断2个JSON是否相等
  Compare(objA, objB) {
    if (!isObj(objA) || !isObj(objB)) return false; //判断类型是否正确
    if (getLength(objA) != getLength(objB)) return false; //判断长度是否一致
    return CompareObj(objA, objB, true); //默认为true
  }
};
