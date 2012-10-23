var fs = require('fs');

var templatePath = undefined;
var templates = {};

var soy = eval('(function() {' + fs.readFileSync(__dirname + '/soyutils.js') + 'return soy;})();'); 
//var examples = eval('(function() {' + fs.readFileSync(templatePath + '/simple.js') + 'templates.examples = examples;})();');
  


exports.renderFile =  function(path, options, fn){
  
  console.log("AWDAD"); 
  
  if ('function' == typeof options) {
    fn = options, options = {};
  }
  
  try {
    
    console.log(examples);
    
    fn(null, exports.render(path, options));
    
  } catch (err) {
    fn(err);
  }
};


exports.parse = function(str, options) {return "";}

exports.render = function(path, options){
  // swap args
  if ('function' == typeof options) {
    fn = options, options = {};
  }

  try {
    
    return templates.examples.simple.helloWorld();
  } catch (err) {
    fn(err);
  }
};


module.exports.middleware = function(path, options){
  var options = options || {}
    , templatePath = path || __dirname + '/public/templates'
    , maxAge = options.maxAge || 86400000
    , icon; // favicon cache

  return function gclosure(req, res, next){
    
        var _render = res.render;
    
    res.render = function(path, options, fn){
      if(path.match(/\.js$/)) {

        // Get Template name
        var template = path.slice(0, -3);
   
	// load template from file
        eval('(function() {' + fs.readFileSync(templatePath + '/simple.js') + 'templates.examples = examples;})();');
 
        // Get String
        var string = executeFunctionByName(template, templates, options);
        console.log(string);
   
        // Send String
        res.send(string);
 
      }else{
        
        // handle with other template engines
        _render.call(this, path, options, fn);
        
      }
    }
      next();
    
  };
};



function executeFunctionByName(functionName, context /*, args */) {
  var args = Array.prototype.slice.call(arguments).splice(2);
  var namespaces = functionName.split(".");
  var func = namespaces.pop();
  for(var i = 0; i < namespaces.length; i++) {
    context = context[namespaces[i]];
  }
  return context[func].apply(this, args);
}
