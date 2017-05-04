const page = require('page');
require("babel-polyfill");

//como estos modulos no exportan nada, no hace falta asignarselos a una variable
//Con el requiere ejecutará el codigo que está en cada uno de lo modulos

require('./homepage');
require('./signup');
require('./signin');
require('./user-page');
require('./footer')


page.start();
