const { fetchGeo } = require('../src/api');
const chai = require('chai');
const expect = chai.expect;

describe('API HTTP Requests', function () {
    before(() => {
        global.fetch = require('node-fetch');
    });
    after(() => {
        delete global.fetch;
    });
    it('should be able to receive geo data from API', function (done) {
        fetchGeo()
            .then(res => {
                expect(typeof response).equal('object');
                const keys = Object.keys(response);
                const keysAreCountryCodes = keys.every(k => typeof k === 'string' && k.length === 2);
                expect(keysAreCountryCodes).to.be.true;
                done();
            })
    });
});