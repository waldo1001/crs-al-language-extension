import * as assert from 'assert';
import { suite, test } from 'mocha';
import { Settings } from '../../Settings';
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { NAVObject } from '../../NAVObject'
import { WorkspaceFiles } from '../../WorkspaceFiles';

suite("WorkspaceFiles Tests", () => {
    test("getDestinationFolder - test", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getTestCodeunit();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getDestinationFolder(navObject, testSettings);

        assert.strictEqual(foldersuggestion.toLowerCase(), 'test');
    })
    test("getDestinationFolder - no test", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getDestinationFolder(navObject, testSettings);

        assert.notStrictEqual(foldersuggestion.toLowerCase(), 'test');
    })
    test("getObjectTypeFolder - test", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getTestCodeunit();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getObjectTypeFolder(navObject, testSettings);

        assert.strictEqual(foldersuggestion.toLowerCase(), '');
    })
    test("getObjectTypeFolder - no test", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getObjectTypeFolder(navObject, testSettings);

        assert.strictEqual(foldersuggestion.toLowerCase().toString(), navObject.objectType.toString());
        assert.notStrictEqual(foldersuggestion.toLowerCase().toString(), '');
    })
    test("getObjectTypeFolder - return namespace", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.ReorganizeByNamespace] = true;
        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithNamespace();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getObjectTypeFolder(navObject, testSettings);

        assert.notStrictEqual(foldersuggestion.toLowerCase().toString(), navObject.objectNamespace.toLowerCase().toString());
        assert.strictEqual(foldersuggestion.toLowerCase().toString(), 'spycoclown\\test');
    })
})