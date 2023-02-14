import $ from './index';

const df = function () {};

export function registTouchEvent ({
    el,
    touchStart = df,
    touchMove = df,
    touchEnd = df,
}) {
    if (isMobile()) {
        $.query(el).on({
            touchstart: touchStart,
            touchmove: touchMove,
            touchend: touchEnd
        });
        // document.body.addEventListener(
        //     'touchmove',
        //     function (e) {
        //         e.preventDefault(); // 阻止默认的处理方式(阻止下拉滑动的效果)
        //     },
        //     {passive: false}
        // );
    } else {
        let isMouseDown = false;
        $.query(el).on({
            mousedown: (e) => {
                isMouseDown = true;
                touchStart(buildTouchWithMouse(e, 'touchstart'));
            }
        });
        $.query(document.body).on({
            mousemove: (e) => {
                e.preventDefault(); // 阻止默认的处理方式(防止拖拽选中效果)
                if (isMouseDown) {
                    touchMove(buildTouchWithMouse(e, 'touchmove'));
                }
            },
            mouseup: (e) => {
                if (isMouseDown) {
                    isMouseDown = false;
                    touchEnd(buildTouchWithMouse(e, 'touchend'));
                }
            }
        });
    }
}


function isMobile () {
    return (/Android|iPad|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
}

function buildTouchWithMouse (event, type) {
    const es = [{
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
    }];
    event.touchType = type;
    event.touches = (type === 'touchend') ? [] : es;
    event.changedTouches = es;
    return event;
}