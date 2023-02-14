import {Ele, ToolStatic} from 'easy-dom-util';

export const tool: ToolStatic;

declare type DomEle = Ele | HTMLElement | string;
declare interface ToasterOpts {
    text?: string;
    time?: number;
    position?: 'top'|'middle'|'bottom';
    parent?: DomEle;
    onhide?(): void;
    onopen?(): void;
    contentHtml?: boolean;
    showClose?: boolean;
    customClass?: string;
    button?: { // 增加一个小按钮
        text: string;
        onclick(): void;
    }
}

export interface ToastStatic {
    (opts?: ToasterOpts): void;
    (text?: string, time?: number, position?: 'top'|'middle'|'bottom'): void;
    'new'(opts?: ToasterOpts): Function;
    'new'(text?: string, time?: number, position?: 'top'|'middle'|'bottom'): Function;
    close(): boolean;
}

export const toast: ToastStatic;

declare type confirmResultType = 'confirm' | 'cancel' | 'close';

declare type confirmType = 'confirm' | 'alert' | 'pop';

declare type confirmStyle = 'yellow2' | 'yellow' | 'default';

declare interface ConfirmerOpts {
    text?:string;
    title?:string;
    confirmText?:string;
    cancelText?:string;
    cancelBtn?:boolean;
    closeBtn?:boolean;
    parent?: DomEle;
    theme?: confirmStyle;
    onhide?(): void;
    onopen?(): void;
    customEl?: DomEle;
    customClass?: string;
    contentHtml?: boolean; // default false
    custom?(box: Ele, $: ToolStatic): void;
    type?: confirmType; // default confirmType.confirm
    onGetCloseMethod?(fn: void): void;
    clickConfirmClose?: boolean; // default true
    clickCancelClose?: boolean; // default true
    onconfirm?(): void;
    oncancel?(): void;
}

export interface ConfirmStatic {
    (opts?: ConfirmerOpts): Promise<confirmResultType>;
    (text?: string, title?:string): Promise<confirmResultType>;
    close(): boolean;
    'new'(opts?: ConfirmerOpts): Promise<confirmResultType>;
    'new'(text?: string, title?:string): Promise<confirmResultType>;
    onOptions?(opt: ConfirmerOpts): ConfirmerOpts;
    theme: confirmStyle;
}

export const confirm: ConfirmStatic;

export interface AlertStatic {
    (opts?: ConfirmerOpts): Promise<confirmResultType>;
    (text?:string, title?:string): Promise<confirmResultType>;
    close(): boolean;
    'new'(opts?: ConfirmerOpts): Promise<confirmResultType>;
    'new'(text?: string, title?:string): Promise<confirmResultType>;
    onOptions?(opt: ConfirmerOpts): ConfirmerOpts;
    theme: confirmStyle;
}

export const alert: AlertStatic;

export interface PopStatic {
    (opts?: ConfirmerOpts): Promise<confirmResultType>;
    (customEl?:string|HTMLElement|Ele, title?:string): Promise<confirmResultType>;
    close(): boolean;
    'new'(opts?: ConfirmerOpts): Promise<confirmResultType>;
    'new'(text?: string, title?:string): Promise<confirmResultType>;
    onOptions?(opt: ConfirmerOpts): ConfirmerOpts;
    theme: confirmStyle;
}

export const pop: PopStatic;

declare interface LoadingerOpts {
    text?:string;
    time?:number|null;
    parent?: DomEle;
    onhide?(): void;
}

export interface LoadingStatic {
    (opts?: LoadingerOpts): void;
    (text?:string, time?:string|null): void;
    'new'(opts?: LoadingerOpts): Function;
    'new'(text?:string, time?:string|null): Function;
    close(): void;
}

export const loading: LoadingStatic;

declare interface LoadingerOpts {
    text?:string;
    time?:number|null;
    parent?: DomEle;
    backgroundOpacity?: number;
    onopen?(): void;
    onhide?(): void;
}

declare interface DragParameters {
    el: Ele|HTMLElement|string;
    parent?: Ele|HTMLElement|string;
    onClick?: (event: Event, endX: number, endY: number) => {};
    onSideChange?: (isLeft:boolean) => {};
    zIndex?: number;
    enableDrag?:boolean;
    delay?:number;
    aside?:boolean;
    preventDefault?:boolean;
    reinitPosition?:boolean;
    margin?:number|Array<number>;
    onDragStart?: (event: Event, x: number, y: number) => {};
    onDragMove?: (event: Event, x: number, y: number) => {};
    onDragEnd?: (event: Event, x: number, y: number) => {};
}

declare class Drag {
    constructor(parameters: DragParameters);
    setPosition(left: number, top: number): void;
    initPosition(): void;
    getParentSize(): {width: number, height: number};
    aside: boolean;
    sideLeft: boolean;
    enableDrag: boolean;
    preventDefault: boolean;
    left: number|string;
    top: number|string;
    margin: Array<number>;
}

export interface DragStatic {
    (opts: DragParameters): Drag;
}

export const drag: DragStatic;

export interface TaclUIStatic {
    tool: ToolStatic;
    loading: LoadingStatic;
    toast: ToastStatic;
    confirm: ConfirmStatic;
    alert: AlertStatic;
    pop: PopStatic;
    drag: DragStatic;
    version: string;
}

declare const TaclUI: TaclUIStatic;

export default TaclUI;