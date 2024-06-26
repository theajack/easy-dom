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
import {dom} from 'easy-dom-util';
let el = dom.div; // Returns an element of type Ele, encapsulating the method of dom operation
```

#### 0.2 script tag introduction

```html
<script src="https://cdn.jsdelivr.net/npm/easy-dom-util"></script>
<!-- or -->
<!-- <script src="https://cdn.jsdelivr.net/npm/easy-dom-util@x.x.x"></script> -->
<script>
     var el = EasyDom.dom.div;
</script>
```

### 1. Ele object

easy-dom encapsulates dom elements. Each dom element will be encapsulated into an Ele element.

Most of the methods on the Ele element support chain calls. The following methods are available for the Ele element:

The method list, detailed usage is below:

| Method | Parameters | Return value | Description |
| :--: | :--: | :--: | :--: |
| dom | -- | HTMLElement | Returns the corresponding native dom element |
| attr | json/name,value/-- | Ele/string/Ele | Set or get element attributes |
| data | json/name/null/--,value/null/-- | any | Temporarily store and operate some data on dom elements |
| hasAttr | string | boolean | Determine whether there is a certain attribute |
| rmAttr | string | Ele/string/Ele | Delete attribute |
| style | json/name,value | Ele/string/Ele | Set or get element style |
| text | [string] | string/Ele | Set or get element innerText |
| value | [string] | string/Ele | Set or get element value |
| html | [string] | string/Ele | Set or get the element innerHTML |
| empty | -- | Ele | Clear element content |
| class | [string] | string/Ele | Set the class for the element or get the class name of the element |
| id | [string] | string/Ele | Set id to element or get element's id |
| click | function | Ele | Set element click event |
| on | json/name,func | Ele | Set the event of the element |
| render | {html,method={},result=null} | Ele | render element |
| addClass | string | Ele | Add class to element |
| rmClass | string | Ele | Remove a class |
| hasClass | string | boolean | Determine whether there is a certain class |
| replaceClass | string,string | Ele | Replace class |
| append | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert child nodes into elements |
| insert | index, ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert child at specified position |
| prepend | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Head-insert child |
| before | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert sibling elements before the element |
| after | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert sibling elements after the element |
| remove | int/Ele/-- | Ele/-- | Remove child nodes based on position or ele element, or delete itself |
| parent | [index] | Ele/null | Get the parent element or nth-level parent element of the element |
| index | -- | number | Get the position of the element in the parent element |
| children | [index] | Ele/Array[Ele]/null | Get the first or all child elements |
| children | ...Array[dom/Ele] / Array[dom/Ele] | Ele | Insert child nodes into elements |
| next | [index] | Ele/null| Get the previous or nth element of the element |
| prev | [index] | Ele/null | Get the next or nth element after the element |
| exe | function(dom){} | Ele | Execute a method with Ele as this, and the callback parameter is the corresponding dom element |
| src | string | Ele | Set the src attribute of dom |
| query | selector | Array[Ele] | Query all children of an element based on css selector |


Full Api typings：

```ts
declare class Ele {
    el: HTMLElement;
    constructor({ tag, ele }: {
        tag?: TTag | string;
        ele?: HTMLElement;
    });
    dom(): HTMLElement;
    ref(el: Ele): this;
    class(): string;
    class(cls: string, withPrefix?: boolean): this;
    id(): string;
    id(id: string): this;
    attr(name: string): string;
    attr(name: IJson): this;
    attr(name: string, value: string | number | null): this;
    hasAttr(name: string): boolean;
    rmAttr(name: string): this;
    style(name: IStyle): this;
    style(name: IStyleKey[]): IStyle;
    style(name: IStyleKey): string;
    style<T extends IStyleKey>(name: T, value: IStyle[T]): this;
    text(): string;
    text(text: string | number): this;
    value(): string;
    value(val: string | number): this;
    html(): string;
    html(html: string | number): this;
    click(func: (this: HTMLElement, ev: HTMLElementEventMap['click'], el: Ele) => any, useCapture?: boolean): this;
    on<K extends keyof HTMLElementEventMap>(name: K, func: (this: HTMLElement, ev: HTMLElementEventMap['click'], el: Ele) => any, useCapture?: boolean): this;
    on(name: {
        [prop in keyof HTMLElementEventMap]?: (this: HTMLElement, ev: HTMLElementEventMap[prop], el: Ele) => any;
    }, func?: boolean): this;
    addClass(cls: string, withPrefix?: boolean): this;
    hasClass(cls: string, withPrefix?: boolean): boolean;
    rmClass(cls: string, withPrefix?: boolean): this;
    replaceClass(a: string, b: string, withPrefix?: boolean): this;
    toggleClass(name: string): this;
    append(...children: (Ele | Ele[] | null)[]): this;
    appendSingle(el: Ele | null): this;
    name(): string;
    name(name: string): this;
    insert(index: number | string, ...eles: (string | Ele | HTMLElement)[]): this;
    prepend(...eles: (string | Ele | HTMLElement)[]): this;
    before(...eles: (string | Ele | HTMLElement)[]): Ele;
    after(...eles: (string | Ele | HTMLElement)[]): Ele;
    remove(arg?: number | Ele): this;
    empty(): this;
    parent(index?: number): Ele;
    data(name: string): any;
    data(): IJson;
    data(name: IJson): this;
    data(name: string, value: any): this;
    index(): number;
    next(i?: number): Ele;
    prev(i?: number): Ele;
    children(): Ele[];
    children(i: number | string): Ele;
    children(...children: (Ele | Ele[] | null)[]): this;
    brother(): Ele[];
    brother(i: number): Ele;
    created(cb: (this: Ele, self: Ele) => void): this;
    mounted(fn: (this: Ele, self: Ele, parent: Ele) => void): this;
    sizeReady(fn: (this: Ele, self: Ele, size: ISize, parent: Ele) => void): this;
    src(): string;
    src(v: string): this;
    render(options?: {}): any;
    query(selector: string, one: true): Ele;
    query(selector: string, one?: false): Ele[];
    hide(): this;
    show(display?: string): this;
    setVisible(visible?: boolean, display?: string): this;
    mount(ele?: TEleCommon): this;
}
```

Some API usage examples:

Basic usage

```js
let el = dom.div
     .class('easy-dom')
     .text('easy-dom')
     .click(()=>{
         alert('click')
     })
```

emmet style

```js
let el = dom('div#app.cls1.cls2[attr1=1][attr2]')
```

render method

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
     // Using the es6-string-html plug-in in vscode will make the following html have syntax highlighting
     html:/*html*/`
         <div @el='div1' @event=alert('test')></div>
         <div @el='div2'></div>
     `
})
```

.data() Usage

```js
el.data(); // Get data object
el.data(null); // Clear the data object
el.data('name', 'test'); // Set a data
el.data('name'); // Get a data
el.data('name', null); // Remove a data
el.data({ // Batch operation
     name: null, // Remove a data
     age: 12 //Set a data
});
```

The Ele element has only one attribute, which is .el. Get the corresponding dom element.

### 2. api list

api list

| api | parameters | return value | description |
| :--: | :--: | :--: | :--: |
| create | string | Ele | Generate an Ele element based on tag |
| query | selector[,boolean] | Ele/NodeList/null | Query elements, the following bool parameter indicates whether to query all elements, otherwise only the first one |
| checkDom | string/selector/HTMLElement | HTMLElement/NodeList | Get dom elements |
| classPrefix | string[,function] | -- | Add a default prefix to the class name. If a callback function is used as a parameter, the prefix will be cleared after the callback is completed. Otherwise, please manually call clearClassPrefix to clear |
| clearClassPrefix | -- | -- | Clear class name prefix |
| addCommonStyle | object/name,value | -- | Add css variables and common styles |
| reportStyle | {function, id = 'el-style', usePool = false} | -- | Report css style |
| initStylePool | -- | -- | Initialize style pool |
| registTouchEvent | {el[dom/Ele/selector],touchStart,touchMove,touchEnd} | -- | Mobile touch event encapsulation, compatible with PC |
| windowSize | -- | {width:height} | Get browser size |
| version | properties | -- | easy-dom version information |


Detailed use

```js
import $, {dom} from 'easy-dom-util';
$.classPrefix('el-test-');
dom.div.class('1') // class = el-test-1
$.clearClassPrefix();
// or
$.classPrefix('el-test-',()=>{
     dom.div.class('1') // class = el-test-1
});
```

style related

```js
$.addCommonStyle({
     fontSize: '12px',
     textCenter: 'text-align:center;'
})

$.reportStyle({
     func:initStyle,
     id: 'MyStyle' // The id of the style tag
}); // Without using the style pool, the style will be added to the head immediately

// or

$.reportStyle({
     func:initStyle,
     id: 'MyStyle', // id of style tag
     usePool: true
}); // Use the style pool. The style will be added to the head after calling initStylePool. When there are many scattered styles, it is recommended to use the style pool.
$.initStylePool();

function initStyle(common){ // common is the public style
     // Using the es6-string-css plug-in in vscode will make the following css with syntax highlighting
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
registerTouchEvent

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
