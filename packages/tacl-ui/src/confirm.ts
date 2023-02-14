/**
    confirm({
        content:'是否确认',
        title:'确认框',
        confirmText:'confirm',
        cancelText:'cancel',
        cancelBtn:false,// 是否需要取消按钮
        theme:'default', // gamer/yellow
    }).then((confirm)=>{
        if (confirm) {

        } else {

        }
    })
    confirm('是否确认')
    confirm('是否确认','确认框')
 */
import { IJson } from 'easy-dom-util';
import { ConfirmStyle, ConfirmType } from './enum';
import { $, reportStyle, initTaclUI } from './style';
import { IConfirm, IConfirmDefault, IConfirmOptions, TConfirmResult } from './type';

reportStyle(initStyle);

const prefix = 'g-confirm-';

const instance: IConfirm = {
    el: null,
    onhide: null,
    onopen: null,
    lastParent: null,
    lastCustomed: false,
    _isDefault: true
} as any;

function checkLastCustomed (target: IConfirm) {
    if (!target.lastCustomed || !target.el) {
        return;
    }
    target.el.mask.remove();
    // @ts-ignore
    target.el = null;
    target.lastCustomed = false;
}

const confirm = (function (text, title = '', target = instance): Promise<TConfirmResult> {
    if (target.onhide) {
        target.onhide();
    } // 关闭上一个
    target.onhide = null;
    target.onopen = null;
    return new Promise((resolve, reject) => {
        try {
            init(text, title, resolve, target);
        } catch (e) {
            reject(e);
        }
    });
}) as IConfirmDefault;
confirm.create = function (text: string|IConfirmOptions, title = '', fn = confirm) {
    return fn(text, title, {} as IConfirm);
};
confirm.close = close;
confirm.theme = ConfirmStyle.Default;
confirm.onOptions = undefined;

function initTarget (target: IConfirm, options: IConfirmOptions) {
    const parent = $.query((typeof options === 'object' && options.parent) ? options.parent : document.body);
    if (!target.el) {
        // @ts-ignore
        target.el = {};
        target.lastParent = parent;
        $.classPrefix(prefix);
        const mask = $.create().cls('mask');
        const box = $.create().cls('box');
        const title = $.create().cls('title');
        const content = $.create().cls('content');
        const btnw = $.create().cls('btn-w');
        const btnCancel = $.create().cls('btn');
        const btnConfirm = $.create().cls('btn confirm');
        const btnClose = $.create().cls('close')
            .text('✕');
        $.clearClassPrefix();
        initTaclUI(mask);

        parent.append(mask.append(box.append(title, content, btnw.append(btnCancel, btnConfirm), btnClose)));
        target.el.box = box;
        target.el.title = title;
        target.el.content = content;
        target.el.btnCancel = btnCancel;
        target.el.btnConfirm = btnConfirm;
        target.el.btnClose = btnClose;
        target.el.mask = mask;
    } else if (parent.el !== target.lastParent.el) {
        target.lastParent = parent;
        parent.append(target.el.mask);
    }
    target.onopen = options.onopen || null;
    target.onhide = options.onhide || null;
    if (options.onGetCloseMethod) { // 用来关闭new出来的confirm
        options.onGetCloseMethod(() => {
            close(target);
        });
    }
}

const DEFAULT_OPTIONS: IConfirmOptions = {
    title: '提示框',
    text: '是否确认该操作',
    confirmText: '确定',
    cancelText: '取消',
    cancelBtn: true,
    confirmBtn: true,
    closeBtn: true,
    theme: ConfirmStyle.Default,
    customClass: '',
    customEl: '',
    contentHtml: false,
    custom: undefined,
    type: ConfirmType.Confirm,
    onGetCloseMethod: undefined,
    clickConfirmClose: true,
    clickCancelClose: true,
    onconfirm: undefined,
    oncancel: undefined,
};

function initOptions (
    options: string|IConfirmOptions,
    title?: string
): IConfirmOptions {
    if (typeof options === 'string') {
        options = { title, text: options };
    }
    if (options.type === ConfirmType.Confirm) {
        if (!options.theme) options.theme = confirm.theme; // 如果没有主题参数 则使用全局主题参数
        if (confirm.onOptions) {
            options = confirm.onOptions(options);
        }
    }
    return Object.assign({}, DEFAULT_OPTIONS, options) as IConfirmOptions;
}

function initContent (target: IConfirm, options: IConfirmOptions) {
    target.el.content.empty();
    if (options.customEl) {
        target.lastCustomed = true;
        if (typeof options.customEl === 'string') {
            target.el.content.html(options.customEl);
        } else {
            target.el.content.append($.query(options.customEl));
        }
    } else {
        target.el.content[options.contentHtml ? 'html' : 'text'](options.text || '');
    }
}

function init (
    origin: string|IConfirmOptions,
    title: string,
    resolve: (result: TConfirmResult)=>void,
    target: IConfirm,
) {
    checkLastCustomed(target);

    const options = initOptions(origin, title) as Required<IConfirmOptions>;

    initTarget(target, options);

    target.el.box.cls(`${prefix}box ${prefix}type-${options.type}`);

    target.el.title.text(options.title);

    initContent(target, options);

    if (options.customClass) {
        target.lastCustomed = true;
        target.el.box.addClass(options.customClass);
    }
    target.el.btnConfirm.text(options.confirmText);
    target.el.btnCancel.text(options.cancelText);
    target.el.btnCancel.style('display', options.cancelBtn ? 'block' : 'none');
    target.el.btnConfirm.style('display', options.confirmBtn ? 'block' : 'none');
    target.el.btnClose.style('display', options.closeBtn ? 'block' : 'none');
    target.el.btnCancel.el.onclick = () => {
        resolve('cancel');
        if (options.clickCancelClose) close(target);
        if (options.oncancel) options.oncancel();
    };
    target.el.btnConfirm.el.onclick = () => {
        resolve('confirm');
        if (options.clickConfirmClose) close(target);
        if (options.onconfirm) options.onconfirm();
    };
    target.el.btnClose.el.onclick = () => {
        resolve('close'); close(target);
    };

    target.el.box.addClass(`${prefix}${options.theme}`);

    if (options.custom) {
        target.lastCustomed = true;
        options.custom(target.el.box, $);
    }
    open(target);
}

function open (target: IConfirm) {
    target.el.isOpen = true;
    target.el.mask.style('display', 'block');
    window.setTimeout(() => {
        console.log(target.el.mask);
        target.el.mask.addClass(`${prefix}open`);
        if (target.onopen) {
            const _onopen = target.onopen;
            target.onopen = null;
            _onopen(target.el.mask);
        }
    }, 20);
}
function close (target = instance) {
    if (target.el && target.el.isOpen) {
        target.el.isOpen = false;
        target.el.mask.rmClass(`${prefix}open`);
        window.setTimeout(() => {
            if (target.onhide) {
                const _onhide = target.onhide;
                target.onhide = null;
                _onhide();
            }
            if (target._isDefault) {
                target.el.mask.style('display', 'none');
            } else {
                target.el.mask.remove();
            }
        }, 350);
        return true;
    }
    return false;
}

function initStyle (common: IJson<any>) {
    return /* css*/`
        .g-confirm-mask {
            ${common.piece.mask}
        }
        .g-confirm-mask.g-confirm-open {
            background-color:rgba(0,0,0,.4);
        }
        .g-confirm-box {
            width:80%;
            background-color:#fff;
            position:absolute;
            left:50%;
            transform:translate(-50%,-50%);
            border-radius:3px;
            box-sizing:border-box;
            opacity:0;
            top:55%;
            transition:all .3s ease;
            max-width: 320px;
        }
        .g-confirm-mask.g-confirm-open .g-confirm-box {
            opacity:1;
            top:50%;
        }
        .g-confirm-title {
            font-size:18px;
            text-align:center;
            font-weight:bold;
            margin-top:15px;
        }
        .g-confirm-content {
            padding:15px;
            font-size:18px;
            line-height:25px;
            text-align:center;
            color:#888;
            ${common.piece.overScroll}
        }
        .g-confirm-content::-webkit-scrollbar {
            width:5px;
            cursor: pointer;
            height: 5px;
        }
        .g-confirm-content::-webkit-scrollbar-button    {
            display: none;
        }
        .g-confirm-content::-webkit-scrollbar-track     {
            display: none;
        }
        .g-confirm-content::-webkit-scrollbar-track-piece {
            background-color:#88888811;
        }
        .g-confirm-content::-webkit-scrollbar-thumb{
            background-color: #666;
            border-radius: 3px;
            cursor: pointer;
        }
        .g-confirm-content::-webkit-scrollbar-thumb:hover{
            background-color:#aaa;
            cursor: pointer;
        }
        .g-confirm-btn-w {
            display:flex;
            border-top:1px solid #eee;
            justify-content: center;
        }
        .g-confirm-btn {
            flex:1;
            text-align:center;
            padding:12px;
            cursor:pointer;
        }
        .g-confirm-btn{
            border-right:1px solid #eee;
        }
        .g-confirm-confirm {
            color:#5185d5;
            border-right:none;
        }
        .g-confirm-close{
            position: absolute;
            right: 10px;
            top: 6px;
            font-size: 17px;
            color: #888;
            cursor: pointer;
        }
        .g-confirm-box.g-confirm-yellow, .g-confirm-box.g-confirm-gamer{
            padding: 20px;
            width: 90%;
        }
        .g-confirm-yellow .g-confirm-btn-w, .g-confirm-gamer .g-confirm-btn-w{
            border: none;
        }
        .g-confirm-yellow .g-confirm-btn, .g-confirm-gamer .g-confirm-btn{
            border: 1px solid #bbb;
            color: #bbb;
            padding: 6px;
            margin: 0 20px;
            border-radius: 20px;
            max-width: 120px;
        }
        .g-confirm-yellow .g-confirm-confirm{
            border: 1px solid rgb(255,223,83);
            background-color: rgb(255,223,83);
            color: #555;
        }
        .g-confirm-box.g-confirm-gamer{
            background-image: linear-gradient(to bottom, #2c2c3e, #373d5a);
            color: #fff;
            border-radius: 5px;
            border: 1px solid #535b82;
        }
        .g-confirm-gamer .g-confirm-btn-w{
            border: none;
        }
        .g-confirm-gamer .g-confirm-btn{
            color: #fff;
            border: 1px solid #f97728;
        }
        .g-confirm-gamer .g-confirm-confirm{
            border: none;
            background-image: linear-gradient(to right, #e95a04, #f97728);
        }
        .g-confirm-gamer .g-confirm-close{
            font-size: 20px;
        }
        .g-confirm-gamer .g-confirm-title{
            display: none;
        }
        .g-confirm-gamer.g-confirm-type-pop .g-confirm-title{
            display: block;
        }
        .g-confirm-gamer .g-confirm-content{
            padding: 30px 15px;
            color: #fff;
        }`;
}

export default confirm;

