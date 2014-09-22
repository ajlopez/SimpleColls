
var sc = require('..');

exports['filter odd numbers from array'] = function (test) {
    var result = sc.filter(
        function (x) { return x % 2 == 1; }, 
        [1, 2, 3, 4, 5]);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.deepEqual(result, [1, 3, 5]);
}

exports['filter odd values from object'] = function (test) {
    var result = sc.filter(
        function (x) { return x % 2 == 1; }, 
        { a: 1, b: 2, c: 3, d: 4, e: 5 });
    
    test.ok(result);
    test.ok(!Array.isArray(result));
    test.equal(typeof result, 'object');
    test.deepEqual(result, { a: 1, c: 3, e: 5 });
}

exports['filter properties from object'] = function (test) {
    var result = sc.filter(
        function (x, name) { return name == 'a' || name == 'c'; }, 
        { a: 1, b: 2, c: 3, d: 4, e: 5 });
    
    test.ok(result);
    test.ok(!Array.isArray(result));
    test.equal(typeof result, 'object');
    test.deepEqual(result, { a: 1, c: 3 });
}
