import * as assert from 'assert';
import { suite, test } from 'mocha';

import { Settings } from '../Settings';
import { NAVObject } from '../NAVObject'
import { WorkspaceFiles } from '../WorkspaceFiles';
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { settings } from 'cluster';

suite("WorkspaceFiles Tests", () => {
    test("getDestinationFolder - test", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getTestCodeunit();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getDestinationFolder(navObject, testSettings);

        assert.equal(foldersuggestion.toLowerCase(), 'test');
    })
    test("getDestinationFolder - no test", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getDestinationFolder(navObject, testSettings);

        assert.notEqual(foldersuggestion.toLowerCase(), 'test');
    })
    test("getObjectTypeFolder - test", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getTestCodeunit();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getObjectTypeFolder(navObject);

        assert.equal(foldersuggestion.toLowerCase(), '');
    })
    test("getObjectTypeFolder - no test", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        let foldersuggestion = WorkspaceFiles.getObjectTypeFolder(navObject);

        assert.equal(foldersuggestion.toLowerCase().toString(), navObject.objectType.toString());
        assert.notEqual(foldersuggestion.toLowerCase().toString(), '');
    })
})