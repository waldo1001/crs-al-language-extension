7//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import { suite, test } from 'mocha';

import { NAVObject } from '../NAVObject'
import { WorkspaceFiles } from '../WorkspaceFiles'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../extension';
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { ConfigurationTarget } from 'vscode';
import { Settings } from '../Settings';


// Defines a Mocha test suite to group tests of similar kind together
suite("NAVObject Tests", () => {

    test("Object without prefix - No prefix to set", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = null;

        let navTestObject = NAVTestObjectLibrary.getObjectNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.equal(navObject.objectActions[0].name, navObject.objectActions[0].nameFixed)

    });

    test("Object without prefix - set prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getObjectNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.notEqual(navObject.objectActions[0].name, navObject.objectActions[0].nameFixed)
    });

    test("Object without prefix - set prefix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getObjectNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectActions[0].nameFixed, testSettings[Settings.ObjectNamePrefix] + navObject.objectActions[0].name)
        assert.equal(navObject.objectActions[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.equal(navObject.objectActions.length, 3)
        navObject.objectActions.forEach(action => {
            assert.equal(action.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.equal(action.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })
    });

    test("Pageextension without prefix - set prefix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectActions[0].nameFixed, testSettings[Settings.ObjectNamePrefix] + navObject.objectActions[0].name)
        assert.equal(navObject.objectActions[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.equal(navObject.objectActions.length, 3)
        navObject.objectActions.forEach(action => {
            assert.equal(action.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.equal(action.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

    });

    test("Object with prefix - No prefix to set", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getObjectWithPrefixWrongName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.equal(navObject.objectFileNameFixed.indexOf('waldowaldo'), -1);
        navObject.objectActions.forEach(action => {
            assert.equal(action.name, action.nameFixed)
        })
    });

    test("Load NAVObject with Suffix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getObjectWithPrefixWrongName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileName.endsWith(testSettings[Settings.ObjectNameSuffix]), false)
        assert.notEqual(navObject.objectFileNameFixed.indexOf(testSettings[Settings.ObjectNameSuffix]), -1)
    });

    test("FileNamePatterns with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePattern] = '<ObjectType><ObjectTypeShort><ObjectId><ObjectName><ObjectNameShort>';//<ObjectType>,<ObjectTypeShort>,<ObjectId>,<ObjectName>,<ObjectNameShort>

        let navTestObject = NAVTestObjectLibrary.getObjectNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectId
            + navObject.objectNameFixed
            + navObject.objectNameFixedShort)
    })
    test("FileNamePatternExtensions with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectType><ObjectTypeShort><ObjectId><ObjectName><ObjectNameShort><BaseName><BaseId>';//<ObjectType>,<ObjectTypeShort>,<ObjectId>,<ObjectName>,<ObjectNameShort>,<BaseName>,<BaseId>

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectId
            + navObject.objectNameFixed
            + navObject.objectNameFixedShort
            + navObject.ExtendedObjectName
            + navObject.ExtendedObjectId)
    })
    test("FileNamePatternPageCustomizations with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternPageCustomizations] = '<ObjectType><ObjectTypeShort><ObjectName><ObjectNameShort><BaseName><BaseId>'; //<ObjectType>, <ObjectTypeShort>, <ObjectName>, <ObjectNameShort>, <BaseName>, <BaseId>

        let navTestObject = NAVTestObjectLibrary.getPageCustomizationWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectNameFixed
            + navObject.objectNameFixedShort
            + navObject.ExtendedObjectName
            + navObject.ExtendedObjectId)
    })
    test("Al File without real code", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getAlFileWithoutCode();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.NAVObjectText, navObject.NAVObjectTextFixed);
        assert.equal(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.equal(navObject.objectName, navObject.objectNameFixed);
        assert.equal(navObject.objectNameFixedShort, '');
    });
});
