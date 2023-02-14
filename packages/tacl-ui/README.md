# [easy-dom](https://github.com/theajack/easy-dom)

## Easy-Dom js library for convenient operation of dom

----

[中文](https://github.com/theajack/easy-dom/blob/master/README.cn.md) | [Version Log](https://github.com/theajack/easy-dom/blob/master/helper/version.md) | [Online Use](https://theajack.gitee.io/jsbox?theme=dark&lang=html&lib=https://cdn.jsdelivr.net/npm/easy-dom-util/easydom.min.js&code=DwZwxgTglgDgLgAhBMBeARACznGIBcA9IWACYB2AdAFYikCmANlAG4SXn1yHkwC2hegEMQATwC0pAPZ9xAVzhRGgkaOl9KfKFVroAfMELho8PQFgAUMFKsEUUqgDkQmDEcHCNluavHYcHwQghDApchApRnpKRikAcwAKAFFVABEZAEoAbktghBSxdI0ARzl6CFEExwBiFzcMygh6cgYIBIBvXLzgvi5MKVJ8Totu0YQhKIg4BLh6AA84DOGxlZCwiKiY+JnMKBBsrtXugHdtaWPKCfLp2YWDkaOEAF9D7qeAGle8ppA5RmmmEsvmNQuFItFYokmJQAEYKOBhe4rD7AoLYPiMfAIAAGqO6wDhODCCAAAkwMISEeR0KT6CxmnAMFcplUABJMWIIADqUggjFIjgy+gAwswwABrBAAWXohkpYUCY1xDyCTwylkMflMQA)


[TOC]

### 0. Installation and use

#### 0.1 npm installation

```
npm i easy-dom-util
```

use

```js
import $ from'easy-dom-util';

let el = $.create('div'); // returns an element of type Ele, which encapsulates the method of dom operation
...
```

#### 0.2 script tag introduction

```html
<script src="https://cdn.jsdelivr.net/npm/easy-dom-util/easydom.min.js"></script>
<!-- or -->
<!-- <script src="https://cdn.jsdelivr.net/npm/easy-dom-util@x.x.x/easydom.min.js"></script> -->
<script>
    var el = EasyDom.create('div');
</script>
```

### 1. Ele object

easy-dom encapsulates the dom element, and each dom element will be encapsulated into an Ele element

Most of the methods on the Ele element support chained calls. The Ele element has the following methods for use:

A list of methods, used in detail below:

| Method | Parameters | Return Value | Description |
| :--: | :--: | :--: | :--: |
| dom | - | HTMLElement | Return the corresponding native dom element |
| attr | json/name,value/-- | Ele/string/Ele | Set or get element attributes |
| data | json/name/null/--,value/null/-- | any | Temporarily store and manipulate some data on dom elements |
| hasAttr | string | boolean | Determine whether there is an attribute |
| rmAttr | string | Ele/string/Ele | Delete attribute |
| style | json/name,value | Ele/string/Ele | Set or get element style |
| text | [string] | string/Ele | Set or get element innerText |
| value | [string] | string/Ele | Set or get element value |
| html | [string] | string/Ele | Set or get element innerHTML |
| empty | - | Ele | Empty element content |
| cls | [string],[withPrefix=boolean] | string/Ele | Set the class of the element or get the class name of the element |
| id | [string] | string/Ele | Set the id of the element or get the id of the element |
| click | function | Ele | Set element click event |
| on | json/name,func | Ele | Set the event of the element |
| render | {html,method={},result=null} | Ele | Render element |
| addClass | string | Ele | Add class to element |
| rmClass | string | Ele | Remove a class |
| hasClass | string | boolean | Determine whether there is a class |
| replaceClass | string,string | Ele | Replacement class |
| append | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert child node to element |
| appendSingle | dom/Ele | Ele | Insert child node to element |
| insert | index, ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert child at specified position |
| prepend | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Head Insert Child |
| before | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert sibling elements in front of elements |
| after | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert an element of the same level after the element |
| remove | int/Ele/-- | Ele/-- | Delete child nodes according to position or ele element, or delete itself |
| parent | [index] | Ele/null | Get the parent element or the nth level parent element of an element |
| index | - | number | Get the position of the element in the parent element |
| child | [index] | Ele/Array[Ele]/null | Get how many or all child elements |
| next | [index] | Ele/null| Get the previous or previous nth element of an element |
| prev | [index] | Ele/null | Get the next or last nth element of an element |
| exe | function(dom){} | Ele | Use Ele as this to execute a method, and the callback parameter is the corresponding dom element |
| src | string | Ele | Set the src attribute of dom |
| query | selector | Array[Ele] | Query all children of an element based on the css selector |
| name | string | Ele | Add name to element or query element based on name |
| hide | - | Ele | hide elements |
| show | [display] | Ele | Display element |
| setVisible | [visible],[display] | Ele | Display element |

Some api usage examples:

Basic use

```js
let el = $.create('div')
    .cls('easy-dom')
    .text('easy-dom')
    .click(()=>{
        alert('click')
    })
```

emmet style

```js
let el = $.create('div#app.cls1.cls2[attr1=1][attr2]')
```

render method

```js
el.render({
    method:{
        alert(text){
            // this: {el,bindEl,self,method}
            console.log(this);
            window.alert(text);
        }
    },
    result(el){
        console.log(el.div1,el.div2);
    },
    // Using the es6-string-html plugin in vscode will make the following html with syntax highlighting
    html:/*html*/`
        <div @el='div1' @event=alert('test')></div>
        <div @el='div2'></div>
    `
})
```

.data() usage

```js
el.data(); // Get data object
el.data(null); // Clear the data object
el.data('name','test'); // set a data
el.data('name'); // Get a data
el.data('name', null); // remove a data
el.data({ // batch operation
    name: null, // remove a data
    age: 12 // set a data
});
```

The only attribute of the Ele element is .el, get the corresponding dom element

### 2. api list

api list

| api | Parameters | Return value | Description |
| :--: | :--: | :--: | :--: |
| create | string | Ele | Generate an Ele element based on tag |
| query | selector[,boolean] | Ele/NodeList/null | Query element, the bool parameter behind indicates whether to query all elements, otherwise only the first one is queried |
| checkDom | string/selector/HTMLElement | HTMLElement/NodeList | Get dom element |
| classPrefix | string[,function] | - | Add a default prefix to the class name. If a callback function is used as a parameter, the prefix will be cleared after the callback is completed, otherwise please manually call clearClassPrefix to clear |
| clearClassPrefix | - | - | Clear class name prefix |
| addCommonStyle | object/name,value | - | Add css variables and common styles |
| reportStyle | {function, id ='el-style', usePool = false} | - | Report css style |
| initStylePool | - | - | Initialize style pool |
| registTouchEvent | {el[dom/Ele/selector],touchStart,touchMove,touchEnd} | - | Touch event package on mobile terminal, compatible with pc terminal |
| windowSize | - | {width:height} | Get browser size |
| version | Attributes | - | easy-dom version information |


Detailed use

```js
$.classPrefix('el-test-');
$.create('div').cls('1') // class = el-test-1
$.clearClassPrefix();
// or
$.classPrefix('el-test-',()=>{
    $.create('div').cls('1') // class = el-test-1
});
```

Style related

```js
$.addCommonStyle({
    fontSize: '12px',
    textCenter:'text-align:center;'
})

$.reportStyle({
    func:initStyle,
    id:'MyStyle' // id of style tag
}); // Do not use the style pool, the style will be added to the head immediately

// or
$.reportStyle({
     func:initStyle,
     id:'MyStyle', // id of style tag
     usePool: true
}); // Use the style pool, the style will be added to the head after calling initStylePool. When there are many scattered styles, it is recommended to use the style pool
$.initStylePool();

function initStyle(common){ // common is a common style
     // Using the es6-string-css plugin in vscode will make the following css syntax highlighting
     return /*css*/`
         .el-test-1{
             color:#f44;
             font-size:${common.fontSize};
         }
         .el-test-text{
             ${common.textCenter}
             color:#222;
         }
     `
}
```
registTouchEvent

```js
$.registTouchEvent({
     el:'dom/Ele/selector',
     touchStart(touchList){
     },
     touchMove(touchList){
     },
     touchEnd(touchList){
     },
});
```
