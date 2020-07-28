
export default function parseTag (tag) {
    if (tag.match(/[#\.\[]/) === null) {
        return {tag};
    }
    let res = {};
    res.tag = cut(tag.match(/^(\S*?)(#|\.|\[)/g)[0], 0);
    if (tag.indexOf('#') !== -1) {
        res.id = cut(tag.match(/(#)(\S*?)(\.|\[|$)/g)[0]);
    }
    if (tag.indexOf('.') !== -1) {
        res.cls = cut(tag.match(/(\.)(\S*?)(#|\[|$)/g)[0]).split('.').join(' ').trim();
    }
    if (tag.indexOf('[') !== -1) {
        res.attr = {};
        tag.match(/(\[)(\S*?)(\])/g).map((item) => {
            return cut(item).split('=');
        }).forEach(item => {
            res.attr[item[0]] = item[1] || '';
        });
    }
    return res;
}

function cut (str, head = 1, tail = 1) {
    if ('.#[]'.indexOf(str[str.length - 1]) === -1) {
        tail = 0;
    }
    return str.substring(head, str.length - tail);
}