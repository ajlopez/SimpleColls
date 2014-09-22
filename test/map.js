
var sc = require('..');

exports['map array'] = function (test) {
    var result = sc.map(function (x) { return x + 1 }, [1, 2, 3]);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.deepEqual(result, [2, 3, 4]);
}

exports['map object'] = function (test) {
    var result = sc.map(function (x) { return x + 1 }, { a: 1, b: 2 });
    
    test.ok(result);
    test.ok(!Array.isArray(result));
    test.equal(typeof result, 'object');
    test.deepEqual(result, { a: 2, b: 3 });
}


