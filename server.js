const express = require('express');
const app = express();
// const db = require('./models/index');
const path = require('path');
const port = process.env.PORT || 3000;

const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views',{noCache: true});

app.use('/vendor',express.static(path.join((__dirname,'node_modules'))));
app.use('/stylesheets',express.static(path.join((__dirname,'stylesheets'))));

app.get('/', function(req,res){
	res.render('index');
})

app.use('/wiki',require('./routes/wiki'));

var models = require('./models');

// ... other stuff

// models.User.sync({})
// .then(function () {
//     return models.Page.sync({})
// })

// models.db.sync({force: true, logging: true}) 
models.db.sync({force: true}) //logging: false means do not display query in terminal
.then(function () {
    // make sure to replace the name below with your express app
    app.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);

// app.listen(port, function(){
// 	console.log(`listening to ${port}`)
// })