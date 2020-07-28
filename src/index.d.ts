

export class Ele {
    constructor(parameters: {tag: string, ele: HTMLElement});
    el: HTMLElement;
    dom(): HTMLElement;
    attr(a:string|object, b?: string): Ele|string;
    hasAttr(a:string): boolean;
    rmAttr(a:string): Ele;
    style(a:string|object, b?: string): Ele|string;
    text(): string;
    text(text: string): Ele;
    value(value?: string): Ele|string;
    html(html?: string): Ele|string;
    cls(cls?: string): Ele|string;
    id(id?: string): Ele|string;
    click(func: (event: Event)=>{}, useCapture?: boolean): Ele;
    on(a:string|object, b?:Function, useCapture?: boolean): Ele;
    render(opt: {
        html:string, 
        method?: object, 
        result?: (this:{
            el: Ele,
            method: object
        }, opt: object) => {}
    }): Ele;
    addClass(cls: string, withPrefix?: boolean): Ele;
    rmClass(cls: string, withPrefix?: boolean): Ele;
    hasClass(cls: string, withPrefix?: boolean): boolean;
    replaceClass(ca: string, cb:string, withPrefix?: boolean): Ele;
    append(...args: Array<HTMLElement|Ele|Array<HTMLElement|Ele>>):  Ele;
    insert(index: number, ...args: Array<HTMLElement|Ele|Array<HTMLElement|Ele>>): Ele;
    prepend(...args: Array<HTMLElement|Ele|Array<HTMLElement|Ele>>): Ele;
    before(...args: Array<HTMLElement|Ele|Array<HTMLElement|Ele>>): Ele;
    after(...args: Array<HTMLElement|Ele|Array<HTMLElement|Ele>>): Ele;
    remove(child?: number|Ele): Ele;
    empty(): Ele;
    data(name?: string|object|null, value?: any): any;
    parent(index?: number): Ele|null;
    child(index?: number|string): Ele|Array<Ele>|null;
    brother(index?: number): Ele|Array<Ele>|null;
    index(): number;
    next(index?: number): Ele|null;
    prev(index?: number): Ele|null;
    created(this: Ele, callback: (el: Ele)=>{}): Ele;
    mounted(this: Ele, callback: (el: Ele, parent: Ele)=>{}): Ele;
    src(src: string): Ele;
    query(selector: string, one?: boolean): Ele|null|Array<Ele>;
    name(name?:string): Ele|string; 
    hide():Ele;
    show(display?: string):Ele;
}

declare interface PCBuildTouchEvent {
    clientX: number,
    clientY: number,
    force: number,
    identifier: number,
    pageX: number,
    pageY: number,
    radiusX: number,
    radiusY: number,
    rotationAngle: number,
    screenX: number,
    screenY: number,
    target: number,
}

export interface ToolStatic {
    create(tagName?: string): Ele;
    query(s: Ele|string|HTMLElement, all?:boolean): Ele|NodeList|null;
    checkDom(dom: Ele|string|HTMLElement): HTMLElement|NodeList;
    classPrefix(prefix: string,callback?:(clear:Function)=>{}): void;
    clearClassPrefix(): void;
    addCommonStyle(a: object,value?:string);
    reportStyle(opts:{func: (commonStyle: object)=>{}, id?: string, usePool?:boolean}):void;
    initStylePool(): void;
    registTouchEvent(opts:{
        el: Ele|string|HTMLElement,
        touchStart?: (event: TouchEvent|PCBuildTouchEvent)=>{},
        touchMove?: (event: TouchEvent|PCBuildTouchEvent)=>{},
        touchEnd?: (event: TouchEvent|PCBuildTouchEvent)=>{}
    }): void;
    windowSize(useInner?: boolean): {width: number, height: number};
    isMobile(): false | string;
    version: string;
}

declare const Tool: ToolStatic;

export default Tool;