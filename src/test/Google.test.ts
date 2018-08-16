import * as assert from 'assert';
import { suite, test } from 'mocha';

import { Google } from '../Google'

suite("Google Tests", () => {

    test("GetSearchUrl", () => {
        let SearchString = 'Option Types';
        let Result = Google.GetSearchUrl(SearchString);

        assert.notEqual(Result.indexOf('Option'), -1);
        assert.notEqual(Result.indexOf('Types'), -1);
        assert.equal(Result.indexOf('Option Types'), -1);
        assert.notEqual(Result.indexOf('Option+Types'), -1);
        assert.equal(Result.length > 12, true);
    })

})