/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 17:30:36
 * @Description: Coding something
 */

import { Ele, IJson, TEleCommon, TEasyDomUtil } from 'easy-dom-util';
import { ConfirmStyle, ConfirmType, ToastPosition } from './enum';

type TNoneArgFn = ()=>void;

type TUIEls = IJson<Ele> & {isOpen: boolean};

interface IOpenHide {
  onopen?: ((mask: Ele)=>void)|null;
  onhide?: TNoneArgFn|null;
}

export interface IConfirmDefault {
  (text: string | IConfirmOptions, title?: string, target?: IConfirm): Promise<TConfirmResult>;
  create(
    text: string | IConfirmOptions,
    title?: string,
    fn?: IConfirmDefault
  ): Promise<TConfirmResult>;
  close(target?: IConfirm): boolean;
  theme: ConfirmStyle;
  onOptions?: (options: IConfirmOptions)=>IConfirmOptions;
}
export interface IPopDefault extends IConfirmDefault {
  (text: TEleCommon | IConfirmOptions, title?: string, target?: IConfirm): Promise<TConfirmResult>;
}

export interface IConfirmOptions extends IOpenHide {
  parent?: TEleCommon,
  onGetCloseMethod?: (fn: TNoneArgFn) => void;
  type?: ConfirmType;
  theme?: ConfirmStyle;
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  cancelBtn?: boolean;
  confirmBtn?: boolean;
  closeBtn?: boolean;
  customClass?: string;
  customEl?: TEleCommon;
  contentHtml?: boolean;
  custom?: (el: Ele, $: TEasyDomUtil)=>void;
  clickConfirmClose?: boolean;
  clickCancelClose?: boolean;
  onconfirm?: TNoneArgFn;
  oncancel?: TNoneArgFn;
  onOptions?: (options: IConfirmOptions)=>void;
}

export interface IConfirm extends Required<IOpenHide> {
  el: TUIEls;
  lastParent: Ele;
  lastCustomed: boolean;
  _isDefault: boolean;
}

export type TConfirmResult = 'confirm' | 'close' | 'cancel';

export interface ILoading extends Required<IOpenHide> {
  el: TUIEls;
  timer: any;
  lastParent: Ele;
}


export interface ILoadingOptions extends IOpenHide {
  text?: string;
  parent?: TEleCommon,
  time?: number,
  backgroundOpacity?: number,
}

export interface ILoadingDefault {
  (text: string | ILoadingOptions, time?: number, target?: ILoading): Promise<TConfirmResult>;
  create(
    text: string | ILoadingOptions,
    time?: number,
    fn?: ILoadingDefault
  ): (()=>void);
  close(target?: ILoading): void;
}


export interface IToast extends ILoading {
  customClass: string;
}


export interface IToastOptions extends IOpenHide {
  text?: string;
  parent?: TEleCommon,
  time?: number,
  backgroundOpacity?: number,
  customClass?: string,
  contentHtml?: boolean;
  position?: ToastPosition;
  showClose?: boolean;
  button?: any;
}

export interface IToastDefault {
  (text: string | IToastOptions, time?: number, target?: IToast): Promise<TConfirmResult>;
  create(
    text: string | IToastOptions,
    time?: number,
    fn?: IToastDefault
  ): (()=>void);
  close(target?: IToast): void;
}