
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

module.exports = {
    map: map,
    filter: filter,
    empty: empty,
    reduce: reduce,
    transduce: transduce
}

