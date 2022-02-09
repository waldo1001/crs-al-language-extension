import * as assert from 'assert';
import { suite, test } from 'mocha';

import { FileFunctions } from '../../FileFunctions'

suite("FileFunctions Tests", () => {
    test("getDirectory", () => {
        assert.strictEqual(FileFunctions.getDirectory('c:\\program files\\somefolder\\myFolder\\myfile.al'), 'c:\\program files\\somefolder\\myFolder\\');
    });
    test("getFileName", () => {
        assert.strictEqual(FileFunctions.getFileName('c:\\program files\\somefolder\\myFolder\\myfile.al'), 'myfile.al');
    });

})