const tnpm = true;

let target = ['npm'];
if (tnpm) target.push('tnpm');

module.exports = {
    target,
    tpl: [
        'README.md',
        'LICENSE',
        'package.json',
        'version.js'
    ]
};