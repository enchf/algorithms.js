Numbers.test = {};

Numbers.test.toRoman = function(assert, json) {
  var test;
  var message = function(param, expected) {
    return 'Converting ' + param + ' into ' + expected;
  };
    
  for (var i = 1; i <= json.numbers.length; i++) {
    assert.strictEqual(Numbers.toRoman(i), json.numbers[i-1], message(i, json.numbers[i-1]));
  }
    
  for (var i = 0; i < json.special.length; i++) {
    test = json.special[i];
    assert.strictEqual(Numbers.toRoman(test.params), test.expected, message(test.params, test.expected));
  }
};

QUnit.test("Roman numbers conversion", new Tests().remote('data/roman.json').test(Numbers.test.toRoman));
