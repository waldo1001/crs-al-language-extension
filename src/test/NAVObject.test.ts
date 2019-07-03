7//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import { suite, test } from 'mocha';

import { NAVObject } from '../NAVObject'
import { WorkspaceFiles } from '../WorkspaceFiles'
import * as myExtension from '../extension';
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { Settings } from '../Settings';
import { settings } from 'cluster';


// Defines a Mocha test suite to group tests of similar kind together
suite("NAVObject General Tests", () => {

    test("Al File without real code", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getAlFileWithoutCode();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.NAVObjectText, navObject.NAVObjectTextFixed);
        assert.equal(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.equal(navObject.objectName, navObject.objectNameFixed);
        assert.equal(navObject.objectNameFixedShort, '');
    });

    test("Reorganize Test Codeunits to 'test'-folder", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getTestCodeunit()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navTestObject2 = NAVTestObjectLibrary.getNormalCodeunitWithLongName()
        let navObject2 = new NAVObject(navTestObject2.ObjectText, testSettings, navTestObject2.ObjectFileName)

        assert.equal(navObject.objectCodeunitSubType.toLowerCase(), 'test');
        assert.equal(navObject2.objectCodeunitSubType, null);
    })

    test("Filename - <ObjectName[Short]> Normal object With Spaces", () => {
        //Long
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePattern] = '<ObjectName>.al'

        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectFileNameFixed.indexOf(' '), -1)

        //Short
        testSettings[Settings.FileNamePattern] = '<ObjectNameShort>.al'

        navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName()
        navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed.indexOf(' '), -1)
    })

    test("Filename - Wrong Extension Casing", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.GetFileNameWithWrongCasing();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectFileNameFixed.toLocaleLowerCase().endsWith('.al'), true);
    })



    test("PageExtension - Automatic Naming without settings", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectNameFixed, navObject.objectName)
    })

    test("TableExtension - Automatic Naming without settings", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectNameFixed, navObject.objectName)
    })

    test("Case Sensitive Object Types", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getPascalCasedObjectType_Report()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectType.toLocaleLowerCase(), 'report')
    })
    test("Filename - Rename enum", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getEnumObject();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notEqual(navObject.extendedObjectName, navObject.objectName);
        assert.equal(navObject.objectFileNameFixed.toLowerCase().startsWith('enum'), true);
    })
    test("Filename - Rename enumExtension", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getEnumExtensionObject();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notEqual(navObject.extendedObjectName, navObject.objectName);
        assert.equal(navObject.objectFileNameFixed.toLowerCase().startsWith('enum'), true);
    })
    test("Comments in table", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.FileNamePattern] = '<Prefix><Suffix><ObjectType><ObjectTypeShort><ObjectTypeShortUpper><ObjectId>';

        let navTestObject = NAVTestObjectLibrary.getTableWithComments();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectType.toLowerCase().startsWith('table'), true);
        assert.equal(navObject.objectFileNameFixed,
            testSettings[Settings.ObjectNamePrefix]
            + testSettings[Settings.ObjectNameSuffix]
            + navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectId)
    })
});
