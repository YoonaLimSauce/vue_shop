export default function (vnode, pivot) {
    let domNode = document.createElement(vnode.sel);
    if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
        domNode.innerText = vnode.text;
        pivot.parentNode.insertBefore(domNode, pivot);
    }
}