# [easy-dom](https://github.com/theajack/easy-dom)

## Easy-Dom js library for convenient operation of dom

----

<p>
    <a href="https://ko-fi.com/theajack">
        <img src="https://img.shields.io/badge/Donate-Ko Fi-ff5f5f" alt="test">
    </a>    
    <a href="https://paypal.me/tackchen">
        <img src="https://img.shields.io/badge/Donate-PayPal-142c8e" alt="test">
    </a>    
    <a href="https://shiyix.cn/wx-pay.png">
        <img src="https://img.shields.io/badge/Donate-Wechat Pay-00c250" alt="test">
    </a>
</p>

[中文](https://github.com/theajack/easy-dom/blob/master/README.cn.md) | [Version Log](https://github.com/theajack/easy-dom/blob/master/scripts/version.md) | [Online Use](https://theajack.gitee.io/jsbox?theme=dark&lang=html&lib=https://cdn.jsdelivr.net/npm/easy-dom-util&code=DwZwxgTglgDgLgAhBMBeARACznGIBcA9IWACYB2AdAFYikCmANlAG4SXn1yHkwC2hegEMQATwC0pAPZ9xAVzhRGgkaOl9KfKFVroAfMELho8PQFgAUMFKsEUUqgDkQmDEcHCNluavHYcHwQghDApchApRnpKRikAcwAKAFFVABEZAEoAbktghBSxdI0ARzl6CFEExwBiFzcMygh6cgYIBIBvXLzgvi5MKVJ8Totu0YQhKIg4BLh6AA84DOGxlZCwiKiY+JnMKBBsrtXugHdtaWPKCfLp2YWDkaOEAF9D7qeAGle8ppA5RmmmEsvmNQuFItFYokmJQAEYKOBhe4rD7AoLYPiMfAIAAGqO6wDhODCCAAAkwMISEeR0KT6CxmnAMFcplUABJMWIIADqUggjFIjgy+gAwswwABrBAAWXohkpYUCY1xDyCTwylkMflMQA)


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
<script src="https://cdn.jsdelivr.net/npm/easy-dom-util"></script>
<!-- or -->
<!-- <script src="https://cdn.jsdelivr.net/npm/easy-dom-util@x.x.x"></script> -->
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

# tacl-ui


## A set of simple ui components for taost, confirm, loading, alert, drag

----

[Online use](https://theajack.gitee.io/jsbox?theme=dark&lang=html&lib=https://cdn.jsdelivr.net/npm/easy-dom-util,https://cdn.jsdelivr.net/npm/tacl-ui&code=DwZwxgTglgDgLgAhBMBeARACznGIBcA9IWACYB2AdAFYikCmANlAG4SXn1yHkwC2hOAEMwjALQBXKIJGMplPlCq10APmCFw0eKoCwAKGClWCKKVQByUhCEBzC6ut2AsvQ3GWewwCMJOAPbkCIGiUGAA1pYA+nD+QiBwABQAlA6x8XAavgHkXsDZsUEhzBHRYIEAZlAQfCkO5eRVNVl+hXkFgcHkoaUWUYxxxuS2daoDQkO2LTl5CQCejPReCCsIAMROtgDeBqt7CADuZnCY+AgAHAAMMAAeANy7+yuY9FC22GdXtw-6e94i4VsEH8EnIpDE5QGEDOa3OcJ+f38EAYEDENmMEgICAArJcAKQI1bGEAwRhCOZnCqLe6PFZCZi2chiKBweh8LFgejkVkQQkraiYuBQCpzCGBVncs6c7n0Xm0hAAXwMGnmi1mkFgcGWqwAKrIAKoASUom0SO1+TwQTDOpH8YAkfC5cEoti4AFFFo7uQAhOaG0iJKw2ezJAA08r28TM9DOcAgEno4YtT0CAGVowBhTBCYYxhCJITJBCoVQIc2W-YNED+RaUAYjQt8-ZK5OK5JNiqgsBCzoxOIJFLly160RGyjpAcWAASTAGFmS8pbe073R7QSiDSatWSQ6eI8YY831VqW1ZNzgZ2ns-8FlDCBObLzFjm14OFgVC9bS9WK+7UF74yTIOEa6gaxqAUoIxXowc53gATJciGfnsLYqhqOhAA)

[TOC]

### 0. Installation and use

#### 0.1 npm installation

```
npm i tacl-ui
```

use

```js
import {tool, toast, confirm, alert, loading, drag} from'tacl-ui';
// or
import TaclUI from'tacl-ui';
// TaclUI = {tool, toast, confirm, alert, loading, drag}

// do something ...
```

#### 0.2 script tag introduction

```html
<script src="https://cdn.jsdelivr.net/npm/tacl-ui"></script>
<!-- or -->
<!-- <script src="https://cdn.jsdelivr.net/npm/tacl-ui@x.x.x"></script> -->
<script>
    TaclUI.toast('Hello world!')
</script>
```

### 1. api

#### 1.1 tool

Expose the easy-dom tool


#### 1.2 toast

Pop up a toast

```js
// simple call
toast(text[, time, position]);
toast('a hint')

// json call
toast({
    text:'A prompt',
    // Other parameters
})

// new method All components in tacl are an instance by default, you can use the new method to create a new instance
const close = toast.new(...);
```

parameter list

```ts
declare interface ToasterOpts {
    text?: string;
    time?: number;
    position?:'top'|'middle'|'bottom';
    parent?: DomEle;
    onhide?(): void;
    onopen?(): void;
    contentHtml?: boolean;
    showClose?: boolean;
    customClass?: string;
    button?: {// add a small button
        text: string;
        onclick(): void;
    }
}
```

#### 1.2 confirm

A confirm confirmation box pops up

```js
// simple call
confirm('Whether to confirm')
confirm('whether to confirm','confirm box')

// json call
confirm({
    text:'Are you sure?',
    title:'Confirmation box',
    confirmText:'confirm',
    cancelText:'cancel',
    cancelBtn:false, // Do you need a cancel button
    theme:'default', //
}).then((result)=>{
    if (result) {
        
    } else {

    }
})

// new
confirm.new(...).then((result)=>{})
```

parameter list

```ts
declare interface ConfirmerOpts {
    text?:string;
    title?:string;
    confirmText?:string;
    cancelText?:string;
    cancelBtn?:boolean;
    closeBtn?:boolean;
    parent?: DomEle;
    theme?: confirmStyle;
    onhide?(): void;
    onopen?(): void;
    customEl?: DomEle;
    customClass?: string;
    contentHtml?: boolean; // default false
    custom?(box: Ele, $: ToolStatic): void;
    type?: confirmType; // default confirmType.confirm
    onGetCloseMethod?(fn: void): void; // Get the closed function when user new creates a new pop-up box
    clickConfirmClose?: boolean; // default true
    clickCancelClose?: boolean; // default true
    onconfirm?(): void;
    oncancel?(): void;
}
```

enumerate

```ts
declare type confirmResultType ='confirm' |'cancel' |'close';

declare type confirmType ='confirm' |'alert' |'pop';

declare type confirmStyle ='yellow2' |'yellow' |'default';
```

#### 1.3 alert

Pop up an alert

```js
// simple call
alert('success')
alert('success','success title')

// json call
alert({
    text:'Success',
    title:'Success Title',
    confirmText:'confirm',
    theme:'default', //
}).then(()=>{

})

// new
alert.new(...).then((result)=>{})
```

parameter list

Same as confirm

#### 1.4 pop

Pop up a pop-up box

```js
// simple call
pop('Are you sure?')
pop('Are you sure?','Confirmation box')

// json call
pop({
    text:'Are you sure?',
    title:'Confirmation box',
    confirmText:'confirm',
    cancelText:'cancel',
    cancelBtn:false, // Do you need a cancel button
    theme:'default', //
}).then((result)=>{
    if (result) {
        
    } else {

    }
})

// new
pop.new(...).then((result)=>{})
```

parameter list

Same as confirm

#### 1.5 loading

Pop up a loading

```js
// simple call
loading(text[,time]);
loading();
loading('Loading...');
loading('Loading...', 1000);

loading.close(); // Manually close

// json call
loading({
    text:'Success',
    time:1000
})

const close = loading.new(...);
```

parameter list

```ts
declare interface LoadingerOpts {
    text?:string;
    time?:number|null;
    parent?: DomEle;
    backgroundOpacity?: number;
    onopen?(): void;
    onhide?(): void;
}
```

#### 1.6 drag

Generate a draggable element, compatible with pc and mobile

```js
let el = drag({
    el,
    parent,
    enableDrag = true,
    onClick = df,
    onSideChange = df,
    zIndex = 100,
    aside = false,
    preventDefault = true,
    reinitPosition = false,
    margin = 3, // upper right lower left or just pass in a number
})
```

parameter list

| Parameter | Must | Type | Default Value | Description |
| :--: | :--: | :--: | :--: | :--: |
| el | Yes | dom/Ele/selector | - | Elements to be dragged |
| parent | No | dom/Ele/selector | - | Specify a parent element, so that the drag can only be carried out in the parent element, and the parent element needs to set the position style |
| enableDrag | No | boolean | true | Whether it can be dragged or not |
| onClick | No | function | function(){} | Click event |
| aside | no | boolean | false | whether to be adsorbed on both sides |
| onSideChange | No | function | function(isLeft){} | Only takes effect when aside=true, and triggers when the suction side changes |
| zIndex | No | number | 100 | z-index of the dragged element |
| preventDefault | No | boolean | true | Whether to prohibit the default event behavior |
| margin | No | number/Array[top,right/bottom/left] | 3 | Top, bottom, left, and right margins |
| reinitPosition | No | boolean | false | Whether to change the position of the drag according to the orientationchange and resize events, it needs to be turned on when the drag is full screen |
```ts
declare interface DragParameters {
    el: Ele|HTMLElement|string;
    parent?: Ele|HTMLElement|string;
    onClick?: (event: Event, endX: number, endY: number) => {};
    onSideChange?: (isLeft:boolean) => {};
    zIndex?: number;
    enableDrag?:boolean;
    delay?:number;
    aside?:boolean;
    preventDefault?:boolean;
    reinitPosition?:boolean;
    margin?:number|Array<number>;
    onDragStart?: (event: Event, x: number, y: number) => {};
    onDragMove?: (event: Event, x: number, y: number) => {};
    onDragEnd?: (event: Event, x: number, y: number) => {};
}

declare class Drag {
    constructor(parameters: DragParameters);
    setPosition(left: number, top: number): void;
    initPosition(): void;
    getParentSize(): {width: number, height: number};
    aside: boolean;
    sideLeft: boolean;
    enableDrag: boolean;
    preventDefault: boolean;
    left: number|string;
    top: number|string;
    margin: Array<number>;
}
```

Remarks: Regarding preventDefault, preventDefault=true can prohibit the dragging of the browser on the mobile terminal to cause the page to move, and there is a blank at the top
But this attribute will also prohibit the click event of the child element, which can be circumvented by the target attribute of the event in the onClick event
Both methods have their pros and cons

Attribute list

`preventDefault, enableDrag, aside`

The use is the same as the parameter list, and the properties can be dynamically modified after generation
