
function RangeEnumerator(from, to) {
    var n = 0;
    
    this.next = function (keyvalue) {
        var value = from + n;
        
        if (value > to)
            return null;

        if (keyvalue)
            return { key: n++, value: value };
            
        n++;
        
        return value;
    }
}

function SkipEnumerator(n, enumerator) {
    var k = 0;
    
    this.next = function (keyvalue) {
        var item;
        
        while (k < n) {
            if (enumerator.next(keyvalue) == null)
                return null;
                
            k++;
        }
        
        return enumerator.next(keyvalue);
    }
}

function TakeEnumerator(n, enumerator) {
    var k = 0;
    
    this.next = function (keyvalue) {
        if (k >= n)
            return null;
            
        k++;
        
        return enumerator.next(keyvalue);
    }
}

function FilterEnumerator(fn, enumerator) {
    this.next = function (keyvalue) {
        var item = enumerator.next(keyvalue);
        
        while (item != null && !fn(item))
            item = enumerator.next(keyvalue);
            
        return item;
    }
}

function ArrayEnumerator(array) {
    var keys = [];
    
    for (var n in array)
        keys.push(n);
        
    var k = 0;
    var l = keys.length;
        
    this.next = function (keyvalue) {
        if (k >= l)
            return null;
            
        var result;
        var key = keys[k++];
        
        if (keyvalue)
            result = { key: key, value: array[key] };
        else
            result = array[key];
        
        return result;
    }
}

function ObjectEnumerator(obj) {
    var keys = [];
    
    for (var n in obj)
        keys.push(n);
        
    var k = 0;
    var l = keys.length;
        
    this.next = function (keyvalue) {
        if (k >= l)
            return null;
            
        var result;
        var key = keys[k++];
        
        if (keyvalue)
            result = { key: key, value: obj[key] };
        else
            result = obj[key];
        
        return result;
    }
}

function Collection(coll) {
    var enumerator;

    if (isNext(coll))
        enumerator = coll;
    else if (isArray(coll))
        enumerator = new ArrayEnumerator(coll);
    else
        enumerator = new ObjectEnumerator(coll);
    
    this.toArray = function () {
        var result = [];

        for (var keyvalue = enumerator.next(true); keyvalue != null; keyvalue = enumerator.next(true))
            result[keyvalue.key] = keyvalue.value;
            
        return result;
    }
    
    this.toObject = function () {
        var result = { };
        
        for (var keyvalue = enumerator.next(true); keyvalue != null; keyvalue = enumerator.next(true))
            result[keyvalue.key] = keyvalue.value;
            
        return result;
    }
    
    this.next = function (keyvalue) {
        return enumerator.next(keyvalue);
    }
    
    this.filter = function (fn) {
        enumerator = new FilterEnumerator(fn, enumerator);
        return this;
    }
    
    this.skip = function (n) {
        enumerator = new SkipEnumerator(n, enumerator);
        return this;
    }
    
    this.take = function (n) {
        enumerator = new TakeEnumerator(n, enumerator);
        return this;
    }
}

function isNext(coll) {
    return coll && typeof coll.next == 'function';
}

function isArray(obj) {
    return Array.isArray(obj);
}

function empty(coll) {
    if (isArray(coll))
        return [];
        
    return {};
}

function map(fn, coll) {
    if (isNext(coll)) {
        return {
            next: function () {
                var item = coll.next();
                
                if (item == null)
                    return null;
                    
                return fn(item);
            }
        }
    }
    else if (isArray(coll)) {
        var result = [];
        
        for (n in coll)
            result.push(fn(coll[n]));
            
        return result;
    }
    else {
        var result = {};
        
        for (n in coll)
            result[n] = fn(coll[n]);
            
        return result;
    }
}

function reduce(fnreduce, initial, coll) {
    var result = initial;
    
    if (isNext(coll))
        for (var item = coll.next(); item != null; item = coll.next())
            result = fnreduce(result, item);
    else
        for (n in coll)
            result = fnreduce(result, coll[n]);
        
    return result;
}

function transduce(fnmap, fnreduce, initial, coll) {
    var result = initial;
    
    if (isNext(coll))
        for (var item = coll.next(); item != null; item = coll.next())
            result = fnreduce(result, fnmap(item));
    else
        for (n in coll)
            result = fnreduce(result, fnmap(coll[n]));
        
    return result;
}

function filter(fn, coll) {
    if (isNext(coll)) {
        return {
            next: function () {
                var item = coll.next();
                
                while (item != null && !fn(item))
                    item = coll.next();
                    
                return item;
            }
        }
    }
    else if (isArray(coll)) {
        var result = [];
        
        for (n in coll)
            if (fn(coll[n], n))
                result.push(coll[n]);
        
        return result;
    }
    else {
        var result = {};
        
        for (n in coll)
            if (fn(coll[n], n))
                result[n] = coll[n];
                
        return result;
    }
}

function use(array) {
    return new Collection(array);
}

function range(from, to) {
    return new Collection(new RangeEnumerator(from, to));
}

module.exports = {
    map: map,
    filter: filter,
    empty: empty,
    reduce: reduce,
    transduce: transduce,
    use: use,
    range: range
}

