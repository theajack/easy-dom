/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 16:11:04
 * @Description: Coding something
 */
/* 添加style样式*/
import $ from '.';
import { IJson } from './type';
import { Ele } from './ele';

const commonStyle: IJson<string> = {

};

let stylePool: IJson = {};

export function addCommonStyle (name: IJson|string, value?:string|number) {
    if (typeof name === 'object') {
        for (const k in name) {
            addCommonStyle(k, name[k]);
        }
        return;
    }

    if (typeof commonStyle[name] === 'undefined') {
        commonStyle[name] = value as string;
    } else {
        console.warn(`addCommonStyle 存在重名变量：${name}`);
    }
}

export function initStylePool () {
    for (const id in stylePool) {
        reportStyle({
            func: stylePool[id],
            id
        });
    }
    stylePool = {};
}

function extractReportStyle (func: string | ((common: IJson<string>)=>string)) {
    if (typeof func === 'string') {
        return func;
    }
    // @ts-ignore
    func.__hasReport = true;
    return func(commonStyle);
}

export function reportStyle ({
    func,
    id = 'el-style',
    pool = false
}: {
    func: string | ((common: IJson<string>)=>string)
    id?: string;
    pool?: boolean;
}) {
    // @ts-ignore
    if (typeof func === 'function' && func.__hasReport) {
        return;
    }
    const css = zipCss(extractReportStyle(func));
    if (pool) {
        if (!stylePool[id]) stylePool[id] = '';
        stylePool[id] += css;
        return;
    }
    const str = `#${id}`;
    let styleEl: Ele;
    if (!$.exist(str)) {
        styleEl = $.create('style').id(id);
        $.query(document.head).append(styleEl);
    } else {
        styleEl = $.query(str);
    }
    styleEl.html(styleEl.html() + css);
}

function zipCss (css: string) {
    return css.replace(new RegExp('\\n *', 'g'), '').replace(new RegExp(' *\\{', 'g'), '{')
        .replace(new RegExp('\\/\\*(.|\\n)*?\\*\\/', 'g'), '')
        .trim();
}