import { IJson } from 'easy-dom-util';
import { ToastPosition } from './enum';
import { $, reportStyle, initTaclUI } from './style';
import { IToast, IToastDefault, IToastOptions } from './type';


const prefix = 'g-toast-';

const instance: IToast = {
    el: null,
    timer: null,
    lastParent: null,
    onhide: null,
    onopen: null,
} as any;

reportStyle(initStyle);

const toast = ((arg: string|IToastOptions, time?: number, target: IToast = instance) => {
    let parent;
    if (target.onhide) {
        target.onhide();
    }
    target.onhide = null;
    target.onopen = null;
    let contentHtml = false;
    let position = ToastPosition.Middle;
    let customClass = '';
    let showClose = false;
    let button = null;
    let text = '';
    if (typeof arg === 'object') {
        button = arg.button;
        showClose = arg.showClose ?? false;
        time = arg.time;
        if (arg.position) position = arg.position;
        parent = arg.parent;
        if (arg.onhide) target.onhide = arg.onhide;
        if (arg.onopen) target.onopen = arg.onopen;
        customClass = arg.customClass || '';
        if (typeof arg.contentHtml === 'boolean') {
            contentHtml = arg.contentHtml;
        }
        // 最后赋值
        text = arg.text || '';
    } else {
        text = arg;
    }
    target.customClass = customClass;
    init({ text, time, position, parent, contentHtml, target, showClose, button });
}) as IToastDefault;

toast.create = function (text, time, fn: IToastDefault = toast) {
    const target = {} as IToast;
    fn(text, time, target);
    return () => {
        close(target);
    };
};
toast.close = close;

function init ({
    text = '',
    time = 2000,
    position = ToastPosition.Middle,
    parent = document.body,
    contentHtml,
    target,
    showClose,
    button,
}: IToastOptions & {target: IToast}) {
    parent = $.query(parent);
    if (!target.el) {
        target.el = {} as any;
        target.lastParent = parent;
        $.classPrefix(prefix);
        const wrapper = $.create().class('wrapper');
        const content = $.create().class('content');
        const closeEl = $.create('span').class('close')
            .text('✕')
            .click(() => {
                close(target);
            });

        const btnEl = $.create('span').class('btn');

        wrapper.append([ content, closeEl, btnEl ]);
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
    open({ text, time, position, contentHtml, target, showClose, button });
}

function open ({
    text, time, position, contentHtml, target, showClose, button
}: IToastOptions & {target: IToast}) {
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
        target.el.wrapper.class(`wrapper ${position}${otheClass}`);
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

function initStyle (common: IJson<any>) {
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

