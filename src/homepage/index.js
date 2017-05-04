var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var header = require('../header');


// var request = require('superagent');

// var axios = require('axios');


//header es un middleware para añadir el header a la homepage

page('/', header, loading, asyncLoad, function (ctx, next) {
  title('Platzigram');
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));
})

function loading(ctx, next) {
  var container = document.createElement('div');
  var loadingEl = document.createElement('div');
  container.classList.add('loader-container');
  loadingEl.classList.add('loader');
  container.appendChild(loadingEl);
  document.getElementById('main-container').appendChild(container);
  next();
}

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(err);
  }
}


// ejemplos de como recuperar datos mediante API con distintas librerias
//superagent, axios, fetch API, Async Await

//
// function loadPictures(ctx, next) {
//   request
//     .get('/api/pictures')
//     .end(function (err,res) {
//       if(err) return console.log(err);
//       // res.status(500).send({ error: 'Something failed!' });
//       //sacamos del conexto(ctx) la variable pictures y le asignamos el valor de la respuesta de la api
//       //el contecto se va llenando de todas las peticiones que hacemos del lado del cliente
//       ctx.pictures = res.body;
//       next();
//     })
// }
//
// function loadPicturesAxios(ctx, next) {
//   axios
//     .get('/api/pictures')
//     .then(function (res) {
//         // res.status(500).send({ error: 'Something failed!' });
//       //sacamos del conexto(ctx) la variable pictures y le asignamos el valor de la respuesta de la api
//       //el contecto se va llenando de todas las peticiones que hacemos del lado del cliente
//       ctx.pictures = res.data;
//       next();
//     })
//     .catch(function(err){
//       console.log(err);
//     })
// }
//
//
// function loadPicturesFetch(ctx, next) {
//   fetch('/api/pictures')
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (pictures) {
//         ctx.pictures = pictures;
//       next();
//     })
//     .catch(function(err){
//       console.log(err);
//     })
// }
