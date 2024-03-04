/*
 * @Author: chenzhongsheng
 * @Date: 2024-03-04 17:50:38
 * @Description: Coding something
 */

import { Ele, create } from './ele';

export const DomNames = [
    'a', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'canvas', 'code', 'pre', 'table', 'th', 'td', 'tr', 'video', 'audio',
    'ol', 'select', 'option', 'p', 'i', 'iframe', 'img', 'input', 'label', 'ul', 'li', 'span', 'textarea', 'form', 'br', 'tbody',
    'abbr', 'article', 'aside', 'b', 'base', 'bdi', 'bdo', 'blockquote', 'caption', 'cite', 'del', 'details', 'dialog',
    'em', 'embed', 'figure', 'footer', 'header', 'hr', 'menu', 'nav', 'noscript',
    'object', 'progress', 'section', 'slot', 'small', 'strong', 'sub', 'summary', 'sup', 'template',
    'title', 'var',
    'style', 'meta', 'head', 'link'
] as const;

export type TDomName = (typeof DomNames)[number];

export interface IDom {
    (name: TDomName): Ele;
    (name: string): Ele;
}

export type IDoms = {
    [tagName in TDomName]: Ele;
}

// @ts-ignore
export const dom: IDom & IDoms = (() => {
    const builder = (name: string) => create(name);
    const pps: any = {};
    DomNames.forEach(name => {
        pps[name] = {
            get: () => create(name)
        };
    });
    Object.defineProperties(builder, pps);
    return builder;
})();


