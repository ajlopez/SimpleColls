
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
        
        if (keyvalue)
            result = { key: k, value: array[k] };
        else
            result = array[k];
            
        k++;
        
        return result;
    }
}

function Collection(array) {
    var enumerator = new ArrayEnumerator(array);
    
    this.toArray = function () {
        var result = [];

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

module.exports = {
    map: map,
    filter: filter,
    empty: empty,
    reduce: reduce,
    transduce: transduce,
    use: use
}

