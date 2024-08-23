import h from './mysnabbdom/h';
import patch from './mysnabbdom/patch';

var myVnode1 = h('section', {}, h('p', {}, 'hello world'));

var myVnode2 = h('section', {}, [
    h('p', {}, 'A'),
    h('p', {}, 'B'),
    h('p', {}, 'C')
]);

const div = document.getElementById('app');
const button = document.getElementById('container');
patch(div, myVnode1);

button.addEventListener('click', () => {

    patch(myVnode1, myVnode2);
});