/*
 * @Author: tackchen
 * @Date: 2021-10-01 11:11:43
 * @LastEditors: tackchen
 * @FilePath: \gamematrix-h5-site\client\js-sdk\tacl-ui\src\pop.js
 * @Description: Coding something
 */

import _confirm from './confirm';
import {CONFIRM_STYLE, CONFIRM_TYPE} from './constant';
const popInstance = {};
const pop = (options, title, target = popInstance) => {
    if (
        typeof options === 'string' // html text
        || options instanceof HTMLElement // dom
        || options.constructor.name === 'Ele' // tacl ele
    ) {
        options = {
            customEl: options,
            title,
        };
    }
    options.type = CONFIRM_TYPE.POP;
    if (!options.theme) options.theme = pop.theme; // 如果没有主题参数 则使用全局主题参数
    if (pop.onOptions) {
        options = pop.onOptions(options);
    }
    return _confirm(options, undefined, target);
};
pop.theme = CONFIRM_STYLE.DEFAULT;
pop.new = (text, title, fn = pop) => fn(text, title, {});
pop.close = (target = popInstance) => {
    _confirm.close(target);
};
pop.onOptions = null;

export default pop;
