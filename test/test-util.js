function Tests() {
  this.assert = null;
  this.suites = [];
  this.url = null;
  this.data = {};
};

/**
 * Executes the testing with the configuration set by the builder functions.
 * @param assert QUnit assertion object.
 */
Tests.prototype.test = function() {
  return (function(assert) {
	var exec;
	  
	this.assert = assert;
	exec = this.execute(assert.async());
	  
	if (this.url) {
	  $.getJSON(this.url, exec.bind(this));
	} else {
	  exec.call(this,this.data);
	}
  }).bind(this);
};

/**
 * Creates an executable function that executes the test suite and
 * ends the test with the async object. The function is automatically binded
 * to the Tests object.
 * @param done Async completeness function object.
 * @returns {Function} Suite executor function, binded to the Tests suite object.
 */
Tests.prototype.execute = function(done) {
  return (function(data) {
	for (var i = 0; i < this.suites.length; i++) {
	  this.suites[i].call(this, this.assert, data);
	}
	done();
  }).bind(this);
};

/**
 * Adds a suite object, which is a function in the form:
 * function(assert, data) { ... }, being assert the QUnit assertion object
 * and data the testing data, taken remotely or explicitly from this.data.
 * @param callback Suite function.
 * @returns {Tests} Test suite object.
 */
Tests.prototype.addSuite = function(callback) {
  this.suites.push(callback);
  return this;
};

/**
 * Sets explicitly the data to be used when testing.
 * @param data Data to be used during testing for all suites.
 * @returns {Tests} Test suite object.
 */
Tests.prototype.dataset = function(data) {
  this.data = data;
  return this;
};

/**
 * Add a remote data origin for the test suite.
 * @param url JSON data provider URL.
 * @returns {Tests} Test suite object.
 */
Tests.prototype.remote = function(url) {
  this.url = url;
  return this;
};
