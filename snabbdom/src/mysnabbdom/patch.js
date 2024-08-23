import vnode from './vnode';
import createElement from './createElement';

export default function (oldVnode, newVnode) {
    // 判断oldVnode是DOM节点还是虚拟节点
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        // 传入的第一个参数是DOM节点，包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    }
    // 判断oldVnode和newVnode是不是同一个节点
    if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
        if (oldVnode !== newVnode) {
            if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
                oldVnode.elm.innerText = newVnode.text;
            } else if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
                console.log('递归处理子节点');
            } else {
                oldVnode.elm.innerText = '';
                for (let i = 0; i < newVnode.children.length; i++) {
                    let childDomNode = createElement(newVnode.children[i]);
                    oldVnode.elm.appendChild(childDomNode);
                }
            }
        }
    } else {
        let newVnodeElm = createElement(newVnode);
        if (oldVnode.elm.parentNode && newVnodeElm) {
            oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);
    }
}