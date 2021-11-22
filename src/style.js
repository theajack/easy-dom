/* 添加style样式*/
import $ from '.';

const commonStyle = {

};

let stylePool = {};

export function addCommonStyle (name, value) {
    if (typeof name === 'object') {
        for (const k in name) {
            addCommonStyle(k, name[k]);
        }
        return;
    }

    if (typeof commonStyle[name] === 'undefined') {
        commonStyle[name] = value;
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

export function reportStyle ({
    func,
    id = 'el-style',
    pool = false
}) {
    if (typeof func === 'function' && func.hasReport) {
        return;
    }
    if (pool) {
        const css = func(commonStyle);
        func.hasReport = true;
        if (stylePool[id]) {
            stylePool[id] += css;
        } else {
            stylePool[id] = css;
        }
        return;
    }
    let css = '';
    if (typeof func === 'string') {
        css = func;
    } else {
        func.hasReport = true;
        css = func(commonStyle);
    }
    css = zipCss(css);
    let styleEl = $.query(`#${id}`);
    if (!styleEl) {
        styleEl = $.create('style').id(id);
        $.query(document.head).append(styleEl);
    }
    styleEl.html(styleEl.html() + css);
}

function zipCss (css) {
    return css.replace(new RegExp('\\n *', 'g'), '').replace(new RegExp(' *\\{', 'g'), '{')
        .replace(new RegExp('\\/\\*(.|\\n)*?\\*\\/', 'g'), '')
        .trim();
}