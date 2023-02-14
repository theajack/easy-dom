/** UI 库 */

import {initStylePool} from './style';
import easyDom from './easydom';
import _loading from './loading';
import _toast from './toast';
import _confirm from './confirm';
import _alert from './alert';
import _pop from './pop';
import Drag from './drag';
import version from './version';

export const tool = easyDom;

export const loading = _loading;
export const toast = _toast;
export const confirm = _confirm;
export const alert = _alert;
export const pop = _pop;

export const drag = opts => new Drag(opts);

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
