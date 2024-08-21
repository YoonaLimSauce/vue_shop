export default function (vnode) {
    let domNode = document.createElement(vnode.sel);
    if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
        domNode.innerText = vnode.text;
        vnode.elm = domNode;
    }
    return vnode.elm;
}