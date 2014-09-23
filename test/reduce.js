
var sc = require('..');

exports['sum an array'] = function (test) {
    var result = sc.reduce(
        function (result, value) {
            return result + value;
            result.push(value);
            return result;
        },
        0,
        [1, 2, 3]);
        
    test.ok(result);
    test.equal(result, 6);
}
