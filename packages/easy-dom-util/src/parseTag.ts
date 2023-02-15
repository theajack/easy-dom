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
    if (tag.indexOf('[') !== -1) {
        result.attr = {};
        // ! 先把attr全部替换掉 不然中括号中的 特殊字符会影响其他类型
        tag = tag.replace(/(\[)(\S*?)(\])/g, (str) => {
            const arr = cut(str).split('=');
            (result.attr as IJson)[arr[0]] = arr[1] || '';
            return '';
        });
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
    return result;
}

function cut (str: string, head = 1, tail = 1) {
    if ('.#[]'.indexOf(str[str.length - 1]) === -1) {
        tail = 0;
    }
    return str.substring(head, str.length - tail);
}