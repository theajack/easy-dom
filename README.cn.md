# [easy-dom](https://github.com/theajack/easy-dom)

## Easy-Dom 便捷操作dom的js库

----

[English](https://github.com/theajack/easy-dom#easy-dom) | [Version Log](https://github.com/theajack/easy-dom/blob/master/helper/version.md)

[TOC]

### 0. 安装使用

#### 0.1 npm 方式安装

```
npm i easy-dom-util
```

使用

```js
import $ from 'easy-dom-util';

let el = $.create('div'); // 返回一个 Ele 类型的元素，封装了dom操作的方法
...
```

#### 0.2 script 标签引入

```html
<script src="https://cdn.jsdelivr.net/npm/easy-dom-util/easydom.min.js"></script>
<!-- or -->
<!-- <script src="https://cdn.jsdelivr.net/npm/easy-dom-util@x.x.x/easydom.min.js"></script> -->
<script>
    var el = EasyDom.create('div');
</script>
```

### 1. Ele 对象

easy-dom 对 dom 元素进行了一层封装，每个dom元素会被封装成一个 Ele 元素

Ele 元素上面的方法大都支持链式调用，Ele元素有以下方法可供使用：

方法列表，详细使用在下面：

| 方法 | 参数 | 返回值 | 说明 |
| :--: | :--: | :--: | :--: |
| dom | -- | HTMLElement | 返回对应的原生dom元素 |
| attr | json/name,value/-- | Ele/string/Ele | 设置或获取元素属性 |
| data | json/name/null/--,value/null/-- | any | 对dom元素暂存和操作一些数据 |
| hasAttr | string | boolean | 判断是否有某属性 |
| rmAttr | string | Ele/string/Ele | 删除属性 |
| style | json/name,value | Ele/string/Ele | 设置或获取元素样式 |
| text | [string] | string/Ele | 设置或获取元素innerText |
| value | [string] | string/Ele | 设置或获取元素value |
| html | [string] | string/Ele | 设置或获取元素innerHTML |
| empty | -- | Ele | 清空元素内容 |
| cls | [string] | string/Ele | 给元素设置类或者获取元素的类名 |
| id | [string] | string/Ele | 给元素设置id或者获取元素的id |
| click | function | Ele | 设置元素 click 事件 |
| on | json/name,func | Ele | 设置元素的事件 |
| render | {html,method={},result=null} | Ele | 渲染元素 |
| addClass | string | Ele | 给元素添加类 |
| rmClass | string | Ele | 移除某个类 |
| hasClass | string | boolean | 判断是否有某个类 |
| replaceClass | string,string | Ele | 替换类 |
| append | ...Array[dom/Ele] / Array[dom/Ele] | Ele | 给元素插入孩子节点 |
| insert | index, ...Array[dom/Ele] / Array[dom/Ele] | Ele | 指定位置插入孩子 |
| prepend | ...Array[dom/Ele] / Array[dom/Ele] | Ele | 头部插入孩子 |
| before | ...Array[dom/Ele] / Array[dom/Ele] | Ele | 在元素前面插入同级元素 |
| after | ...Array[dom/Ele] / Array[dom/Ele] | Ele | 在元素后面插入同级元素 |
| remove | int/Ele/-- | Ele/-- | 根据位置或者ele元素删除孩子节点，或删除自身 |
| parent | [index] | Ele/null | 获取元素的父元素或第n级父元素 |
| index | -- | number | 获取元素在父元素中的位置 |
| child | [index] | Ele/Array[Ele]/null | 获取第几个或全部子元素 |
| next | [index] | Ele/null| 获取元素的前一个或前第n个元素 |
| prev | [index] | Ele/null | 获取元素的后一个或后第n个元素 |
| exe | function(dom){} | Ele | 以Ele为this执行一个方法，回调参数为对应的dom元素 |
| src | string | Ele | 设置dom的src属性 |
| query | selector | Array[Ele] | 根据css选择器查询元素的所有孩子 |

部分api使用实例：

基本使用

```js
let el = $.create('div')
    .cls('easy-dom')
    .text('easy-dom')
    .click(()=>{
        alert('click')
    })
```

emmet 风格

```js
let el = $.create('div#app.cls1.cls2[attr1=1][attr2]')
```

render方法

```js
el.render({
    method:{
        alert(text){
            // this : {el,bindEl,self,method}
            console.log(this);
            window.alert(text);
        }
    },
    result(el){
        console.log(el.div1,el.div2);
    },
    // 使用 vscode 中的 es6-string-html 插件会使 下面的html带有语法高亮
    html:/*html*/` 
        <div @el='div1' @event=alert('test')></div>
        <div @el='div2'></div>
    `
})
```

.data() 用法

```js
el.data(); // 获取 data 对象
el.data(null); // 清空 data 对象
el.data('name', 'test'); // 设置一个数据 
el.data('name');  // 获取一个数据
el.data('name', null);  // 移除一个数据 
el.data({ // 批量操作
    name: null, // 移除一个数据 
    age: 12 // 设置一个数据 
});
```

Ele 元素只有一个属性 就是 .el , 获取对应的dom 元素

### 2. api 列表

api 列表

| api | 参数 | 返回值 | 说明 |
| :--: | :--: | :--: | :--: |
| create | string | Ele | 根据tag生成一个Ele元素 |
| query | selector[,boolean] | Ele/NodeList/null | 查询元素，后面的bool参数表示是否查询全部元素，否则只查询第一个 |
| checkDom | string/selector/HTMLElement | HTMLElement/NodeList | 获取dom元素 |
| classPrefix | string[,function] | -- | 给类名添加一个默认前缀，如果带有回调函数作为参数，则在回调完成之后，前缀会被清除，否则请手动调用clearClassPrefix清除 |
| clearClassPrefix | -- | -- | 清除类名前缀 |
| addCommonStyle | object/name,value | -- | 添加css变量和公用样式 |
| reportStyle | {function, id = 'el-style', usePool = false} | -- | 上报css样式 |
| initStylePool | -- | -- | 初始化样式池 |
| registTouchEvent | {el[dom/Ele/selector],touchStart,touchMove,touchEnd} | -- | 移动端touch事件封装，兼容pc端 |
| windowSize | -- | {width:height} | 获取浏览器尺寸 |
| version | 属性 | -- | easy-dom版本信息 |


详细使用

```js
$.classPrefix('el-test-');
$.create('div').cls('1') // class = el-test-1
$.clearClassPrefix();
// 或者
$.classPrefix('el-test-',()=>{
    $.create('div').cls('1') // class = el-test-1
});
```

样式相关

```js
$.addCommonStyle({
    fontSize: '12px',
    textCenter: 'text-align:center;'
})

$.reportStyle({
    func:initStyle,
    id: 'MyStyle' // style 标签的id 
}); // 不使用样式池，样式会被马上加入到head中

// 或者

$.reportStyle({
    func:initStyle,
    id: 'MyStyle', // style 标签的id 
    usePool: true
}); // 使用样式池，样式会再调用 initStylePool 之后加入head中，当有很多分散的样式时，建议使用样式池
$.initStylePool();

function initStyle(common){ // common 为公用样式
    // 使用 vscode 中的 es6-string-css 插件会使 下面的css带有语法高亮
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
    el: 'dom/Ele/selector',
    touchStart(touchList){
    },
    touchMove(touchList){
    },
    touchEnd(touchList){
    },
});
```