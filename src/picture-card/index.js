var yo = require('yo-yo');
var translate= require('../translate');
module.exports = function pictureCard(pic) {
  var el;
  function render(picture) {
    return yo`
    <div class="card ${picture.liked ? 'liked' : ''}">
       <div class="card-image">
         <img class="activator" src="${picture.url}">
       </div>
       <div class="card-content">
         <a href="/${picture.user.username}" class="card-title">
           <img src="${picture.user.avatar}" class="avatar" />
           <span class="username">${picture.user.username}</span>
         </a>

         <small class="right time">${translate.date.format(picture.createdAt)}</small>
         <p>
           <a class="left" href="#" onclick=${like.bind(null,true)}><i class="fa fa-heart-o" aria-hidden="true"></i></a>
           <a class="left" href="#" onclick=${like.bind(null,false)}><i class="fa fa-heart" aria-hidden="true"></i></a>
           <span class="left likes">${translate.message('likes',{likes : picture.likes})}</span>
         </p>
       </div>
     </div>`;
  }
// onclick=${like.bind(null,false) con el bind accedemos al this de la function
// y le vincolamos o bindeamos "bond" a otro objeto en este caso lo ponemos a null pq no se loqueremos pasar a otro objeto
// y le pasamos true o false para incrementar o decrementar el contador
// es algo muy interesante eso, si lo dejamos así:
// ${like(true)}
// va a llamar a la función cuando llegue a esa línea, y dentro de la función like, estamos llamando a render, pero render va a volver a evaluar la línea
// ${like(true)}
// y así esta llamará a render de nuevo, así infinitamente
//
// para que esto no ocurra tenemos que hacer que lo que esté entre ${} no sea el llamado a la función sino más bien una referencia a la misma, eso lo conseguimos con la función bind, que cambia quién será el objeto "this" dentro de la función y nos devuelve esa función con el this modificado

  function like(liked) {
    if (liked === undefined) {
      pic.likedHeart = pic.liked = !pic.liked;
      liked = pic.liked;
    } else {
      pic.liked = liked;
    }
    pic.likes += liked ? 1 : -1;
    var newEl = render(pic);
    yo.update(el, newEl);

    setTimeout(function () {
      pic.likedHeart = false;
      var newEl = render(pic);
      yo.update(el, newEl);
    }, 1500)

    return false;
  }

  el = render(pic);
  return el;
}
