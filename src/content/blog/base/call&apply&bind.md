---
title: 'call(), apply()和bind()'
description: 'call(), apply()和bind()'
pubDate: '2024/07/17'
updatedDate: '2024/07/17'
# heroImage: '/meteor.png'
author: 'kart jim'
tags: ["call", "apply", "bind", "base"]
themeColor: "#edad81"
themeColorBg: "#edad8120"
reprinted: true
reprintedUrl: "https://juejin.cn/post/7390319475520913460"
---

> 在JavaScript中，`call()`, `apply()`, 和 `bind()` 是三个强大的函数方法，它们主要用于调整函数调用时`this`关键字的指向。虽然它们的目的相似，但在实际应用中各有其独特之处。本文将探讨这些方法的使用场景、区别以及它们的一些巧妙用法。

## call()

call() 方法接受一个参数列表，第一个参数用于指定函数执行时this的值，后续参数则按顺序传递给函数。

示例：
```js
var year = 2023;
function getDate(month, day) {
  return this.year + '-' + month + '-' + day;
}

let obj = {year: 2024};
getDate.call(obj, 7, 11); // 输出: "2024-7-11"
```

## apply() 方法

与`call()`相似，`apply()`也用于设置函数执行时`this`的值，但它的参数以数组形式传递。

示例：
```js
getDate.apply(obj, [7, 12]); // 输出: "2024-7-12"
```
### 适用场景：

当参数数量不确定或参数来自数组时，使用`apply()`更为方便。

### 巧妙用法：

结合内置函数如`Math.max()`或`Array.prototype.push()`，使用`apply()`可以处理动态参数列表。

## bind()
bind() 方法与call()和apply()不同，它不立即执行函数，而是返回一个新的函数，这个函数在调用时会将this绑定到指定的对象。

示例：
```js
var obj = {year: 2024};
var boundGetDate = getDate.bind(obj);
boundGetDate(7, 13); // 输出: "2024-7-13"
```

适用场景：

当你需要创建一个带有预设this值的可复用函数时，使用`bind()`。

`bind()`的限制：

`bind()`无法改变构造函数的`this`指向。当使用`new`操作符调用`bind()`返回的函数时，`this`将指向新创建的对象。但是这也让`bind`可以在动态传参时起到关键作用。

## call(), apply()和bind()手写的实现
我们可以手动实现这些方法的基本逻辑，以加深理解。

call()和apply()的手写实现：
```js
Function.prototype.myCall = function (context) {
   let obj = context || window
   obj.fn = this
   let args = []
   for (let i = 1, len = arguments.length; i < len; i++) {
       args.push(arguments[i])
   }
   const result = obj.fn(...args)
   return result
}

// test
function add(c, d) {
    return this.a + this.b + c + d;
}
const obj = { a: 1, b: 2 };
console.log(add.myCall(obj, 3, 4)); // 10  
console.log(add.myCall({ a: 3, b: 9 }, 3, 4)); // 19
console.log(add.myCall({ a: 3, b: 9 }, { xx: 1 }, 4)); // 12[object Object]4 


Function.prototype.myApply = function (object, arr) {
    let obj = object || window
    obj.fn = this
    let result
    if (!arr) {
        return obj.fn()
    }
    if (!(arr instanceof Array)) {
        throw new Error('params must be array')
    }
    result = obj.fn(...arr)
    delete obj.fn
    return result
}

// test
function add(c, d) {
    return this.a + this.b + c + d;
}
const obj = { a: 1, b: 2 };
console.log(add.myApply(obj)); // NaN
console.log(add.myApply(obj, [3, 4])); // 10 
console.log(add.myApply(obj, [1, 'abc', '2'])); // 4abc
```

bind()的手写实现：
```js
Function.prototype.myBind = function(context, ...args) {
  let fn = this;
  let bound = function(...args2) {
    return fn.apply(context, args.concat(args2));
  };
  return bound;
};
```

## 总结
1. `call()`、`apply()`和`bind()`，都可以用来改变`this`的指向。  
2. 它们三个的第一个参数都是`this`要指向的对象。  
3. 它们三个都能传参数，`call()`和`bind()`传的是参数列表，`apply()`传的是数组。  
4. `call()`和`apply()`是直接调用，`bind()`返回的是函数，可以在后面需要时再调用，所以也可以在调用的时候再传入参数。  

