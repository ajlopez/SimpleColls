
var sc = require('..');

exports['filter odd numbers from array'] = function (test) {
    var result = sc.filter(
        function (x) { return x % 2 == 1; }, 
        [1, 2, 3, 4, 5]);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.deepEqual(result, [1, 3, 5]);
}