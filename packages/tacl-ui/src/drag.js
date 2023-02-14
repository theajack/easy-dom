
// import {$, isUndf, df, registTouchEvent} from '../bridge';
// import {reportStyle} from '../style';

import {$, reportStyle} from './style';

/**
 * 拖动组件
 * new Drag({
 *      el, // Drag 内的内容，可以试 dom元素、选择器和 ele元素
 *      enableDrag:true, // 是否启用可拖拽
 *      onClick:function () {}, // 点击事件
 *      zIndex:100, // drag的z-index
 *      aside:false, // 是否启用吸附到左右两边
 *      onSideChange:function () {}, // 吸附边改变的事件 aside启用时才有效
 *      margin:3, // 上右下左边距 可以是一个数字或者数组
 *      preventDefault: true,
 * })
 */

reportStyle(initStyle);

const prefix = 'g-drag-';
const df = function () {};
class Drag {
    constructor ({
        el,
        parent = null,
        enableDrag = true,
        onClick = df,
        onSideChange = df,
        onDragStart = df,
        onDragMove = df,
        onDragEnd = df,
        zIndex = 100,
        delay = 0,
        aside = false,
        preventDefault = true,
        reinitPosition = false,
        position = null,
        margin = 3, // 上右下左 或者只传入一个数字
    }) {
        this.el = $.create().cls(`${prefix}wrapper`);
        this.el.append(el);
        this.parent = null;
        if (parent === null) {
            parent = $.query(document.body);
        } else {
            parent = $.query(parent);
            this.el.style('position', 'absolute');
            this.parent = parent;
        }
        parent.append(this.el);
        if (typeof margin === 'number') {
            margin = [margin, margin, margin, margin];
        }
        this.preventDefault = preventDefault;
        this.margin = margin;
        this.disX;
        this.disY;
        this.moveX;
        this.moveY;
        this.L;
        this.T;
        this.starX;
        this.starY;
        this.startTime;
        this.left = 'auto';
        this.top = 'auto';
        this.enableDrag = enableDrag; // 是否启用可拖拽
        this.onClick = onClick; // 点击事件
        this.onSideChange = onSideChange; // 吸附边改变的事件
        this.sideLeft = false; // 是否吸附在左侧
        this.aside = aside; // 是否吸附在两侧
        this.onDragStart = onDragStart;
        this.onDragMove = onDragMove;
        this.onDragEnd = onDragEnd;
        this.touchActiveInit(zIndex);
        this.initPosition(true, position);
        const delayExecInitPosition = () => {
            if (delay > 0) {
                window.setTimeout(() => {
                    this.initPosition();
                }, delay);
            } else {
                this.initPosition();
            }
        };
        if (reinitPosition === true) {
            window.addEventListener('orientationchange', delayExecInitPosition, false);
            window.addEventListener('resize', delayExecInitPosition, false);
        }
    }

    touchActiveInit (zIndex) {
        this.el.style({
            left: 'auto',
            top: 'auto',
            'z-index': zIndex,
        });
        $.registTouchEvent({
            el: this.el,
            touchStart: this.touchStart.bind(this),
            touchMove: this.touchMove.bind(this),
            touchEnd: this.touchEnd.bind(this),
        });
    }
    getParentSize () {
        if (this.parent === null) {
            return $.windowSize();
        }
        return {
            width: this.parent.el.offsetWidth,
            height: this.parent.el.offsetHeight,
        };
    }
    initPosition (init, position) {
        setTimeout(() => {
            if (position) {
                this.setPosition(position.left, position.top);
                return;
            }
            const size = this.getParentSize();
            const dom = this.el.dom();
            const left = this.sideLeft ? (this.margin[3]) : (size.width - dom.offsetWidth - this.margin[1]);
            const maxTop = (size.height - dom.offsetHeight - this.margin[0]);
            let top;
            if (init || this.top > maxTop) {
                top = maxTop;
            }
            this.setPosition(left, top);
        }, 50);
    }
    setPosition (left, top) {
        this.left = left;
        this.el.style('left', `${this.left}px`);
        if (typeof top !== 'undefined') {
            this.top = top;
            this.el.style('top', `${this.top}px`);
        }
    }
    touchStart (e) {
        if (this.preventDefault) e.preventDefault(); // 阻止触摸时页面的滚动，缩放
        this.disX = e.touches[0].clientX - this.el.dom().offsetLeft;
        this.disY = e.touches[0].clientY - this.el.dom().offsetTop;
        // 手指按下时的坐标
        this.starX = e.touches[0].clientX;
        this.starY = e.touches[0].clientY;
        this.onDragStart.call(this, e, this.starX, this.starY);
    }
    touchMove (e) {
        const size = this.getParentSize();
        this.L = e.touches[0].clientX - this.disX;
        this.T = e.touches[0].clientY - this.disY;
        const dom = this.el.dom();
        if (this.L < 0) { // 限制拖拽的X范围，不能拖出屏幕
            this.L = 0;
        } else if (this.L > size.width - dom.offsetWidth) {
            this.L = size.width - dom.offsetWidth;
        }
        if (this.T < 0) { // 限制拖拽的Y范围，不能拖出屏幕
            this.T = 0;
        } else if (this.T > size.height - dom.offsetHeight) {
            this.T = size.height - dom.offsetHeight;
        }
        this.moveX = this.L;
        this.moveY = this.T;
        if (this.enableDrag) {
            this.setPosition(this.moveX, this.moveY);
            this.onDragMove.call(this, e, this.moveX, this.moveY);
        }
    }
    touchEnd (e) {
        if (this.preventDefault) e.preventDefault();
        const dom = this.el.dom();
        let endX = e.changedTouches[0].clientX;
        let endY = e.changedTouches[0].clientY;
        const size = this.getParentSize();
        const ww = size.width;
        const wh = size.height;
        const w = dom.offsetWidth;
        const h = dom.offsetHeight;
        const isXNotMove = (Math.abs(this.starX - endX) < 2);
        const isYNotMove = (Math.abs(this.starY - endY) < 2);
        if (isXNotMove && isYNotMove) {
            this.onClick.call(this, e, endX, endY);
        }
        const sideLeft = (endX <= ww / 2);
        endX -= this.disX;
        endY -= this.disY;
        if (this.aside) {
            if (sideLeft) {
                endX = this.margin[3];
            } else {
                endX = ww - w - this.margin[1];
            }
        }
        if (endY < this.margin[0]) {
            endY = this.margin[0];
        } else if (endY > wh - this.margin[2] - h) {
            endY = wh - this.margin[2] - h;
        }
        if (this.enableDrag) {
            dom.style.transition = 'all .2s ease';
            this.setPosition(endX, endY);
            if (this.aside && this.sideLeft !== sideLeft) {
                this.sideLeft = sideLeft;
                this.onSideChange.call(this, this.sideLeft);
            }
            setTimeout(() => {
                dom.style.transition = '';
            }, 200);
        }
        this.onDragEnd.call(this, e, endX, endY);
    }
}


function initStyle () {
    return /* css*/`
    .g-drag-wrapper {
        position: fixed;
        z-index: 100;
        box-sizing: border-box;
        width: auto;
        height: auto;
        cursor: pointer;
    }`;
}

export default Drag;
