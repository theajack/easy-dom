/*
 * @Author: chenzhongsheng
 * @Date: 2024-06-08 21:09:12
 * @Description: Coding something
 */


export function isPC () {
    const specialIPad = /Macintosh/i.test(navigator.userAgent) && (typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 0);
    return !specialIPad && !(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));
}
