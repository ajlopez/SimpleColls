
var sc = require('..');

exports['transduce an array'] = function (test) {
    var result = sc.transduce(
        function (x) { return x + 1}, 
        function (result, value) {
            result.push(value);
            return result;
        },
        [],
        [1, 2, 3]);
        
    test.ok(result);
    test.ok(Array.isArray(result));
    test.deepEqual(result, [2, 3, 4]);
}