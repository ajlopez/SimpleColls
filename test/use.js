
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

exports['use object to array'] = function (test) {
    var obj = { a: 1, b: 2, c: 3 };
    var result = sc.use(obj).toArray();
    
    var expected = [];
    expected['a'] = 1;
    expected['b'] = 2;
    expected['c'] = 3;
    
    test.deepEqual(result, expected);
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

exports['use skip'] = function (test) {
    var array = [1, 2, 3, 4, 5];
    
    var coll = sc.use(array).skip(3);
    
    var result = coll.next();
    test.equal(result, 4);
    var result = coll.next();
    test.equal(result, 5);
    
    test.strictEqual(coll.next(), null);
}

exports['use take'] = function (test) {
    var array = [1, 2, 3, 4, 5];
    
    var coll = sc.use(array).take(2);
    
    var result = coll.next();
    test.equal(result, 1);
    var result = coll.next();
    test.equal(result, 2);
    
    test.strictEqual(coll.next(), null);
}

exports['use map array'] = function (test) {
    var array = [1, 2, 3];
    var result = sc.use(array).map(function (x) { return x + 1 }).toArray();
    
    test.ok(result);
    test.deepEqual(result, [2, 3, 4]);
}

exports['use with each'] = function (test) {
    var array = [1, 2, 3];
    var count = 0;
    var total = 0;
    
    var result = sc.use(array).each(function (x) { count++; total += x; })
    
    test.ok(result);
    test.equal(count, 3);
    test.equal(total, 6);
}

exports['use with reduce'] = function (test) {
    var array = [1, 2, 3];
    
    var result = sc.use(array).reduce(function (result, value) {
        return result + value;
    }, 0);
    
    test.ok(result);
    test.equal(result, 6);
}


