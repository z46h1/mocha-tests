const unique = (collection, uniqueAttr) => {
    if (!uniqueAttr) {
        return Array.from(new Set(collection));
    }
    const set = new Set();
    const result = [];
    collection.forEach(item => {
        if (!set.has(item[uniqueAttr])) {
            set.add(item[uniqueAttr]);
            result.push(item)
        }
    });
    return result;
};
const SEPARATOR = '_';
const memoize = (wrappedFn) => {
    const cache = {}; // key: fn param, value: fn result
    return (...args) => {
        //const key = args.join(SEPARATOR);
        if (args.some(arg => typeof arg === 'function')) {
            throw new Error('Functions are not allowed as memoized parameters');
        }
        const key = JSON.stringify(args);
        if (!cache[key]) {
            cache[key] = wrappedFn(...args);
        }
        return cache[key];
    }
};

module.exports = {
    unique,
    memoize
};
