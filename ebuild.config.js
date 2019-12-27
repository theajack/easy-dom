module.exports = {
    'tranToEs5InNpm': true, // wether use babel
    'packageFiles': [
        '../package.json'
        // config which package.json files need to modify version
        // '../npm/package.json', // this is an example
    ],
    'versioJsEs6Module': true, // use es6(export default) or require(module.exports=)
    'versioJsFiles': [
        // config which version.js files need to modify version
        // '../npm/version.js', // this is an example
    ],
    'libraryName': 'EasyDom', // cdn global name
    'cdnFileName': 'easydom',
    'version': '0.0.13',
    'npmExternals': {
        // example
        // 'md5': 'md5'
    },
    'npmPaths': [
        'npm'
    ]
};