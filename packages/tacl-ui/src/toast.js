import {$, reportStyle, initTaclUI} from './style';

const TOAST_POSITION = {
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom',
};

const prefix = 'g-toast-';

const instance = {
    el: null,
    timer: null,
    lastParent: null,
    onhide: null,
    onopen: null,
};

reportStyle(initStyle);
function toast (text, time, target = instance) {
    let parent;
    if (target.onhide) {
        target.onhide();
    }
    target.onhide = null;
    target.onopen = null;
    let contentHtml = false;
    let position = TOAST_POSITION.MIDDLE;
    let customClass = '';
    let showClose = false;
    let button = null;
    if (typeof text === 'object') {
        button = text.button;
        showClose = text.showClose;
        time = text.time;
        position = text.position;
        parent = text.parent;
        if (text.onhide) {
            target.onhide = text.onhide;
        }
        target.onopen = text.onopen;
        customClass = text.customClass || '';
        if (typeof text.contentHtml === 'boolean') {
            contentHtml = text.contentHtml;
        }
        // 最后赋值
        text = text.text;
    }
    target.customClass = customClass;
    init({text, time, position, parent, contentHtml, target, showClose, button});
}

toast.new = function (text, time, fn = toast) {
    const target = {};
    fn(text, time, target);
    return () => {
        close(target);
    };
};
toast.close = close;

function init ({
    text = '',
    time = 2000,
    position = TOAST_POSITION.MIDDLE,
    parent = document.body,
    contentHtml,
    target,
    showClose,
    button,
}) {
    parent = $.query(parent);
    if (!target.el) {
        target.el = {};
        target.lastParent = parent;
        $.classPrefix(prefix);
        const wrapper = $.create().cls('wrapper');
        const content = $.create().cls('content');
        const closeEl = $.create('span').cls('close')
            .text('✕')
            .click(() => {
                close(target);
            });

        const btnEl = $.create('span').cls('btn');

        wrapper.append([content, closeEl, btnEl]);
        $.clearClassPrefix();
        initTaclUI(wrapper);
        $.query(parent).append(wrapper);
        target.el.wrapper = wrapper;
        target.el.content = content;
        target.el.close = closeEl;
        target.el.btn = btnEl;
    } else if (parent.el !== target.lastParent.el) {
        target.lastParent = parent;
        parent.append(target.el.wrapper);
    }
    open({text, time, position, contentHtml, target, showClose, button});
}

function open ({text, time, position, contentHtml, target, showClose, button}) {
    const autoClose = typeof time === 'number';
    target.el.isOpen = true;
    target.el.wrapper.style('display', 'block');
    let otheClass = '';
    target.el.close[showClose ? 'show' : 'hide']();
    otheClass += (showClose ? ' has-close' : '');

    if (button) {
        otheClass += ' has-btn';
        target.el.btn.text(button.text).show();
        target.el.btn.el.onclick = () => {
            button.onclick();
        };
    } else {
        target.el.btn.hide();
    }

    $.classPrefix(prefix, () => {
        target.el.wrapper.cls(`wrapper ${position}${otheClass}`);
    });
    if (target.customClass) {
        target.el.wrapper.addClass(target.customClass, false);
    }
    if (typeof text !== 'undefined') {
        if (contentHtml) {
            target.el.content.html(text);
        } else {
            target.el.content.text(text);
        }
    }
    window.setTimeout(() => {
        if (target.onopen) target.onopen(target.el.wrapper);
        target.el.wrapper.addClass(`${prefix}open`);
    }, 20);
    if (autoClose) {
        clearTimeout(target.timer);
        target.timer = setTimeout(() => {
            close(target);
        }, time);
    }
}
function close (target = instance) {
    if (target.el && target.el.isOpen) {
        target.el.isOpen = false;
        target.el.wrapper.rmClass(`${prefix}open`);
        window.setTimeout(() => {
            if (target.onhide) {
                target.onhide();
                target.onhide = null;
            };
            if (target !== instance) {
                target.el.wrapper.remove();
            } else {
                target.el.wrapper.style('display', 'none');
            }
        }, 350);
        return true;
    }
    return false;
}

function initStyle (common) {
    return /* css*/`
    .g-toast-wrapper {
        ${common.piece.centerWrapper}
        ${common.piece.overScroll}
        opacity:0;
        transition:opacity .3s ease;
        padding: 8px 10px;
        z-index: 10000;
        position: fixed;
    }
    .g-toast-wrapper.g-toast-bottom{
        top: 90%;
    }
    .g-toast-wrapper.g-toast-top{
        top: 8%;
    }
    .g-toast-wrapper.g-toast-bottom{
        top: 90%;
    }
    .g-toast-wrapper.g-toast-open {
        opacity:1;
    }
    .g-toast-wrapper.g-toast-has-close {
        padding-right: 25px!important;
    }
    .g-toast-wrapper.g-toast-has-btn {
        padding-right: 45px!important;
    }
    .g-toast-btn,.g-toast-close{
        display: block;
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        color: #aaa;
        padding: 0 2px;
        font-size: 16px;
        cursor: pointer;
    }
    .g-toast-close:hover{
        color: #f44;
    }
    .g-toast-btn{
        color: #ddd;
        text-decoration: underline;
        font-size: 14px;
    }
    .g-toast-btn:hover{
        color: #fff;
    }`;
}
export default toast;

