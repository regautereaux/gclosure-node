var express = require('express');
var app = express();
var gclosure = require('..');
var jade = require('jade').__express;

/**
 * This demonstrates the use of gclosure templates and another template engine at the same time
 */

/**
 * Setup Express
 */
app.configure(function(){
  
    app.engine('jade', jade);
  
    app.set('views', __dirname + '/public/templates');
    app.set('view engine', 'js');
    
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
   
    // Register the gclosure middleware 
    app.use(gclosure.middleware( __dirname + '/public/templates' ));
   
    // Since closure templates can also be used client side we try to place them in the public directory. you can override that later 
    app.use(express.static(__dirname + '/public'));
});

/**
* Use a jade template file to render output
*/
app.get('/jade', function(req, res, next) {
  
  res.render('simple.jade', {    title: 'Sources'});
  
});

/**
* Use a google closure javascript function to render output
*/ 
app.get('/', function(req, res, next) {
  
  res.render('examples.simple.helloWorld.js',{
            title: 'This is a test',
            data: 'And it worked'
        }); 
  

});


app.listen(3001);
