module.exports = {
    data: {
        // template
        'README.md': {
            gitRepo: 'https://github.com/theajack/easy-dom',
            intro: 'Easy-Dom 便捷操作dom的js库',
            npm: 'npm',
            install: 'easy-dom-uti',
            script: 'https://www.theajack.com/easy-dom/cdn/easydom.latest.min.js',
        },
        'LICENSE': {
            author: 'theajack'
        }
    },
    output: {
        'README.md': ['./', './npm/'],
        'LICENSE': ['./', './npm/'],
        'package.json': './npm/',
        'version.js': './npm/'
    }
};