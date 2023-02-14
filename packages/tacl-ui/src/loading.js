import {$, reportStyle, initTaclUI} from './style';

const prefix = 'g-loading-';
// 单例模式
const instance = {
    el: null,
    timer: null,
    lastParent: null,
    onhide: null,
    onopen: null,
};
 
reportStyle(initStyle);
function loading (text, time, target = instance) {
    let parent;
    if (target.onhide) {
        target.onhide();
    }
    target.onhide = null;
    target.onopen = null;
    let backgroundOpacity = '';
    if (typeof text === 'object') {
        parent = text.parent;
        time = text.time;
        if (text.onhide) {
            target.onhide = text.onhide;
        }
        target.onopen = text.onopen;
        backgroundOpacity = text.backgroundOpacity;
        text = text.text;
    }
    init(text, time, target, parent, backgroundOpacity);
}
loading.new = function (text, time, fn = loading) {
    const target = {};
    fn(text, time, target);
    return () => {
        close(target);
    };
};
loading.close = close;

function init (text, time, target, parent = document.body, backgroundOpacity) {
    parent = $.query(parent);
    if (!target.el) {
        target.el = {};
        target.lastParent = parent;
        $.classPrefix(prefix);
        const mask = $.create().cls('mask');
        const wrapper = $.create().cls('wrapper')
            .html(/* html*/`
<svg class="g-loading-circular" viewBox="0 0 50 50">
    <circle class="g-loading-path" cx="25" cy="25" r="20" fill="none"></circle>
</svg>`);
        target.el.text = $.create().cls('text');
        wrapper.append(target.el.text);
        $.clearClassPrefix();
        initTaclUI(mask);
        parent.append(mask.append(wrapper));
        target.el.mask = mask;
        target.el.wrapper = wrapper;
    } else if (parent.el !== target.lastParent.el) {
        target.lastParent = parent;
        parent.append(target.el.mask);
    }
    target.el.mask.style('background-color', backgroundOpacity ? `rgba(0,0,0,${backgroundOpacity})` : 'transparent');
    open(text, time, target);
}

function open (text, time, target) {
    const autoClose = typeof time === 'number';
    target.el.isOpen = true;
    target.el.mask.style('display', 'block');
    target.el.text.text(text);
    window.setTimeout(() => {
        if (target.onopen) target.onopen(target.el.mask);
        target.el.wrapper.addClass(`${prefix}open`);
    }, 20);
    if (autoClose) {
        clearTimeout(target.timer);
        target.timer = setTimeout(() => {
            close();
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
            }
            if (target !== instance) {
                target.el.mask.remove();
            } else {
                target.el.mask.style('display', 'none');
                target.el.text.text('');
            }
        }, 350);
    }
}

function initStyle (common) {
    return /* css*/`
    .g-loading-mask{
        ${common.piece.mask};
        background-color:transparent;
    }
    .g-loading-wrapper {
        ${common.piece.centerWrapper}
        opacity:0;
        transition:opacity .3s ease;
        padding: 10px 12px;
    }
    .g-loading-wrapper.g-loading-open {
        opacity:1;
    }
    .g-loading-circular {
        width:42px;
        height:42px;
        animation:g-loading-rotate 2s linear infinite;
    }
    .g-loading-text {
        ${common.piece.overScroll}
        margin: 0;
    }
    .g-loading-path {
        animation:g-loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray:90 120;
        stroke-dashoffset:0;
        stroke-width:4;
        stroke:#fff;
        stroke-linecap:round;
    }
    @keyframes g-loading-dash {
        0% {
        stroke-dasharray:1 200;
        stroke-dashoffset:0;
    }
    50% {
        stroke-dasharray:90 150;
        stroke-dashoffset:-40px;
    }
    100% {
        stroke-dasharray:90 150;
        stroke-dashoffset:-120px;
    }
    }@keyframes g-loading-rotate {
        to {
        transform:rotate(1turn);
    }
    }`;
}
export default loading;

