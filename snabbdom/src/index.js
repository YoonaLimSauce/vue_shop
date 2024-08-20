import h from './mysnabbdom/h';
import patch from './mysnabbdom/patch';

var myVnode1 = h('div', {}, 'Text test');

const button = document.getElementById('container');
patch(button, myVnode1);