/**
 * Module dependencies
 */

import page from 'page';
import template from './template';
import title from 'title';
import empty from 'empty-element';
import header from '../header';

page('/:username', loadUser, header, function (ctx, next) {
  var main = document.getElementById('main-container');
  title(`Platzigram - ${ctx.user.username}`);
  empty(main).appendChild(template(ctx.user));
});

page('/:username/:id', loadUser, header, function (ctx, next) {
  var main = document.getElementById('main-container');
  title(`Platzigram - ${ctx.user.username}`);
  empty(main).appendChild(template(ctx.user));
  $(`#modal${ctx.params.id}`).openModal(
      {
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        complete: function() {
          page(`/user/${ctx.params.username}`);
        } // Callback for Modal close
      }
    );
});

async function loadUser (ctx, next) {
  try {
    ctx.user = await fetch(`/api/${ctx.params.username}`).then(res => res.json());
    next();
  } catch (err) {
    console.log(err);
  }
}
