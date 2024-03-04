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


type TCssCommonValue = 'inherit' | 'initial' | 'unset' | 'revert' | 'none' | 'auto';

interface IOptionStyle {
        // optional string style
    textDecoration: 'blink'|'dashed'|'dotted'|'double'|'line-through'|'overline'|'solid'|'underline'|'wavy'|TCssCommonValue;
    position: 'relative' | 'absolute' | 'fixed' | 'sticky' | 'static' | TCssCommonValue;
    alignItems: 'stretch'|'center'|'flex-start'|'flex-end'|'baseline'|TCssCommonValue;
    justifyContent: 'flex-start'|'flex-end'|'center'|'space-between'|'space-evenly'|'space-around'|TCssCommonValue;
    display: 'none'|'flex'|'block'|'inline'|'inline-block'|'list-item'|'run-in'|'compact'|'marker'|'table'|'inline-table'|'table-row-group'|'table-header-group'|'table-footer-group'|'table-row'|'table-column-group'|'table-column'|'table-cell'|'table-caption'|TCssCommonValue;
    alignContent: 'stretch'|'center'|'flex-start'|'flex-end'|'space-between'|'space-around'|TCssCommonValue;
    backgroundAttachment: 'scroll'|'fixed'|'local'|TCssCommonValue;
    backgroundBlendMode: 'normal'|'multiply'|'screen'|'overlay'|'darken'|'lighten'|'color-dodge'|'saturation'|'color'|'luminosity'|TCssCommonValue;
    backgroundClip: 'border-box'|'padding-box'|'content-box'|TCssCommonValue;
    backgroundOrigin: 'border-box'|'padding-box'|'content-box'|TCssCommonValue;
    backgroundRepeat: 'repeat'|'repeat-x'|'repeat-y'|'no-repeat'|TCssCommonValue;
    boxSizing: 'content-box'|'border-box'|'inherit';
    clear: 'left'|'right'|'both'|'none'|'inherit';
    textAlign: 'auto'|'left'|'right'|'center'|'justify'|'start'|'end'|TCssCommonValue;
    wordWrap: 'normal'|'break-word'|'break-all';
    whiteSpace: 'normal'|'pre'|'nowrap'|'pre-wrap'|'pre-line'|'inherit';
    wordBreak: 'normal'|'break-word'|'break-all'|'keep-all';
    wordSpacing: 'normal'|'length'|'inherit';
    verticalAlign: 'baseline'|'sub'|'super'|'top'|'text-top'|'middle'|'bottom'|'text-bottom'|'length'|'%'|'inherit';
    fontStyle: 'normal'|'italic'|'oblique'|'inherit';
    flexDirection: 'row'|'row-reverse'|'column'|'column-reverse'|'initial'|'inherit';
    flexWrap: 'nowrap'|'wrap'|'wrap-reverse'|'initial'|'inherit';
    resize: 'none'|'both'|'horizontal'|'vertical';
    textOverflow: 'clip'|'ellipsis'|'string'|'initial'|'inherit';
    float: 'left'|'right'|'none'|'inherit';
    visibility: 'visible'|'hidden'|'collapse'|'inherit';
    overflow: 'visible'|'hidden'|'scroll'|'auto'|'inherit';
    overflowX: 'visible'|'hidden'|'scroll'|'auto'|'inherit';
    overflowY: 'visible'|'hidden'|'scroll'|'auto'|'inherit';
    cursor: 'auto'|'crosshair'|'pointer'|'move'|'e-resize'|'ne-resize'|'nw-resize'|'n-resize'|'se-resize'|'sw-resize'|'s-resize'|'w-resize'|'text'|'wait'|'help';
}

type INumberStyleEnum = 'paddingTop'| 'paddingBottom'| 'paddingLeft'| 'paddingRight'| 'marginTop'| 'marginBottom'| 'marginLeft'| 'marginRight'| 'fontSize'| 'lineHeight'| 'top'| 'left'| 'bottom'| 'right'| 'borderRadius'| 'textIndent'|
    // TNumberAutoStyle
    'width'| 'maxWidth'| 'minWidth'| 'height'| 'maxHeight'| 'minHeight'| 'flexBasis'|
    // pure number style
    'opacity'| 'zIndex'| 'flex'| 'flexGrow'| 'flexShrink'|        // fournumber style
    'margin'| 'padding' |
    'borderWidth' | 'borderTopWidth' | 'borderBottomWidth' | 'borderLeftWidth' | 'borderRightWidth';

type INumberStyle = {
    [prop in INumberStyleEnum]: string|number;
}

export type IStyle = Partial<
    Pick<CSSStyleDeclaration, Exclude<keyof CSSStyleDeclaration, INumberStyleEnum>> &
    IOptionStyle & INumberStyle
>;

export type IStyleKey = keyof IStyle;

export function parseStyleKey (key: string) {
    const n = key.length;
    let newKey = '';
    for (let i = 0; i < n; i++) {
        const c = key[i];
        const code = c.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            newKey += '-' + c.toLowerCase();
        } else {
            newKey += c;
        }
    }
    return newKey;
}