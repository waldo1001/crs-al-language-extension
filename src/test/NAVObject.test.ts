7//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import { suite, test } from 'mocha';

import { NAVObject } from '../NAVObject'
import { WorkspaceFiles } from '../WorkspaceFiles'
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
    test("Tableextension - set prefix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.tableFields[0].nameFixed, testSettings[Settings.ObjectNamePrefix] + navObject.tableFields[0].name)
        assert.equal(navObject.tableFields[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.equal(navObject.tableFields.length, 3)
        navObject.tableFields.forEach(field => {
            assert.equal(field.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.tableFields.forEach(field => {
            assert.equal(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })
    });
    test("Table - avoid setting prefix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableWithWrongFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.tableFields.length, 3)
        //assert.equal(navObject.tableFields[0].nameFixed, navObject.tableFields[0].name)
        //assert.equal(navObject.tableFields[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), false)
        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.tableFields.forEach(field => {
            assert.equal(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), false)
        })
    });
    test("Pageextension - avoid setting prefix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.tableFields.length, 0)
        //assert.equal(navObject.tableFields[0].nameFixed, navObject.tableFields[0].name)
        //assert.equal(navObject.tableFields[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), false)

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
        navObject.tableFields.forEach(field => {
            assert.equal(field.name, field.nameFixed)
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

    test("Filename - FileNamePatterns with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePattern] = '<ObjectType><ObjectTypeShort><ObjectTypeShortUpper><ObjectId><ObjectName><ObjectNameShort>';//<ObjectType>,<ObjectTypeShort>,<ObjectTypeShortUpper>,<ObjectId>,<ObjectName>,<ObjectNameShort>

        let navTestObject = NAVTestObjectLibrary.getObjectNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectId
            + navObject.objectNameFixed
            + navObject.objectNameFixedShort)
    })
    test("Filename - FileNamePatternExtensions with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectType><ObjectTypeShort><ObjectTypeShortUpper><ObjectId><ObjectName><ObjectNameShort><BaseName><BaseId>';//<ObjectType>,<ObjectTypeShort>,<ObjectTypeShortUpper>,<ObjectId>,<ObjectName>,<ObjectNameShort>,<BaseName>,<BaseId>

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectId
            + navObject.objectNameFixed
            + navObject.objectNameFixedShort
            + navObject.extendedObjectName
            + navObject.extendedObjectId)
    })
    test("Filename - FileNamePatternPageCustomizations with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternPageCustomizations] = '<ObjectType><ObjectTypeShort><ObjectTypeShortUpper><ObjectName><ObjectNameShort><BaseName><BaseId>'; //<ObjectType>, <ObjectTypeShort>, <ObjectTypeShortUpper>,<ObjectName>, <ObjectNameShort>, <BaseName>, <BaseId>

        let navTestObject = NAVTestObjectLibrary.getPageCustomizationWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectNameFixed
            + navObject.objectNameFixedShort
            + navObject.extendedObjectName
            + navObject.extendedObjectId)
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
    test("FileName - <ObjectTypeShortUpper>", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternPageCustomizations] = '<ObjectTypeShortUpper>'

        let navTestObject = NAVTestObjectLibrary.getPageCustomizationWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectType, navObject.objectTypeShort);
        assert.equal(navObject.objectTypeShort.toUpperCase(), navObject.objectFileNameFixed);

    })
    test("Reorganize Test Codeunits to 'test'-folder", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getTestCodeunit()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navTestObject2 = NAVTestObjectLibrary.getNormalCodeunitWithLongName()
        let navObject2 = new NAVObject(navTestObject2.ObjectText, testSettings, navTestObject2.ObjectFileName)

        assert.equal(navObject.objectCodeunitSubType.toLowerCase(), 'test');
        assert.equal(navObject2.objectCodeunitSubType, null);
    })
    test("Filename - Rename PageExtension with slash", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithSlashInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectFileNameFixed.indexOf('/'), -1); //does not contain slash
    })
    test("Filename - <BaseName> Rename PageExtension with ampersand(&)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notEqual(navObject.objectFileNameFixed.indexOf('&'), -1); //does contain &
        assert.notEqual(navObject.extendedObjectName, navObject.objectName);
    })
    test("Filename - <ObjectName> Rename PageExtension with ampersand(&)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notEqual(navObject.objectFileNameFixed.indexOf('&'), -1); //does contain &
        assert.notEqual(navObject.extendedObjectName, navObject.objectName);
    })
    test("Filename - <BaseNameShort> Rename PageExtension with ampersand(&)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseNameShort>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectFileNameFixed.indexOf('&'), -1); //does not contain &
        assert.notEqual(navObject.extendedObjectName, navObject.objectName);
    })
    test("Filename - <ObjectNameShort> Rename PageExtension with ampersand(&)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectFileNameFixed.indexOf('&'), -1); //does not contain &
        assert.notEqual(navObject.extendedObjectName, navObject.objectName);
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
    test("Filename - <BaseName[Short]> Extension Base object With Spaces", () => {
        //Long
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectFileNameFixed.indexOf(' '), -1)

        //Short
        testSettings[Settings.FileNamePatternExtensions] = '<BaseNameShort>.al'

        navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileName()
        navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed.indexOf(' '), -1)
    })
    test("Filename - <prefix> and <suffix>", () => {
        //Long
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'MyPrefix';
        testSettings[Settings.ObjectNameSuffix] = 'MySuffix';
        testSettings[Settings.FileNamePatternExtensions] = '<Prefix><Suffix>.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed, testSettings[Settings.ObjectNamePrefix] + testSettings[Settings.ObjectNameSuffix] + '.al')
        assert.notEqual(navObject.objectFileName, navObject.objectFileNameFixed)
    })

    test("Filename - Rename PageExtension with WeirdChars", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithWeirdChars();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectFileNameFixed.indexOf('<'), -1); //does not contain slash
        assert.equal(navObject.objectFileNameFixed.indexOf('>'), -1); //does not contain slash
        assert.equal(navObject.objectFileNameFixed.indexOf(':'), -1); //does not contain slash
        assert.equal(navObject.objectFileNameFixed.indexOf('"'), -1); //does not contain slash
        assert.equal(navObject.objectFileNameFixed.indexOf('/'), -1); //does not contain slash
        assert.equal(navObject.objectFileNameFixed.indexOf('\\'), -1); //does not contain slash
        assert.equal(navObject.objectFileNameFixed.indexOf('|'), -1); //does not contain slash
        assert.equal(navObject.objectFileNameFixed.indexOf('?'), -1); //does not contain slash
        assert.equal(navObject.objectFileNameFixed.indexOf('*'), -1); //does not contain slash

    })
});
