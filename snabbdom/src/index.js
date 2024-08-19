import h from './mysnabbdom/h';

var myVnode1 = h('div', {}, [
  h('p', {}, '哈哈'),
  h('p', {}, '嘻嘻'),
  h('p', {}, '呵呵'),
  h('p', {}, h('span', {}, '嘿嘿'))
])
console.log(myVnode1)