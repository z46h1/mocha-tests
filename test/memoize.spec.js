const { memoize } = require('../src/utils');
const chai = require('chai');
chai.should();
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');

const { Calculator } = require('../src/calc');

describe('Memoize decorator', function () {
    it('should return the same result as the wrapped function', function () {
        const square = (n) => n*n;
        const memoizedSquare = memoize(square);

        const rawResult = square(5);
        const memoizedResult = memoizedSquare(5);
        rawResult.should.equal(memoizedResult);
    });
    it('should call the wrpaped function after memoized function was calle', function () {
        const spy = sinon.spy();
        const memoizedSquare = memoize(spy);
        // tu jescze nie
        spy.notCalled.should.be.true;
        assert.equal(spy.notCalled, true);
        sinon.assert.notCalled(spy);

        const memoizedResult = memoizedSquare(5);
        //  jedno z tych
        spy.called.should.be.true;
        assert.equal(spy.called, true);
        sinon.assert.called(spy);

    });

    it('should only call wrapped function once if called with the same parameters', function () {
        const square = (n) => n*n;
        // spy existing function
        const spy = sinon.spy(square);
        const memoizedSquare = memoize(spy);

        sinon.assert.notCalled(spy);

        const result1 = memoizedSquare(5);
        const result2 = memoizedSquare(5);
        const result3 = memoizedSquare(5);

        sinon.assert.calledOnce(spy);
        sinon.assert.alwaysCalledWithExactly(spy, 5);

        result1.should.equal(25);
        result2.should.equal(25);
        result3.should.equal(25);
    });

    it('should memoize functions which operate on various number of parameters', function () {
        const spy = sinon.spy(Calculator, 'add');
        const memoizedAdd = memoize(Calculator.add);

        sinon.assert.notCalled(spy);

        const result1 = memoizedAdd(1,2);
        const result2 = memoizedAdd(2,3);

        sinon.assert.callCount(spy, 2);

        const result3 = memoizedAdd(2,3);
        const result4 = memoizedAdd(2,3);
        const result5 = memoizedAdd(1,2);

        sinon.assert.callCount(spy, 2);

        result1.should.equal(3);
        result2.should.equal(5);
        result3.should.equal(5);
        result4.should.equal(5);
        result5.should.equal(3);

        sinon.assert.calledWith(spy, 1,2);
        sinon.assert.calledWith(spy, 2,3);

    });

    const concat = (arr1,arr2) => arr1.concat(arr2);

    it('should call wrapped function twice for different array parameters', function () {
        const spy = sinon.spy(concat);
        const memoizedConcat = memoize(spy);

        const result1 = memoizedConcat([1,2], [3,4]);
        const result2 = memoizedConcat([2,3], [4,5]);
        sinon.assert.calledTwice(spy);
    });

    it('should call wrapped function twice for different object parameters', function () {
        const spy = sinon.spy(concat);
        const memoizedConcat = memoize(spy);

        const result1 = memoizedConcat([{value: 1}], [{value: 2}]);
        const result2 = memoizedConcat([{value: 2}], [{value: 3}]);
        sinon.assert.calledTwice(spy);
    });

    it('should throw if wrapped function is called with another function as parameter', function () {
        const memoizedConcat = memoize(concat);
        const spy = sinon.spy(memoizedConcat);
        const f1 = () => {}, f2 = () => {};
        try {
            const result1 = spy(f1,f2);
        } catch {}


        sinon.assert.threw(spy);
        sinon.assert.calledOnce(spy);
    });
});