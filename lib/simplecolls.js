
function isArray(obj) {
    return Array.isArray(obj);
}

function map(fn, coll) {
    if (isArray(coll)) {
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
    if (isArray(coll)) {
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
    reduce: reduce,
    transduce: transduce
}

