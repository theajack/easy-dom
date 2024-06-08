/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 16:11:04
 * @Description: Coding something
 */
/* 添加style样式*/
// import {$} from './bridge';
// import commonStyle from './common-ui/commonStyle';
import { tool } from './easydom';
import commonStyle from './commonStyle';
import { Ele, IJson } from 'easy-dom-util';
export const $ = tool;

$.addCommonStyle(commonStyle);
reportStyle(initStyle);


export function initStylePool () {
    $.initStylePool();
}

export function reportStyle (
    func: string | ((common: IJson<string>)=>string),
    id = 'TACL-UI'
) {
    $.reportStyle({
        func,
        id,
        pool: true,
    });
}

export function initTaclUI (el: Ele) {
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
