const { fetchGeo, fetchOffices } = require('../src/api');
const chai = require('chai');
const expect = chai.expect;
const assert = chai.assert

describe('API HTTP Requests', function () {
    before(() => {
        global.fetch = require('node-fetch');
    });

    after(() => {
        if (global.hasOwnProperty('fetch')) {
            delete global.fetch;
        }
    });

    it('should be able to receive geo data from API @integration', async function () {
        const response = await fetchGeo();
        expect(typeof response).equal('object');
        const keys = Object.keys(response);
        const keysAreCountryCodes = keys.every(k => typeof k === 'string' && k.length === 2);
        expect(keysAreCountryCodes).to.be.true;
    });

    it('should receive offices data from REST API @integration', async function () {
        const response = await fetchOffices();
        expect(response instanceof Array).to.be.true;
    });
});