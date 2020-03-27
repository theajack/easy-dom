import parseTag from './parseTag';
import {render} from './render';

let class_prefix = '';
export function classPrefix (pf, func) {
    class_prefix = pf;
    if (typeof func === 'function') {
        func(clearClassPrefix);
        clearClassPrefix();
    }
}
export function clearClassPrefix () {
    class_prefix = '';
}

function checkPrefix (cls) {
    return class_prefix + cls;
}


export class Ele {
    constructor ({tag, ele}) {
        if (ele) {
            this.el = ele;
        } else {
            let res = parseTag(tag);
            this.el = document.createElement(res.tag);
            if (res.cls) {this.cls(res.cls);}
            if (res.attr) {this.attr(res.attr);}
            if (res.id) {this.id(res.id);}
        }
    }
    dom () {
        return this.el;
    }

    cls (cls) {
        if (typeof cls === 'undefined') {
            return this.el.className;
        }
        if (class_prefix !== '') {
            this.el.className = cls.split(' ').map((item) => {
                return checkPrefix(item);
            }).join(' ');
        } else {
            this.el.className = cls;
        }
        return this;
    }

    id (id) {
        if (typeof id === 'undefined') {
            return this.attr('id');
        }
        return this.attr('id', id);
    }

    attr (name, value) {
        if (typeof name === 'object') {
            for (let k in name) {
                this.el.setAttribute(k, name[k]);
            }
            return this;
        }
        if (typeof value === 'undefined') {
            return this.el.getAttribute(name);
        }
        if (value === null) {
            this.el.removeAttribute(name);
        } else {
            this.el.setAttribute(name, value);
        }
        return this;
    }

    hasAttr (name) {
        return this.el.hasAttribute(name);
    }

    rmAttr (name) {
        this.el.removeAttribute(name);
        return this;
    }

    style (name, value) {
        if (typeof value === 'undefined') {
            if (name instanceof Array) { // 根据数组批量获取样式
                let style = {};
                name.forEach((item) => {
                    style[item] = this.style(item);
                });
                return style;
            } else if (typeof name === 'object') { // 根据json设置样式
                for (let key in name) {
                    this.style(key, name[key]);
                }
                return this;
            } else {
                return getComputedStyle(this.el)[name]; // 返回查询到的样式
            }
        } else { // 根据name value 设置样式
            if (typeof value === 'string' && value.indexOf('!important') !== -1) {
                this.el.style.setProperty(name, checkCssValue(this.el, name, value.substring(0, value.indexOf('!important'))), 'important');
            } else {
                this.el.style.setProperty(name, checkCssValue(this.el, name, value));
            }
            return this;
        }
    }

    text (text) {
        if (typeof text === 'undefined') {return this.el.innerText;}
        this.el.innerText = text;
        return this;
    }

    value (val) {
        if (typeof val === 'undefined') {return this.el.value;}
        this.el.value = val;
        return this;
    }

    html (html) {
        if (typeof html === 'undefined') {return this.el.innerHTML;}
        this.el.innerHTML = html;
        return this;
    }

    click (func, useCapture) {
        return this.on('click', func, useCapture);
    }

    on (name, func, useCapture = false) {
        if (typeof name === 'object') {
            for (let k in name) {
                this.on(k, name[k]);
            }
            return this;
        }
        if (typeof func !== 'function') {
            throw new Error('事件类型应该为 function');
        }
        this.el.addEventListener(name, func, useCapture);
        return this;
    }

    addClass (cls) {
        cls = checkPrefix(cls);
        if (!this.hasClass(cls)) {
            if (this.el.className === '') {
                this.el.className = cls;
            } else {
                this.el.className += ' ' + cls;
            }
        }
        return this;
    }

    hasClass (cls) {
        cls = checkPrefix(cls);
        return getRegExp(cls).test(this.el.className);
    }

    rmClass (cls) {
        cls = checkPrefix(cls);
        if (this.hasClass(cls)) {
            this.el.className = this.el.className.replace(getRegExp(cls), ' ').trim();
        }
        return this;
    }
    replaceClass (a, b) {
        a = checkPrefix(a);
        b = checkPrefix(b);
        if (this.hasClass(a)) {
            this.el.className = this.el.className.replace(getRegExp(a), ' ' + b + ' ').trim();
        } else {
            this.addClass(b);
        }
        return this;
    }
    toggleClass (name) {
        return this.hasClass(name) ? this.rmClass(name) : this.addClass(name);
    }

    append (...eles) {
        if (eles[0] instanceof Array) {
            eles = eles[0];
        }
        eles.forEach((el) => {
            this.el.appendChild(checkDom(el));
        });
        return this;
    }

    insert (...eles) {
        let index = eles.shift();
        if (eles[0] instanceof Array) {
            eles = eles[0];
        }
        let el = this.child(index);
        if (el) {
            eles.forEach((ele) => {
                this.el.insertBefore(checkDom(ele), el.el);
            });
        } else {
            this.append(...eles);
        }
        return this;
    }

    prepend (...eles) {
        return this.insert(0, ...eles);
    }

    before (...eles) {
        return this.parent().insert(this.index(), ...eles);
    }
    after (...eles) {
        return this.parent().insert(this.index() + 1, ...eles);
    }

    remove (arg) {
        if (typeof arg === 'undefined') {
            this.parent().remove(this);
            return;
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

    parent (index) {
        if (typeof index === 'number') {
            if (index < 1) {return null;};
            let parent = this;
            for (let i = 0; i < index; i++) {
                parent = parent.parent();
                if (!parent) {
                    return null;
                }
            }
            return parent;
        } else {
            if (this.el.parentElement) {
                return new Ele({ele: this.el.parentElement});
            }
            return null;
        }
    }

    data (name, value) {
        if (typeof this.el._ed_data === 'undefined') {this.el._ed_data = {};}
        let data = this.el._ed_data;
        if (typeof name === 'undefined') {return data;}
        if (typeof name === 'object') {
            if (name === null) {
                data = {};
            } else {
                for (let k in name) {
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
        var a = this.parent().child();
        for (var i = 0; i < a.length; i++) {
            if (a[i].el == this.el) {
                return i;
            }
        }
        return -1;
    }
    next (i = 1) {
        return this.parent().child(this.index() + i);
    }
    prev (i = 1) {
        return this.next(-i);
    }

    child (i) {
        if (typeof i === 'number') {
            if (i >= this.el.children.length || i < 0) {
                return null;
            }
            return new Ele({ele: this.el.children[i]});
        }
        return Array.prototype.slice.apply(this.el.children).map((dom) => {
            return new Ele({ele: dom});
        });
    }
    brother (i) {
        if (typeof i === 'number') {
            return this.parent().child(i);
        }
        return this.parent().child();
    }

    exe (cb) {
        cb.call(this, this.dom());
        return this;
    }

    src (v) {
        this.dom().src = v;
        return this;
    }

    render (options = {}) {
        return render.call(this, options);
    }

    query (selector) {
        let list = this.el.querySelectorAll(selector);
        let res = [];
        for (let i = 0; i < list.length; i++) {
            res.push(query(list[i]));
        }
        return res;
    }
}


function getRegExp (name) {
    return new RegExp('(^| )' + name + '($| )');
}
function checkCssValue (a, c, d) {
    if (typeof d === 'string' && (d.indexOf('-=') !== -1 || d.indexOf('+=') !== -1)) {
        var e = getCssNumberValue(d.substring(d.indexOf('=') + 1));
        if (d.indexOf('-=') !== -1) {
            e[0] = -e[0];
        }
        var b;
        if (d.indexOf('%') !== -1) {
            b = getCssNumberValue(a.style[c]);
        } else {
            b = getCssNumberValue(getComputedStyle(a)[c]);
        }
        return (e[0] + b[0]) + e[1];
    }
    return d;
};
function getCssNumberValue (a, b) {
    if (a == '' || a == undefined) {
        a = '0%';
    }
    if (b == undefined) {
        if (a.has('px')) {
            b = 'px';
        } else if (a.has('%')) {
            b = '%';
        } else if (a.has('em')) {
            b = 'em';
        } else {
            return [parseFloat(a), 'px'];
        }
    }
    return [parseFloat(a.substring(0, a.indexOf(b))), b];
};


export function checkDom (el) {
    if (el instanceof HTMLElement) {
        return el;
    } else if (typeof el === 'string') {
        return document.querySelector(el);
    } else {
        return el.el;
    }
}

export function query (selector, all) {
    if (selector instanceof HTMLElement) {
        return new Ele({ele: selector});
    }
    if (typeof selector === 'object') {
        return selector;
    }
    if (all === true) {
        return document.querySelectorAll(selector);
    }
    let ele = document.querySelector(selector);
    if (!ele) {
        return null;
    }
    return new Ele({ele});
}

export function create (tag = 'div') {
    return new Ele({tag});
}