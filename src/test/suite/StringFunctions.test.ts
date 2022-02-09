import * as assert from 'assert';
import { suite, test } from 'mocha';

import { StringFunctions } from '../../StringFunctions';

suite("StringFunctions Tests", () => {
    test("replaceAll", () => {
        assert.strictEqual(StringFunctions.replaceAll('Remove all "double" quotes" from this " text.', '"', ''), 'Remove all double quotes from this  text.');
    })
    test("removeAllButAlfaNumeric", () => {
        assert.strictEqual(StringFunctions.removeAllButAlfaNumeric('E.x/a!m$p"l&e'), 'Example')
    })

})