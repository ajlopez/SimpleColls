
var sc = require('..');

exports['range one to three'] = function (test) {
    var result = sc.range(1, 3);
    
    test.ok(result);
    
    test.equal(result.next(), 1);
    test.equal(result.next(), 2);
    test.equal(result.next(), 3);
    test.equal(result.next(), null);
}

exports['range naturals from one'] = function (test) {
    var result = sc.range(1);
    
    test.ok(result);

    for (var k = 1; k < 1000; k++)
        test.equal(result.next(), k);
}

exports['range primes'] = function (test) {
    function isprime(n) {
        for (var k = 2; k * k <= n; k++)
            if (n % k == 0)
                return false;
         
        return true;
    }
    
    var result = sc.range(1).filter(isprime);
    
    test.ok(result);

    test.equal(result.next(), 1);
    test.equal(result.next(), 2);
    test.equal(result.next(), 3);
    test.equal(result.next(), 5);
    test.equal(result.next(), 7);
    test.equal(result.next(), 11);
    test.equal(result.next(), 13);
    test.equal(result.next(), 17);
}
