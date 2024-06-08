/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 16:11:04
 * @Description: Coding something
 */

import { query, create } from 'packages/easy-dom-util';
import { dom } from 'packages/easy-dom-util/src/dom';
import { collectRef } from 'packages/easy-dom-util/src/ele';
import { toast, loading, confirm, alert, pop, drag } from 'packages/tacl-ui';

const txt = create('div[src=111.11].aa#a-1').text(11).mounted(el => {
    console.log(el, 'mounted');
}).mount().text('');

console.log(txt);

create('button').text('toast').click((e, el) => {
    console.log(e, el);
    toast('111');
}).mount();

create('button').text('loading').click((e, el) => {
    console.log(e, el);
    loading('111');
}).mount();

create('button').text('confirm').click((e, el) => {
    console.log(e, el);
    confirm('111');
}).mount();

create('button').text('alert').click((e, el) => {
    console.log(e, el);
    alert('111');
}).mount();

create('button').text('pop').click((e, el) => {
    console.log(e, el);
    pop('111');
}).mount();

create('button');

dom.div.text('');

function List () {
    const list = [ 1, 2, 3 ];
    const refs = collectRef('list');

    const singleItem = (v: number) => {
        return dom.div.text(v);
    };

    return dom.div.class('aa')
        .ref(refs.list)
        .text('xx')
        .children(
            dom.button.text('add').click(() => {
                const v = 11;
                list.push(v);
                refs.list.append(singleItem(v));
            }),
            list.map(v => singleItem(v))
        );
}
query('body').append(List());

query('body').append(
    create('div').style({
        width: '20px',
        height: '20px',
        backgroundColor: '#222'
    }).sizeReady((el, size) => {
        console.log(size);
        drag({ el });
    })
);
