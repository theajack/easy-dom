
/**
 * 主要用来操作dom的工具方法
 */
import {classPrefix, clearClassPrefix, checkDom, query, create} from './ele';
import {reportStyle, addCommonStyle, initStylePool} from './style';
import {registTouchEvent} from './touchEvent';
import version from './version';

// 获取浏览器窗口大小 window.innerWidth 在某些情况下有误
function windowSize () {
    return {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};
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
    version
};
