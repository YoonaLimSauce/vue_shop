import createElement from './createElement.js'
import patchVnode from './patchVnode.js'

function checkSameVnode(a, b) {
    return a.key === b.key && a.sel === b.sel
}

export default function updateChildren(parentElm, oldCh, newCh) {
    // 旧前
    let oldStartIdx = 0
    // 新前
    let newStartIdx = 0
    // 旧后
    let oldEndIdx = oldCh.length - 1
    // 新后
    let newEndIdx = newCh.length - 1
    // 旧前节点
    let oldStartVnode = oldCh[oldStartIdx]
    // 新前节点
    let newStartVnode = newCh[newStartIdx]
    // 旧后节点
    let oldEndVnode = oldCh[oldEndIdx]
    // 新后节点
    let newEndVnode = newCh[newEndIdx]

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (checkSameVnode(oldStartVnode, newStartVnode)) {
            // 旧前和新前
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIdx]
            newStartVnode = newCh[++newStartIdx]
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            // 旧后和新后
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            // 旧前和新后
            patchVnode(oldStartVnode, newEndVnode)
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIdx]
            newEndVnode = newCh[--newEndIdx]
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            // 旧后和新前
            patchVnode(oldEndVnode, newStartVnode)
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIdx]
            newStartVnode = newCh[++newStartIdx]
        } else {
            console.log('不能匹配')

            break
         }
    }

    if (newStartIdx <= newEndIdx) {
        const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm
        for (; newStartIdx <= newEndIdx; ++newStartIdx) {
            parentElm.insertBefore(createElement(newCh[newStartIdx]), before)
        }
    } else if (oldStartIdx <= oldEndIdx) {
        for (; oldStartIdx <= oldEndIdx; ++oldStartIdx) {
            parentElm.removeChild(oldCh[oldStartIdx].elm)
        }
    }
}