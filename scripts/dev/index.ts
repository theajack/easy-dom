/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 16:11:04
 * @Description: Coding something
 */

import $ from 'packages/easy-dom-util';
import { toast, loading, confirm, alert, pop } from 'packages/tacl-ui';

const txt = $.create('div').text(11).mounted(el => {
    console.log(el, 'mounted');
}).mount().text();

console.log(txt);

$.create('button').text('toast').click((e, el) => {
    console.log(e, el);
    toast('111');
}).mount();

$.create('button').text('loading').click((e, el) => {
    console.log(e, el);
    loading('111');
}).mount();

$.create('button').text('confirm').click((e, el) => {
    console.log(e, el);
    confirm('111');
}).mount();

$.create('button').text('alert').click((e, el) => {
    console.log(e, el);
    alert('111');
}).mount();

$.create('button').text('pop').click((e, el) => {
    console.log(e, el);
    pop('111');
}).mount();
