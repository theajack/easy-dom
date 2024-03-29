/*
 * @Author: tackchen
 * @Date: 2022-10-23 20:12:31
 * @Description: Coding something
 */
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import typescript from 'rollup-plugin-typescript2';
// import vuePlugin from 'rollup-plugin-vue';
// import yaml from '@rollup/plugin-yaml';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import json from '@rollup/plugin-json';
import path from 'path';

const {
    extrackSinglePackageInfo,
    resolvePacakgePath,
    buildPackageName,
} = require('./utils');

const dirName = process.env.PACKAGE_NAME;
const packageInfo = extrackSinglePackageInfo(dirName);
console.log(packageInfo.dependencies);

const extensions = [ '.ts', '.d.ts', '.js' ];

const map = {
    'easy-dom-util': 'EasyDom',
    'tacl-ui': 'TaclUI'
};

const inputFile = resolvePacakgePath(`${dirName}/src/index.ts`);
console.log(inputFile);

const packageName = buildPackageName(dirName);

const createBaseConfig = ({
    format = 'esm',
    bundleName,
    input = inputFile,
}) => {

    if (!bundleName) {
        bundleName = `${packageName}.${format === 'esm' ? 'esm' : 'min'}.js`;
    }

    return {
        input,
        output: {
            file: resolvePacakgePath(`${dirName}/dist/${bundleName}`),
            format,
            name: map[dirName],
            // sourcemap: true,
        },
        plugins: [
            uglify(),
            json(),
            commonjs(),
            // yaml(),
            // vuePlugin(),
            typescript(),
            nodeResolve({
                extensions,
            }),
            babel({
                exclude: [ 'node_modules/**' ],
                extensions,
                configFile: path.join(__dirname, './babel.config.js'),
            }),
        ],
    };
};

const config = [
    { // esm
        ...createBaseConfig({ format: 'esm' }),
        external: packageInfo.dependencies,
    },
    {
        ...createBaseConfig({
            format: 'iife',
            bundleName: '',
        }),
    },
    {
    // 生成 .d.ts 类型声明文件
        input: inputFile,
        output: {
            file: resolvePacakgePath(`${dirName}/dist/${packageName}.d.ts`),
            format: 'es',
        },
        plugins: [ dts(), json() ],
    },
];

export default config;


