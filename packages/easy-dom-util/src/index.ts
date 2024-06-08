/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 08:57:56
 * @Description: Coding something
 */

/**
 * 主要用来操作dom的工具方法
 */
import { checkDom, query, create, exist, collectRef } from './ele';
import { reportStyle, addCommonStyle, initStylePool } from './style';
import { mouseToTouchEvent, registTouchEvent } from './touchEvent';
import version from './version';
import { classPrefix, clearClassPrefix } from './class-prefix';
import { ISize } from './type.d';
import { dom } from './dom';

export { TEleCommon, Ele, collectRef } from './ele';
export { dom, TDomName } from './dom';
export * from './type.d';

let fixWindowSize: ISize | null = null;

// 获取浏览器窗口大小 window.innerWidth  在某些情况下有误
// window.innerWidth： 包含滚动条 在ios safari 下准确
// document.documentElement.clientWidth 不包滚动条，但是在ios safari下 document.documentElement.clientHeight 不准
// 移动端一般没有滚动条，所以默认在pc上使用document.documentElement，移动端使用window.innerWidth
function windowSize (useInner = false) {
    if (fixWindowSize) {
        return {
            width: fixWindowSize.width,
            height: fixWindowSize.height
        };
    }
    if (useInner === true) {
        return _wiSize();
    }
    return (isMobile() !== false) ? _wiSize() : _deSize();
}

function setWindowSize (size: ISize) {
    fixWindowSize = size;
}

function _deSize () {
    return { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
}

function _wiSize () {
    return { width: window.innerWidth, height: window.innerHeight };
}

function isMobile () {
    const ua = navigator.userAgent.toLowerCase();
    const agents = [ 'android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod' ];
    for (let v = 0; v < agents.length; v++) {
        if (ua.indexOf(agents[v]) > 0) {
            return agents[v] === 'iphone' ? 'ios' : agents[v];
        }
    }
    return false;
}

const $ = {
    query,
    exist,
    create,
    classPrefix,
    clearClassPrefix,
    checkDom,

    reportStyle,
    addCommonStyle,
    initStylePool,

    registTouchEvent,
    mouseToTouchEvent,
    windowSize,
    isMobile,
    version,
    setWindowSize,
    dom,
    collectRef,
};

export {
    query,
    exist,
    create,
    classPrefix,
    clearClassPrefix,
    checkDom,
    reportStyle,
    addCommonStyle,
    initStylePool,
    registTouchEvent,
    windowSize,
    isMobile,
    version,
    setWindowSize,
};

export type TEasyDomUtil = typeof $;

export default $;
