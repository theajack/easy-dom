/* 添加style样式*/
// import {$} from './bridge';
// import commonStyle from './common-ui/commonStyle';
import tool from './easydom';
import commonStyle from './commonStyle';
export const $ = tool;

$.addCommonStyle(commonStyle);
reportStyle(initStyle);


export function initStylePool () {
    $.initStylePool();
}

export function reportStyle (func, id = 'TACL-UI') {
    $.reportStyle({
        func,
        id,
        pool: true,
    });
}

export function initTaclUI (el) {
    el.addClass('tacl-ui');
}
 
function initStyle () {
    return /* css */`
        .tacl-ui{
            font-size:15px;
            color:#222;
            font-family:"Microsoft YaHei";
            margin:0;
            padding:0;
        }
        .tacl-ui,.tacl-ui *{
            box-sizing: border-box;
        }`;
}
