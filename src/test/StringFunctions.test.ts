import * as assert from 'assert';
import { suite, test } from 'mocha';

import { StringFunctions } from '../StringFunctions';

suite("StringFunctions Tests", () => {
    test("replaceAll", () => {
        assert.equal(StringFunctions.replaceAll('Remove all "double" quotes" from this " text.', '"', ''), 'Remove all double quotes from this  text.');
    })
    test("removeAllButAlfaNumeric", () => {
        assert.equal(StringFunctions.removeAllButAlfaNumeric('E.x/a!m$p"l&e'), 'Example')
    })

})