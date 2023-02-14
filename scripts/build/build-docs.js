/*
 * @Author: chenzhongsheng
 * @Date: 2023-02-14 23:56:15
 * @Description: Coding something
 */
const fs = require('fs');
const { resolveRootPath } = require('./utils');

if (!fs.existsSync(resolveRootPath('docs'))) {
    fs.mkdirSync(resolveRootPath('docs'));
}

fs.copyFileSync(
    resolveRootPath('README.md'),
    resolveRootPath('docs/README.md')
);