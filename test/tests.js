function loadModule(module) {
  var script, test; 
  
  script = document.createElement('script');
  script.src = '../modules/' + module + '.js';
  
  test = document.createElement('script');
  test.src = 'suites/' + module + '.js';
  test.onload = function() {
    console.log('test suite ' + module + ' loaded');
  };
  
  script.onload = function() {
    console.log('script ' + module + ' loaded');
    document.head.appendChild(test);
  };
  
  document.head.appendChild(script);
}

$(function() {
  $.getJSON('modules.json', function(json) {
	console.log(json);
    for (var i = 0; i < json.modules.length; i++) {
      loadModule(json.modules[i]);
    }
  });
});
