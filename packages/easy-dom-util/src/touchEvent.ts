/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 16:11:04
 * @Description: Coding something
 */
import { TEleCommon } from './ele';
import $ from './index';

const df = function () {};

export function registTouchEvent ({
    el,
    touchStart = df,
    touchMove = df,
    touchEnd = df,
}: {
    el: TEleCommon,
    touchStart: (e: TouchEvent)=>void,
    touchMove: (e: TouchEvent)=>void,
    touchEnd: (e: TouchEvent)=>void,
}) {
    if (isMobile()) {
        $.query(el).on({
            touchstart: touchStart,
            touchmove: touchMove,
            touchend: touchEnd
        });
    } else {
        let isMouseDown = false;
        $.query(el).on({
            mousedown: (e) => {
                isMouseDown = true;
                touchStart(mouseToTouchEvent(e, 'touchstart'));
            }
        });
        $.query(document.body).on({
            mousemove: (e) => {
                e.preventDefault(); // 阻止默认的处理方式(防止拖拽选中效果)
                if (isMouseDown) {
                    touchMove(mouseToTouchEvent(e, 'touchmove'));
                }
            },
            mouseup: (e) => {
                if (isMouseDown) {
                    isMouseDown = false;
                    touchEnd(mouseToTouchEvent(e, 'touchend'));
                }
            }
        });
    }
}


function isMobile () {
    return (/Android|iPad|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
}

export function mouseToTouchEvent (event: any, type: 'touchstart'|'touchmove'|'touchend'): TouchEvent {
    const es = [ {
        clientX: event.clientX,
        clientY: event.clientY,
        force: 1,
        identifier: 0,
        pageX: event.pageX,
        pageY: event.pageY,
        radiusX: 11.5,
        radiusY: 11.5,
        rotationAngle: 0,
        screenX: event.screenX,
        screenY: event.screenY,
        target: event.target
    } ];
    event.touchType = type;
    event.touches = (type === 'touchend') ? [] : es;
    event.changedTouches = es;
    return event as unknown as TouchEvent;
}