
var sc = require('..');

exports['sum an array'] = function (test) {
    var result = sc.reduce(
        function (result, value) {
            return result + value;
        },
        0,
        [1, 2, 3]);
        
    test.ok(result);
    test.equal(result, 6);
}

exports['sum an object with next'] = function (test) {
    var counter = 0;
    
    var obj = {
        next: function () { if (counter >= 3) return null; return ++counter; }
    }
    
    var result = sc.reduce(
        function (result, value) {
            return result + value;
        },
        0,
        obj);
        
    test.ok(result);
    test.equal(result, 6);
}

exports['transform an array'] = function (test) {
    var result = sc.reduce(
        function (result, value) {
            result.push(value + 1);
            return result;
        },
        [],
        [1, 2, 3]);
        
    test.ok(result);
    test.deepEqual(result, [2, 3, 4]);
}

exports['sum an object'] = function (test) {
    var result = sc.reduce(
        function (result, value) {
            return result + value;
        },
        0,
        { a: 1, b: 2, c: 3 });
        
    test.ok(result);
    test.equal(result, 6);
}
