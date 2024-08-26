import vnode from './vnode';
import createElement from './createElement';
import patchVnode from './patchVnode';

export default function (oldVnode, newVnode) {
    // 判断oldVnode是DOM节点还是虚拟节点
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        // 传入的第一个参数是DOM节点，包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    }
    // 判断oldVnode和newVnode是不是同一个节点
    if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
        patchVnode(oldVnode, newVnode);
    } else {
        let newVnodeElm = createElement(newVnode);
        if (oldVnode.elm.parentNode && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}