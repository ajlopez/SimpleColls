
var sc = require('..');

exports['use of array'] = function (test) {
    var array = [1, 2, 3];
    var result = sc.use(array);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(!Array.isArray(result));
}

exports['use to array'] = function (test) {
    var array = [1, 2, 3];
    var result = sc.use(array).toArray();
    
    test.deepEqual(result, array);
}

exports['use next'] = function (test) {
    var array = [1, 2, 3];
    var coll = sc.use(array);
    var result = coll.next();
    test.equal(result, 1);
    var result = coll.next();
    test.equal(result, 2);
    var result = coll.next();
    test.equal(result, 3);
    
    test.strictEqual(coll.next(), null);
}

exports['use next key value'] = function (test) {
    var array = [1, 2, 3];
    var coll = sc.use(array);
    var result = coll.next(true);
    test.deepEqual(result, { key: 0, value: 1 });
    var result = coll.next(true);
    test.deepEqual(result, { key: 1, value: 2 });
}
