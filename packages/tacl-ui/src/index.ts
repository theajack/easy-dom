/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 08:57:56
 * @Description: Coding something
 */
/** UI 库 */

import { initStylePool } from './style';
import easyDom from './easydom';
import _loading from './loading';
import _toast from './toast';
import _confirm from './confirm';
import _alert from './alert';
import _pop from './pop';
import Drag, { IDragOptions } from './drag';
import version from './version';

export const tool = easyDom;

export const loading = _loading;
export const toast = _toast;
export const confirm = _confirm;
export const alert = _alert;
export const pop = _pop;

export const drag = (opts: IDragOptions) => new Drag(opts);

initStylePool();

export default {
    tool,
    loading,
    toast,
    confirm,
    alert,
    drag,
    version,
};
