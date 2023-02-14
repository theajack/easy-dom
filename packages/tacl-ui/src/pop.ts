/*
 * @Author: tackchen
 * @Date: 2021-10-01 11:11:43
 * @LastEditors: Please set LastEditors
 * @FilePath: \gamematrix-h5-site\client\js-sdk\tacl-ui\src\pop.js
 * @Description: Coding something
 */

import { Ele } from 'easy-dom-util';
import _confirm from './confirm';
import { ConfirmStyle, ConfirmType } from './enum';
import { IConfirm, IPopDefault } from './type';
const popInstance: IConfirm = { _isDefault: true } as IConfirm;
const pop = ((options, title, target = popInstance) => {
    if (
        typeof options === 'string' // html text
        || options instanceof HTMLElement // dom
        || options instanceof Ele // tacl ele
    ) {
        options = {
            customEl: options,
            title,
        };
    }
    options.type = ConfirmType.Pop;
    if (!options.theme) options.theme = pop.theme; // 如果没有主题参数 则使用全局主题参数
    if (pop.onOptions) {
        options = pop.onOptions(options);
    }
    return _confirm(options, undefined, target);
}) as IPopDefault;
pop.theme = ConfirmStyle.Default;
pop.create = (text, title, fn = pop) => fn(text, title, {} as IConfirm);
pop.close = (target = popInstance) => {
    return _confirm.close(target);
};
pop.onOptions = undefined;

export default pop;
