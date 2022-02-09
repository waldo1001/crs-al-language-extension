import * as assert from 'assert';
import { suite, test } from 'mocha';

import { MSDocs } from '../../MSDocs'

suite("MSDocs Tests", () => {

    test("GetSearchUrl", () => {
        let SearchString = 'Option Types';
        let Result = MSDocs.GetSearchUrl(SearchString);

        assert.notStrictEqual(Result.indexOf('Option'), -1);
        assert.notStrictEqual(Result.indexOf('Types'), -1);
        assert.strictEqual(Result.indexOf('Option Types'), -1);
        assert.notStrictEqual(Result.indexOf('Option+Types'), -1);
        assert.strictEqual(Result.length > 12, true);
    })

})