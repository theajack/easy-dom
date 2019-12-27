let version = require('../../ebuild.config').version;

module.exports = {
    data: {
        // template
        'README.md': {
            head: '',
            gitRepo: 'https://github.com/theajack/easy-dom',
            intro: 'Easy-Dom 便捷操作dom的js库',
            npm: 'npm',
            install: 'easy-dom',
            script: 'https://www.theajack.com/cnchar/cdn/easydom.latest.min.js',
        },
        'LICENSE': {
            author: 'theajack'
        },
        'package.json': {
            author: 'theajack',
            name: 'easy-dom',
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