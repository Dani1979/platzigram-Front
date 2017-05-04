var express = require('express');
var multer  = require('multer');
var ext = require('file-extension');

var aws = require('aws-sdk');
var multers3 = require('multer-s3');

var config = require('./config');

var s3 = new aws.S3({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey

})

var storage = multers3({
  s3: s3,
  bucket: 'platzigram-dgb',
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname})
  },
  key: function ( req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})


// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, +Date.now() + '.' + ext(file.originalname))
//   }
// })

var upload = multer({ storage: storage }).single('picture');
// single('picture') picture es el nombre de nuestro fichero. Se declara en el name
// del input del formulario del aricho homepage/template.js
// <input name="picture" id="file" type="file" class="upload" onchange=${onchange} />

var app = express();
//Seteamos la cabecera para indicarle qiue vamos a renderizar con pug
app.set('view engine', 'pug');

app.use(express.static('public'));

app.get(['/','/signUp', '/signIn', '/user'], function (req, res) {
  var vtitle = setHeader(req.url);
  res.render('index',{ title: vtitle});
})

app.get('/api/pictures',function(req, res, next){

  var pictures = [
    {

      user :{
        username: 'dgonzabl',
        avatar: 'IMG-20150317-WA0002.jpg'
      },
      url : 'http://materializecss.com/images/office.jpg',
      likes: 0,
      liked: false,
      createdAt: +new Date()
    },
    {
      user :{
        username: 'dgonzabl',
        avatar: 'IMG-20150317-WA0002.jpg'
      },
      url : 'android-icon-144x144.png',
      likes: 1,
      liked: false,
      createdAt: +new Date().setDate(new Date().getDate() - 10)
    }];
//ponemos un + por delante del new date para formzar a sea date
//internamente llama al metodo valueOf con el cual te trae su valor primitivo del objeto date
    setTimeout(function () {
      res.send(pictures);
    },2000);


})

app.post('/api/picture', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(`Se ha producido un error: ${err}`);
      return res.status(500).send( `Error uploading file: ${err}`);
    }
    res.send('File uploaded');
  })
})

app.get('/api/:username',function (req,res) {
  const user ={
    username: 'Dgonzabl',
    avatar: '/IMG-20150317-WA0002.jpg',
    pictures: [
      {
        id: 1,
        src: 'http://materializecss.com/images/office.jpg',
        likes: 5
      },
      {
        id: 2,
        src: '/android-icon-144x144.png',
        likes: 15
      }
    ]
  }
  res.send(user);
})

// ponemos la ultima ruta de express la dinamica para el profile del user
app.get('/:username', function (req, res) {
  res.render('index',{ title: `Profile - ${req.params.username}`});
})
app.get('/:username/:id', function (req, res) {
  res.render('index',{ title: `Profile - ${req.params.username}`});
})

app.listen(3000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);
  console.log('Platzigram escuchando en el puerto 3000');
})





function setHeader(reqUrl) {
  switch (reqUrl) {
    case '/':
      vtitle = 'Platzigram'
      break;
    case '/signUp':
      vtitle = 'Platzigram-signUp'
      break;
    case '/signIn':
      vtitle = 'Platzigram-signIn'
      break;
    case '/user':
        vtitle = 'Platzigram-profile'
        break;
    default:
      vtitle = 'Platzigram'
  }
  return vtitle;
}
