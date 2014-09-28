
var sc = require('..');

exports['use of array'] = function (test) {
    var array = [1, 2, 3];
    var result = sc.use(array);
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.ok(!Array.isArray(result));
}

exports['use array to array'] = function (test) {
    var array = [1, 2, 3];
    var result = sc.use(array).toArray();
    
    test.deepEqual(result, array);
}

exports['use array to object'] = function (test) {
    var array = [1, 2, 3];
    var result = sc.use(array).toObject();
    
    test.deepEqual(result, { '0': 1, '1': 2, '2': 3 });
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

exports['use filter next'] = function (test) {
    var array = [1, 2, 3, 4, 5];
    
    var coll = sc.use(array).filter(function (x) { return x % 2 == 1; });
    
    var result = coll.next();
    test.equal(result, 1);
    var result = coll.next();
    test.equal(result, 3);
    var result = coll.next();
    test.equal(result, 5);
    
    test.strictEqual(coll.next(), null);
}
