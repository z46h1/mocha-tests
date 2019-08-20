const { unique } = require('../src/utils');
const assert = require('assert');

describe('Unique operator', function () {
    it('should return the collection if there are no repetitions', function () {
        assert.deepStrictEqual(unique([1,2,3]), [1,2,3])
    });
    it('should remove repetition', function () {
        assert.deepStrictEqual(unique([1,2,3,3]), [1,2,3])
    });
    it('should return empty collection for empty input', function () {
        assert.deepStrictEqual(unique([]), [])
    });
    it('should remove repetition by attribute', function () {
        const input = [{
            name: "Janek",
            nationality: "PL"
        }, {
            name: "Hans",
            nationality: "DE"
        }, {
            name: "Krysia",
            nationality: "PL"
        }];
        const result = [{
            name: "Janek",
            nationality: "PL"
        }, {
            name: "Hans",
            nationality: "DE"
        }];
        assert.deepStrictEqual(unique(input, 'nationality'), result)
    });
});