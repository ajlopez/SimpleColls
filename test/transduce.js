
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

exports['transduce an array to sum values'] = function (test) {
    var result = sc.transduce(
        function (x) { return x + 1}, 
        function (result, value) {
            result += value;
            return result;
        },
        0,
        [1, 2, 3]);
        
    test.ok(result);
    test.equal(result, 9);
}

exports['transduce an object to sum values'] = function (test) {
    var result = sc.transduce(
        function (x) { return x + 1}, 
        function (result, value) {
            result += value;
            return result;
        },
        0,
        { a: 1, b: 2, c: 3 });
        
    test.ok(result);
    test.equal(result, 9);
}

