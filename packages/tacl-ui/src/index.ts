/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 08:57:56
 * @Description: Coding something
 */
/** UI 库 */

import { initStylePool } from './style';
import { dom, tool } from './easydom';
import loading from './loading';
import toast from './toast';
import confirm from './confirm';
import alert from './alert';
import pop from './pop';
import Drag, { IDragOptions } from './drag';
import version from './version';
import * as Enums from './enum';
export * from './enum';

export const drag = (opts: IDragOptions) => new Drag(opts);

initStylePool();

export {
    tool,
    dom,
    loading,
    toast,
    confirm,
    alert,
    pop,
    version,
};

export default {
    tool,
    loading,
    toast,
    confirm,
    alert,
    pop,
    drag,
    version,
    ...Enums,
};
