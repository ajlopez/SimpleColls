
var sc = require('..');

exports['range one to three'] = function (test) {
    var result = sc.range(1, 3);
    
    test.ok(result);
    
    test.equal(result.next(), 1);
    test.equal(result.next(), 2);
    test.equal(result.next(), 3);
    test.equal(result.next(), null);
}
