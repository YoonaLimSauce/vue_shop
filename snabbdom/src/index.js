import h from './mysnabbdom/h';
import patch from './mysnabbdom/patch';

var myVnode1 = h('section', {}, [
    h('p', {key: 'A'}, 'A'),
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'C'}, 'C'),
    h('p', {key: 'D'}, 'D'),
    h('p', {key: 'E'}, 'E'),
    h('p', {key: 'F'}, 'F'),
    h('p', {key: 'G'}, 'G'),
    h('p', {key: 'H'}, 'H'),
]);

var myVnode2 = h('section', {}, [
    h('p', {key: 'H'}, 'H'),
    h('p', {key: 'G'}, 'G'),
    h('p', {key: 'F'}, 'F'),
    h('p', {key: 'E'}, 'E'),
    h('p', {key: 'D'}, 'D'),
    h('p', {key: 'C'}, 'C'),
    h('p', {key: 'B'}, 'B'),
    h('p', {key: 'A'}, 'A'),
]);

const div = document.getElementById('app');
const button = document.getElementById('container');
patch(div, myVnode1);

button.addEventListener('click', () => {

    patch(myVnode1, myVnode2);
});