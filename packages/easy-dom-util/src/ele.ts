import { checkPrefix, getClassPrefix } from './class-prefix';
import parseTag from './parseTag';
import { render } from './render';

import { IJson, TTag } from './type';

export class Ele {

    el: HTMLElement;

    constructor ({ tag, ele }: {tag?: TTag | string, ele?: HTMLElement}) {
        if (ele) {
            this.el = ele;
        } else {
            const res = parseTag(tag as string);
            this.el = document.createElement(res.tag);
            if (res.cls) {this.cls(res.cls);}
            if (res.attr) {this.attr(res.attr);}
            if (res.id) {this.id(res.id);}
        }
    }
    dom () {
        return this.el;
    }

    cls (): string;
    cls (cls: string, withPrefix?: boolean): this;
    cls (cls?: string, withPrefix = true) {
        if (typeof cls === 'undefined') {
            return this.el.className;
        }
        if (withPrefix && getClassPrefix() !== '') {
            this.el.className = cls.split(' ').map(item => checkPrefix(item))
                .join(' ');
        } else {
            this.el.className = cls;
        }
        return this;
    }

    id (): string;
    id (id: string): this;
    id (id?: string) {
        if (typeof id === 'undefined') {
            return this.attr('id');
        }
        return this.attr('id', id);
    }

    attr (name: string): string;
    attr (name: IJson): this;
    attr (name: string, value: string|number|null): this;
    attr (name: string|IJson, value?: string | number| null): string|IJson|this {
        if (typeof name === 'object') {
            for (const k in name) {
                this.el.setAttribute(k, name[k]);
            }
            return this;
        }
        if (typeof value === 'undefined') {
            return this.el.getAttribute(name) || '';
        }
        if (value === null) {
            this.el.removeAttribute(name);
        } else {
            this.el.setAttribute(name, value + '');
        }
        return this;
    }

    hasAttr (name: string) {
        return this.el.hasAttribute(name);
    }

    rmAttr (name: string) {
        this.el.removeAttribute(name);
        return this;
    }

    style (name: string[]): IJson;
    style (name: string): string;
    style (name: IJson): this;
    style (name: string, value: string): this;
    style (name: string[]|IJson|string, value?: string) {
        if (typeof value === 'undefined') {
            if (name instanceof Array) { // 根据数组批量获取样式
                const style: IJson = {};
                name.forEach((item) => {
                    style[item] = this.style(item);
                });
                return style;
            } if (typeof name === 'object') { // 根据json设置样式
                for (const key in name) {
                    this.style(key, name[key]);
                }
                return this;
            }
            return getComputedStyle(this.el)[name as any]; // 返回查询到的样式
        }  // 根据name value 设置样式

        if (value.indexOf('!important') !== -1) {
            this.el.style.setProperty(name as string, checkCssValue(this.el, name as string, value.substring(0, value.indexOf('!important'))), 'important');
        } else {
            this.el.style.setProperty(name as string, checkCssValue(this.el, name as string, value));
        }
        return this;
    }

    text (): string;
    text (text: string|number): this;
    text (text?: string|number): string | this {
        if (typeof text === 'undefined') {
            return this.el.innerText;
        }
        this.el.innerText = text + '';
        return this;
    }

    value (): string;
    value (val: string|number): this;
    value (val?: string|number): string | this {
        if (typeof val === 'undefined') {
            // @ts-ignore
            return this.el.value;
        }
        // @ts-ignore
        this.el.value = val;
        return this;
    }

    html (): string;
    html (html: string|number): this;
    html (html?: string|number): string | this {
        if (typeof html === 'undefined') {
            return this.el.innerHTML;
        }
        this.el.innerHTML = html + '';
        return this;
    }

    click (
        func: (this: HTMLElement, ev: HTMLElementEventMap['click'], el: Ele) => any,
        useCapture?: boolean
    ) {
        return this.on('click', func, useCapture);
    }

    on<K extends keyof HTMLElementEventMap> (
        name: K,
        func: (this: HTMLElement, ev: HTMLElementEventMap['click'], el: Ele) => any,
        useCapture?: boolean
    ): this;
    on (
        name: {[prop in keyof HTMLElementEventMap]?: (this: HTMLElement, ev: HTMLElementEventMap[prop], el: Ele) => any},
        func?: boolean
    ): this;
    on<K extends keyof HTMLElementEventMap> (
        name: K | {[prop in keyof HTMLElementEventMap]?: (this: HTMLElement, ev: HTMLElementEventMap[prop], el: Ele) => any},
        func?: Function | boolean,
        useCapture = false
    ): this {
        if (typeof name === 'object') {
            for (const k in name) {
                // @ts-ignore
                this.on(k, name[k], func);
            }
            return this;
        }
        if (typeof func !== 'function') {
            throw new Error('事件类型应该为 function');
        }
        // @ts-ignore
        this.el.addEventListener(name, (e: any) => {
            func.call(this, e, this);
        }, useCapture);
        return this;
    }

    addClass (cls: string, withPrefix = true) {
        cls = checkPrefix(cls, withPrefix);
        if (!this.hasClass(cls)) {
            if (this.el.className === '') {
                this.el.className = cls;
            } else {
                this.el.className += ` ${cls}`;
            }
        }
        return this;
    }

    hasClass (cls: string, withPrefix = true) {
        cls = checkPrefix(cls, withPrefix);
        return getRegExp(cls).test(this.el.className);
    }

    rmClass (cls: string, withPrefix = true) {
        cls = checkPrefix(cls, withPrefix);
        if (this.hasClass(cls)) {
            this.el.className = this.el.className.replace(getRegExp(cls), ' ').trim();
        }
        return this;
    }
    replaceClass (a: string, b: string, withPrefix = true) {
        a = checkPrefix(a, withPrefix);
        b = checkPrefix(b, withPrefix);
        if (this.hasClass(a)) {
            this.el.className = this.el.className.replace(getRegExp(a), ` ${b} `).trim();
        } else {
            this.addClass(b);
        }
        return this;
    }
    toggleClass (name: string) {
        return this.hasClass(name) ? this.rmClass(name) : this.addClass(name);
    }

    append (...children: (Ele|Ele[]|null)[]) {
        children.forEach((el) => {
            if (el instanceof Array) {
                el.forEach((singleEl) => {this.appendSingle(singleEl);});
            } else {
                this.appendSingle(el);
            }
        });
        return this;
    }

    appendSingle (el: Ele|null) {
        if (el === null) {
            return this;
        }
        const dom = checkDom(el) as any;
        try {
            this.el.appendChild(dom);
        } catch (e) {
            console.warn(e);
            return this;
        }
        if (typeof dom.__ed_mounted === 'function') {
            setTimeout(() => {
                if (typeof dom.__ed_mounted === 'function') {
                    const El = query(dom);
                    dom.__ed_mounted.call(El, El, this);
                }
                dom.__ed_mounted = null;
            });
        }
        return this;
    }

    name (): string;
    name (name: string): this;
    name (name?: string) {
        if (typeof name === 'undefined') return this.attr('el-name');
        return this.attr('el-name', name);
    }

    insert (index: number|string, ...eles: (string | Ele | HTMLElement)[]) {
        if (eles[0] instanceof Array) {
            eles = eles[0];
        }
        const el = this.child(index);
        eles.forEach((ele) => {
            const item = checkDom(ele);
            if (!item) {
                console.error(ele);
                throw new Error(`Dom is not exist: ${ele.toString()}`);
            }
            this.el.insertBefore(item, el.el);
        });
        return this;
    }

    prepend (...eles: (string | Ele | HTMLElement)[]) {
        return this.insert(0, ...eles);
    }

    before (...eles: (string | Ele | HTMLElement)[]) {
        return this.parent().insert(this.index(), ...eles);
    }
    after (...eles: (string | Ele | HTMLElement)[]) {
        return this.parent().insert(this.index() + 1, ...eles);
    }

    remove (arg?: number|Ele) {
        if (typeof arg === 'undefined') {
            try {
                this.parent().remove(this);
            } catch (e) {}
            return this;
        }
        if (typeof arg === 'number') {
            this.el.removeChild(this.el.children[arg]);
        } else {
            this.el.removeChild(arg.dom());
        }
        return this;
    }

    empty () {
        return this.html('');
    }

    parent (index?: number): Ele {
        if (typeof index === 'number') {
            if (index < 1) {
                return this;
            };
            let parent: any = this;
            for (let i = 0; i < index; i++) {
                parent = parent.parent();
                if (!parent) {
                    throw new Error(`parent ${i} is not exist`);
                }
            }
            return parent;
        }
        if (this.el.parentElement) {
            return new Ele({ ele: this.el.parentElement });
        }
        throw new Error('parent is not exist');
    }

    data (name: string): any;
    data (): IJson;
    data (name: IJson): this;
    data (name: string, value: any): this;
    data (name?: string|IJson, value?: any): any|IJson|this {
        const el = this.el as any;
        if (typeof el._ed_data === 'undefined') {
            el._ed_data = {};
        }
        let data = el._ed_data;
        if (typeof name === 'undefined') {
            return data;
        }
        if (typeof name === 'object') {
            if (name === null) {
                data = {};
            } else {
                for (const k in name) {
                    this.data(k, name[k]);
                }
            }
        } else {
            if (value === null) {
                delete data[name];
            } else if (typeof value === 'undefined') {
                return data[name];
            } else {
                data[name] = value;
            }
        }
        return this;
    }

    index () {
        const a = this.parent().child();
        for (let i = 0; i < a.length; i++) {
            if (a[i].el === this.el)
                return i;
        }
        return -1;
    }
    next (i = 1) {
        return this.parent().child(this.index() + i);
    }
    prev (i = 1) {
        return this.next(-i);
    }

    child(): Ele[];
    child(i: number|string): Ele;
    child (i?: number|string) {
        if (typeof i === 'number') {
            if (i >= this.el.children.length || i < 0) {
                throw new Error('index is over limit');
            }
            return new Ele({ ele: this.el.children[i] as HTMLElement });
        }
        if (typeof i === 'string') {
            return this.query(`[el-name="${i}"]`, true);
        }
        return domListToEles(this.el.children);
    }
    brother(): Ele[];
    brother(i: number): Ele;
    brother (i?: number) {
        if (typeof i === 'number') {
            return this.parent().child(i);
        }
        return this.parent().child();
    }

    created (cb: (this: Ele, self: Ele)=>void) {
        cb.call(this, this);
        return this;
    }
    // 被其他元素append
    mounted (fn: (this: Ele, self: Ele, parent: Ele)=>void) {
        // @ts-ignore
        this.el.__ed_mounted = fn;
        return this;
    }

    src(): string;
    src(v: string): this;
    src (v?: string) {
        // @ts-ignore
        if (typeof v === 'undefined') return this.dom().src;
        // @ts-ignore
        this.dom().src = v;
        return this;
    }

    render (options = {}) {
        return render.call(this, options);
    }

    query (selector: string, one: true): Ele;
    query (selector: string, one?: false): Ele[];
    query (selector: string, one = false): Ele|Ele[] {
        if (one) {
            const el = this.el.querySelector(selector);
            if (el) return query(el as HTMLElement);
            throw new Error('Element is not exist' + selector);
        }
        const list = this.el.querySelectorAll(selector);
        const res: (Ele)[] = [];
        for (let i = 0; i < list.length; i++) {
            res.push(query(list[i] as HTMLElement));
        }
        return res;
    }
    hide () {
        return this.style('display', 'none');
    }
    show (display = 'block') {
        return this.style('display', display);
    }
    setVisible (visible = true, display = 'block') {
        return visible ? this.show(display) : this.hide();
    }
    mount (ele: TEleCommon = document.body) {
        query(ele).append(this);
        return this;
    }
}


function getRegExp (name: string) {
    return new RegExp(`(^| )${name}($| )`);
}
function checkCssValue (a: HTMLElement, c: string, d: string) {
    if (typeof d === 'string' && (d.indexOf('-=') !== -1 || d.indexOf('+=') !== -1)) {
        const e = getCssNumberValue(d.substring(d.indexOf('=') + 1));
        if (d.indexOf('-=') !== -1) {
            e[0] = -e[0];
        }
        let b;
        if (d.indexOf('%') !== -1) {
            b = getCssNumberValue(a.style[c as any]);
        } else {
            b = getCssNumberValue(getComputedStyle(a)[c as any]);
        }
        return (e[0] + b[0]) + e[1];
    }
    return d;
};
function getCssNumberValue (a?: string, b?: string): [number, string] {
    if (!a) {
        a = '0%';
    }
    if (b === undefined) {
        if (a.includes('px')) {
            b = 'px';
        } else if (a.includes('%')) {
            b = '%';
        } else if (a.includes('em')) {
            b = 'em';
        } else {
            return [ parseFloat(a), 'px' ];
        }
    }
    return [ parseFloat(a.substring(0, a.indexOf(b))), b ];
};


export function checkDom (el: TEleCommon) {
    if (el instanceof HTMLElement) {
        return el;
    } if (typeof el === 'string') {
        return document.querySelector(el);
    }
    return el.el;
}

export type TEleCommon = string|HTMLElement|Ele;

export function query (selector: TEleCommon, all: true): Ele[];
export function query (selector: TEleCommon, all?: false|undefined): Ele;
export function query (selector: TEleCommon, all = false): Ele[]|Ele {
    if (selector instanceof Ele) return selector;
    if (selector instanceof HTMLElement) {
        return new Ele({ ele: selector });
    }
    if (typeof selector === 'object') {
        return selector;
    }
    if (all === true) {
        return domListToEles(document.querySelectorAll(selector));
    }
    const ele = document.querySelector(selector);
    if (!ele) {
        console.error(ele);
        throw new Error('Element is not exist');
    }
    return new Ele({ ele: ele as HTMLElement });
}

export function exist (selector: string): boolean {
    return !!document.querySelector(selector);
}

export function create (tag: TTag): Ele;
export function create (tag?: string): Ele;
export function create (tag: TTag|string = 'div') {
    return new Ele({ tag });
}
function domListToEles (list: (HTMLElement|Element)[]|NodeListOf<Element>|HTMLCollection) {
    return [].slice.apply(list).map((dom: HTMLElement) => new Ele({ ele: dom }));
}