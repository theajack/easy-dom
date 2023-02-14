
import _confirm from './confirm';
import {CONFIRM_STYLE, CONFIRM_TYPE} from './constant';
const alertInstance = {};
const alert = (options, title, target = alertInstance) => {
    if (typeof options === 'string') {
        options = {
            text: options,
            title,
        };
    }
    options.cancelBtn = false;
    options.type = CONFIRM_TYPE.ALERT;
    if (!options.theme) options.theme = alert.theme; // 如果没有主题参数 则使用全局主题参数
    if (alert.onOptions) {
        options = alert.onOptions(options);
    }
    return _confirm(options, undefined, target);
};
alert.theme = CONFIRM_STYLE.DEFAULT;
alert.new = (text, title, fn = alert) => fn(text, title, {});
alert.close = (target = alertInstance) => {
    _confirm.close(target);
};
alert.onOptions = null;

export default alert;
