
/**
 * 主要用来操作dom的工具方法
 */
import {classPrefix, clearClassPrefix, checkDom, query, create} from './ele';
import {reportStyle, addCommonStyle, initStylePool} from './style';
import {registTouchEvent} from './touchEvent';
import version from './version';

// 获取浏览器窗口大小 window.innerWidth  在某些情况下有误
// window.innerWidth： 包含滚动条 在ios safari 下准确
// document.documentElement.clientWidth 不包滚动条，但是在ios safari下 document.documentElement.clientHeight 不准
// 移动端一般没有滚动条，所以默认在pc上使用document.documentElement，移动端使用window.innerWidth
function windowSize (useInner) {
    if (useInner === true) {return _wiSize();}
    return (isMobile() !== false) ? _wiSize() : _deSize();
}

function _deSize () {
    return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
}

function _wiSize () {
    return {width: window.innerWidth, height: window.innerHeight};
}

function isMobile () {
    let ua = navigator.userAgent.toLowerCase();
    let agents = new Array('android', 'iphone', 'symbianos', 'windows phone', 'ipad', 'ipod');
    for (let v = 0; v < agents.length; v++) {
        if (ua.indexOf(agents[v]) > 0) {
            return agents[v] === 'iphone' ? 'ios' : agents[v];
        }
    }
    return false;
}

export default {
    query,
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
    version
};
