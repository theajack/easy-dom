/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 16:11:04
 * @Description: Coding something
 */

import _confirm from './confirm';
import { ConfirmStyle, ConfirmType } from './enum';
import { IConfirm, IConfirmDefault } from './type';

const alertInstance: IConfirm = { _isDefault: true } as IConfirm;

const alert = ((options, title, target = alertInstance) => {
    if (typeof options === 'string') {
        options = {
            text: options,
            title,
        };
    }
    options.cancelBtn = false;
    options.type = ConfirmType.Alert;
    if (!options.theme) options.theme = alert.theme; // 如果没有主题参数 则使用全局主题参数
    if (alert.onOptions) {
        options = alert.onOptions(options);
    }
    return _confirm(options, undefined, target);
}) as IConfirmDefault;
alert.theme = ConfirmStyle.Default;
alert.create = (text, title, fn = alert) => fn(text, title, {} as IConfirm);
alert.close = (target = alertInstance) => {
    return _confirm.close(target);
};
alert.onOptions = undefined;
export default alert;
