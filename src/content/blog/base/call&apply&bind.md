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

