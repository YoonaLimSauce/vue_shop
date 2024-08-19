import vnode from './vnode';

export default function (sel, data, c) {
    if (arguments.length !== 3) {
        throw new Error('h() requires exactly three arguments');
    }
    if (typeof c === 'string' || typeof c === 'number') {
        return vnode(sel, data, undefined, c, undefined);
    } else if (Array.isArray(c)) {
        let children = [];
        for (let i = 0; i < c.length; i++) {
            if (typeof c[i] !== 'object' || !c[i].hasOwnProperty('sel')) {
                throw new Error('The children of a vnode must be vnodes');
            }
            children.push(c[i]);
        }
        return vnode(sel, data, children, undefined, undefined);
    } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
        let children = [c];
        return vnode(sel, data, children, undefined, undefined);
    } else {
        throw new Error('The third argument of h() must be a string, an array or an object');
    }
}