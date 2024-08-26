import updateChildren from "./updateChildren";
import createElement from "./createElement";

export default function patchVnode(oldVnode, newVnode) {
    if (oldVnode !== newVnode) {
        if (newVnode.text !== undefined && (oldVnode.children === undefined || oldVnode.children.length === 0)) {
            if (newVnode.text !== oldVnode.text) {
                oldVnode.elm.innerText = newVnode.text;
            }
        } else if (oldVnode.children !== undefined && oldVnode.children.length > 0) {
            updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
        } else {
            oldVnode.elm.innerText = '';
            for (let i = 0; i < newVnode.children.length; i++) {
                let childDomNode = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(childDomNode);
            }
        }
    }
}