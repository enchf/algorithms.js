function Tests() {
  this.assert = null;
  this.url = null;
  this.data = null;
};

/**
 * Executes the test object passed as argument, which is a function in the form:
 * function(assert, data) { ... }, being assert the QUnit assertion object
 * and data the testing data, taken remotely or explicitly from this.data.
 * @param callback Suite function.
 * @returns {Function} Function in the form function(assert) suitable for QUnit.test method.
 */
Tests.prototype.test = function(test) {
  return (function(assert) {
    var exec;
    this.assert = assert;
    exec = this.execute(assert.async(),test);
    if (this.url && this.data === null) {
      $.getJSON(this.url, exec.bind(this));
    } else {
      exec.call(this, this.data);
    }
  }).bind(this);
};

/**
 * Creates an executable function that executes the test suite and
 * ends the test with the async object. The function is automatically binded
 * to the Tests object.
 * @param done Async completeness function object.
 * @param test Test function to be executed.
 * @returns {Function} Suite executor function, binded to the Tests suite object.
 */
Tests.prototype.execute = function(done,test) {
  return (function(data) {
    this.data = data;
    test.call(this, this.assert, this.data);
    done();
  }).bind(this);
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
  this.data = null;
  return this;
};
