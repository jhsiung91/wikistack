var router = require('express').Router();
router.use(require('body-parser').urlencoded({extended: false}));

var models = require('../models');
var Page = models.Page; 
var User = models.User; 

router.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  // res.redirect('/wiki');
  .then(function(){
  	// res.json(page)
    res.redirect('/wiki/' + page.urlTitle)
  })
});

// app.get('/',function(req,res,next){
// 	res.render('index'); 
// })

router.get('/', function(req, res, next) {
  // res.send('got to GET /wiki/');
  // res.redirect('/');
  // res.json(req.body)
  Page.findAll({})
    .then(function(thePages){
      res.render('index', {
        pages: thePages
      });
    })
    .catch(next);
});

router.get('/add', function(req, res, next) {
  // res.send('got to GET /wiki/add');
  res.render('addpage')
});

router.get('/:urlTitle',function(req,res,next){
	// res.send('hit dynamic route at ' + req.params.urlTitle);
	Page.findOne({
		where:{
			urlTitle: req.params.urlTitle
		}
	})
	.then(function(foundPage){
		// res.json(foundPage);
    console.log(foundPage.title)
		res.render('wikipage',
      {page: foundPage})
	})
	.catch(next);
})


module.exports = router;