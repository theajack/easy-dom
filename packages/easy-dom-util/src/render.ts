/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 16:11:04
 * @Description: Coding something
 */
// for Ele.render method

import { Ele } from './ele';
import { IJson } from './type';

export function render (this: Ele, {
    html,
    method = {},
    result
}: {
    html: string,
    method?: IJson<Function>,
    result?: (this: Ele, options: {el: Ele, method: IJson<Function>})=>void;
}) {
    this.html(zipHtml(html));
    const el: IJson<Ele> = {};
    if (typeof result === 'function') {
        const els = this.query('[\\@el]');
        if (els) {
            for (let i = 0; i < els.length; i++) {
                const item = els[i];
                el[item.attr('@el')] = item;
                item.attr('@el', null);
            }
            result.call({
                el: this,
                method,
            }, el);
        }
    }
    const list = this.query('[\\@event]');
    for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const res = buildEventResult(item);
        if (method[res.name]) {
            item.on(res.event as any, method[res.name].bind({
                el: this,
                bindEl: el,
                self: item,
                method,
                // event: res.event
            }, ...res.args));
        }
    }
    return this;
}

function buildEventResult (item: Ele) {
    const arr = item.attr('@event').split(':');
    item.attr('@event', null);
    let event = 'click', name, args = [];
    if (arr.length === 1) {
        name = arr[0];
    } else {
        event = arr[0];
        name = arr[1];
    }
    if (name.indexOf('(') !== -1) {
        const arg = name.match(/\(.*\)/);
        if (arg !== null) {
            let str = arg[0].replace(/'/g, '"');
            str = `[${str.substr(1, str.length - 2)}]`;
            args = JSON.parse(str);
        }
        name = name.substr(0, name.indexOf('('));
    }
    return {
        event,
        name,
        args
    };
}

function zipHtml (html: string) {
    return html.replace(new RegExp('\\n *', 'g'), '').replace(new RegExp('<!--(.|\\n)*?-->', 'g'), '')
        .trim();
}