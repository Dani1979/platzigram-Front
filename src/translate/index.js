
// se puede hacer una doble asignacion con 2 =
// Se lo asignamos a window ya que format js tiene que estar a nivel de gloabl que en este caso es window
var IntlRelativeFormat =window.IntlRelativeFormat= require('intl-relativeformat');
var IntlMessageFormat = require('intl-messageformat');
require('intl-relativeformat/dist/locale-data/en.js')
require('intl-relativeformat/dist/locale-data/es.js')

// la libreria moment js utiliza jquery en cambio  format.js es una libreria mas nativa
// que corre en caso todos los navegadores salvo safary, pero que  con un polyfil se solucionaria
// con moment se haria de la siguiente manera
 // <small class="right time">${moment(picture.createdAt).fromNow()}</small>


var es = require('./es');
var en = require('./en-US');

var MESSAGES = {};
//estas dos asignaciones son exactamente iguales
MESSAGES.es = es;
MESSAGES['en-US'] = en;

var locale = localStorage.locale || 'es'
//si no le enviamos el parametro opts le asignamos vacio
module.exports ={
  message :function(text,opts={}){
    //nos creamos la instacia del objeto IntlMessageFormat
    var msg = new IntlMessageFormat(MESSAGES[locale][text], locale, null);
    return msg.format(opts);
  },
  date: new IntlRelativeFormat(locale)
}
