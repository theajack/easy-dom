const common = {

};
const piece = {
    mask: /* css*/`
        position:fixed;
        z-index:10000;
        background-color:rgba(0,0,0,0);
        width:100%;
        height:100%;
        top:0;
        left:0;
        font-size:16px;
        transition:background-color .3s ease;
    `,
    centerWrapper: /* css*/`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;
        background-color: rgba(0,0,0,.6);
        border-radius: 5px;
        text-align: center;
        max-width: 50%;
        color:#fff;
    `,
    overScroll: /* css*/`
        word-break: break-all;
        max-height: 300px;
        overflow: auto;
        margin: 10px 0;
    `,
};
export default {
    common,
    piece,
};
