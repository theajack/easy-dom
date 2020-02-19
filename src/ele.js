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
        this.el = ele ? ele : document.createElement(tag);
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

    html (html) {
        if (typeof html === 'undefined') {return this.el.innerHTML;}
        this.el.innerHTML = html;
        return this;
    }

    click (func) {
        return this.on('click', func);
    }

    on (name, func) {
        if (typeof name === 'object') {
            for (let k in name) {
                this.on(k, name[k]);
            }
            return this;
        }
        if (typeof func !== 'function') {
            throw new Error('事件类型应该为 function');
        }
        this.el.addEventListener(name, func, false);
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

    append (...eles) {
        eles.forEach((el) => {
            this.el.appendChild(checkDom(el));
        });
        return this;
    }

    remove (arg) {
        if (typeof arg === 'number') {
            this.el.removeChild(this.el.children[arg]);
        } else {
            this.el.removeChild(arg.dom());
        }
        return this;
    }

    parent () {
        return new Ele({ele: this.el.parentNode});
    }
    child (i) {
        if (typeof i === 'number') {
            return new Ele({ele: this.el.children[i]});
        }
        return Array.prototype.slice.apply(this.el.children).map((dom) => {
            return new Ele({ele: dom});
        });
    }

    exe (cb) {
        cb.call(this, this.dom());
        return this;
    }

    src (v) {
        this.dom().src = v;
        return this;
    }

    render ({
        html,
        method = {},
        result = null
    }) {
        this.html(zipHtml(html));
        let el = {};
        if (typeof result === 'function') {
            let els = this.query('[\\@el]');
            for (let i = 0; i < els.length; i++) {
                let item = els[i];
                el[item.attr('@el')] = item;
                item.attr('@el', null);
            }
            result.call({
                el: this,
                method,
            }, el);
        }
        let list = this.query('[\\@event]');
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let res = buildEventResult(item);
            if (method[res.name]) {
                item.on(res.event, method[res.name].bind({
                    el: this,
                    bindEl: el,
                    self: item,
                    method
                }, ...res.args));
            }
        }
        return this;
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

function buildEventResult (item) {
    let arr = item.attr('@event').split(':');
    item.attr('@event', null);
    let event = 'click', name, args = [];
    if (arr.length === 1) {
        name = arr[0];
    } else {
        event = arr[0];
        name = arr[1];
    }
    if (name.indexOf('(') !== -1) {
        let arg = name.match(/\(.*\)/);
        if (arg !== null) {
            let str = arg[0].replace(/'/g, '"');
            str = `[${str.substr(1, str.length - 2)}]`;
            args = JSON.parse(str);
        }
        name = name.substr(0, name.indexOf('('));

    }
    return {
        event,
        name,
        args
    };
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

function zipHtml (html) {
    return html.replace(new RegExp('\\n *', 'g'), '').replace(new RegExp('<!--(.|\\n)*?-->', 'g'), '').trim();
}

export function checkDom (el) {
    if (el instanceof HTMLElement) {
        return el;
    } else if (typeof el === 'string') {
        return document.querySelector(el);
    } else {
        return el.dom();
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