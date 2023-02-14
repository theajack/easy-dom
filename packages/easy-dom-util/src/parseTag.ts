/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 08:57:56
 * @Description: Coding something
 */

import { IJson, TTag } from './type';

interface IParseResult {
    tag: TTag,
    id?: string,
    cls?: string,
    attr?: IJson,
}

export default function parseTag (tag: string): IParseResult {
    const result: IParseResult = {
        tag: tag as any,
    };
    if (tag.match(/[#\.\[]/) === null) {
        return result;
    }
    // @ts-ignore
    result.tag = cut(tag.match(/^(\S*?)(#|\.|\[)/g)[0], 0);
    if (tag.indexOf('#') !== -1) {
        // @ts-ignore
        result.id = cut(tag.match(/(#)(\S*?)(\.|\[|$)/g)[0]);
    }
    if (tag.indexOf('.') !== -1) {
        // @ts-ignore
        result.cls = cut(tag.match(/(\.)(\S*?)(#|\[|$)/g)[0]).split('.')
            .join(' ')
            .trim();
    }
    if (tag.indexOf('[') !== -1) {
        result.attr = {};
        // @ts-ignore
        tag.match(/(\[)(\S*?)(\])/g).map(item => cut(item).split('='))
            .forEach((item) => {
                (result.attr as IJson)[item[0]] = item[1] || '';
            });
    }
    return result;
}

function cut (str: string, head = 1, tail = 1) {
    if ('.#[]'.indexOf(str[str.length - 1]) === -1) {
        tail = 0;
    }
    return str.substring(head, str.length - tail);
}