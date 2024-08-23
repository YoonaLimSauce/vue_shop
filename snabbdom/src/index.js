import h from './mysnabbdom/h';
import patch from './mysnabbdom/patch';

var myVnode1 = h('ul', {}, [
    h('li', {}, 'A'),
    h('li', {}, 'B'),
    h('li', {}, h('p', {}, 'C')),
    h('li', {}, [
        h('div', {}, [
            h('p', {}, 'D'),
            h('p', {}, 'E')
        ])
    ])
]);

const button = document.getElementById('container');
patch(button, myVnode1);