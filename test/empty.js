
var sc = require('..');

exports['empty array'] = function (test) {
    var result = sc.empty([1, 2, 3]);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.deepEqual(result, []);
}

exports['empty object'] = function (test) {
    var result = sc.empty({ a: 1, b: 2, c: 3 });
    
    test.ok(result);
    test.ok(!Array.isArray(result));
    test.deepEqual(result, {});
}

