// for Ele.render method

export function render ({
    html,
    method = {},
    result = null
}) {
    this.html(zipHtml(html));
    let el = {};
    if (typeof result === 'function') {
        let els = this.query('[\\@el]');
        for (let i = 0; i < els.length; i++) {
            let item = els[i];
            el[item.attr('@el')] = item;
            item.attr('@el', null);
        }
        result.call({
            el: this,
            method,
        }, el);
    }
    let list = this.query('[\\@event]');
    for (let i = 0; i < list.length; i++) {
        let item = list[i];
        let res = buildEventResult(item);
        if (method[res.name]) {
            item.on(res.event, method[res.name].bind({
                el: this,
                bindEl: el,
                self: item,
                method,
                // event: res.event
            }, ...res.args));
        }
    }
    return this;
}

function buildEventResult (item) {
    let arr = item.attr('@event').split(':');
    item.attr('@event', null);
    let event = 'click', name, args = [];
    if (arr.length === 1) {
        name = arr[0];
    } else {
        event = arr[0];
        name = arr[1];
    }
    if (name.indexOf('(') !== -1) {
        let arg = name.match(/\(.*\)/);
        if (arg !== null) {
            let str = arg[0].replace(/'/g, '"');
            str = `[${str.substr(1, str.length - 2)}]`;
            args = JSON.parse(str);
        }
        name = name.substr(0, name.indexOf('('));

    }
    return {
        event,
        name,
        args
    };
}

function zipHtml (html) {
    return html.replace(new RegExp('\\n *', 'g'), '').replace(new RegExp('<!--(.|\\n)*?-->', 'g'), '').trim();
}