const fs = require('fs');

let defultConfig = require('../config/default');
let renderConfig = require('./render.config');


let dir = './template/';
let target = renderConfig.target;
let tpl = renderConfig.tpl;

function render () {
    formatDefaultConfig();

    target.forEach((targetName) => {
        let config = require(`../config/${targetName}.js`);
        config.data = checkAttribute(config, 'data');
        config.alias = checkAttribute(config, 'alias');

        let output = formatOutput(config.output || defultConfig.output);

        tpl.forEach((name) => {
            let template = readSync(`tpl/${name}`); // 模板文件
            let data = config.data[name] || defultConfig.data[name];
            let result = renderTemplate(template, data);
            output[name].forEach((path) => {
                writeSync(path, config.alias[name], result);
            });
        });
    });
}

function checkAttribute (config, attr) {
    let item = config[attr];
    let defItem = defultConfig[attr];
    if (isUdf(item)) {
        return defItem;
    } else {
        tpl.forEach(name => {
            if (isUdf(item[name])) {
                item[name] = isUdf(defItem[name]) ? {} : defItem[name];
            } else {
                for (let key in defItem[name]) {
                    if (isUdf(item[name][key])) {
                        item[name][key] = defItem[name][key];
                    }
                }
            }
        });
        return item;
    }
}

function isUdf (val) {
    return typeof val === 'undefined';
}

function readSync (file) { // file 基于 template 目录
    return fs.readFileSync(dir + file, {encoding: 'utf-8'});
};

function writeSync (path, file, content) {
    if (path[path.length - 1] !== '/') {
        path += '/';
    }
    fs.writeFileSync(path + file, content, 'utf8');
}

function renderTemplate (str, json) {
    for (var k in json) {
        str = str.replace(new RegExp('\\${' + k + '}', 'g'), json[k]);
    }
    return str;
}

function formatDefaultConfig () {
    defultConfig.output = formatOutput(defultConfig.output, true);
    if (isUdf(defultConfig.data)) {defultConfig.data = {};}
    if (isUdf(defultConfig.alias)) {defultConfig.alias = {};}

    tpl.forEach(name => {
        if (isUdf(defultConfig.data[name])) {
            defultConfig.data[name] = {};
        }
        if (isUdf(defultConfig.alias[name])) {
            defultConfig.alias[name] = name;
        }
    });
}


// 将output统一为 {a:[''],b:['']}的格式
function formatOutput (output, isDef) {
    let res = {};
    if (typeof output === 'string') {
        tpl.forEach(name => {
            res[name] = [output];
        });
    } else if (output instanceof Array) {
        tpl.forEach(name => {
            res[name] = output;
        });
    } else if (typeof output === 'object') {
        tpl.forEach(name => {
            if (typeof output[name] === 'string') {
                res[name] = [output[name]];
            } else if (output[name] instanceof Array) {
                res[name] = output[name];
            } else {
                if (isDef) {
                    res[name] = [];
                } else {
                    res[name] = defultConfig.output[name];
                }
            }
        });
    } else {
        if (isDef) {
            tpl.forEach(name => {
                res[name] = [];
            });
        } else {
            res = defultConfig.output;
        }
    }
    return res;
}

module.exports = render;