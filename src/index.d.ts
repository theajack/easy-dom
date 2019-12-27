

export class Ele {
    constructor(parameters: {tag: string, ele: HTMLElement});
    el: HTMLElement;
    dom(): HTMLElement;
    attr(a:string|object, b?: string): Ele|string;
    style(a:string|object, b?: string): Ele|string;
    text(text?: string): Ele|string;
    html(html?: string): Ele|string;
    cls(cls?: string): Ele|string;
    id(id?: string): Ele|string;
    click(func: (event: Event)=>{}): Ele;
    on(a:string|object, b?:Function): Ele;
    render(opt: {
        html:string, 
        method?: object, 
        result?: (this:{
            el: Ele,
            method: object
        }, opt: object) => {}
    }): Ele;
    addClass(cls: string): Ele;
    rmClass(cls: string): Ele;
    hasClass(cls: string): boolean;
    replaceClass(ca: string, cb:string): Ele;
    append(...args: Array<HTMLElement|Ele>):  Ele;
    remove(child: number|Ele): Ele;
    parent(): Ele;
    child(index?: number): Ele|Array<Ele>;
    exe(callback: (el: HTMLElement)=>{}): Ele;
    src(src: string): Ele;
    query(selector: string): Array<Ele>;
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
    windowSize(): {width: number, height: number};
    version: string;
}

declare const Tool: ToolStatic;

export default Tool;