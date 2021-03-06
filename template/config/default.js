let version = require('../../ebuild.config').version;

module.exports = {
    data: {
        // template
        'README.md': {
            gitRepo: 'https://github.com/theajack/easy-dom',
            intro: 'Easy-Dom 便捷操作dom的js库',
            npm: 'npm',
            install: 'easy-dom-util',
            script: 'https://www.theajack.com/cnchar/cdn/easydom.latest.min.js',
        },
        'LICENSE': {
            author: 'theajack'
        },
        'package.json': {
            author: 'theajack',
            name: 'easy-dom-util',
            version,
        },
        'version.js': {
            version,
        }
    },
    output: './npm/'
};

/**
 * output: 'xxx',
 * output: ['','','']
 * output: {a:'',b:''}
 * output: {a:['','',''],b:''}
 */