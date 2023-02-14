/*
 * @Author: tackchen
 * @Date: 2021-11-11 17:09:24
 * @LastEditors: tackchen
 * @FilePath: \easy-dom\src\class-prefix.js
 * @Description: Coding something
 */

const classPrefixStack = [];

export function classPrefix (pf = '', func) {
    classPrefixStack.push(pf);
    if (typeof func === 'function') {
        func(clearClassPrefix);
        clearClassPrefix();
    }
}
export function clearClassPrefix () {
    classPrefixStack.pop();
}

export function getClassPrefix () {
    return classPrefixStack.length === 0 ? '' : classPrefixStack[classPrefixStack.length - 1];
}

export function checkPrefix (cls, withPrefix = true) {
    if (!withPrefix) {
        return cls;
    }
    return getClassPrefix() + cls;
}