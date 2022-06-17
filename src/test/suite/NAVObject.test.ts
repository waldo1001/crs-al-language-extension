7//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import { suite, test } from 'mocha';

import { NAVObject } from '../../NAVObject'
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { Settings } from '../../Settings';
import { DynamicsNAV } from '../../DynamicsNAV';


// Defines a Mocha test suite to group tests of similar kind together
suite("NAVObject General Tests", () => {

    test("Al File without real code", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getAlFileWithoutCode();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.NAVObjectText, navObject.NAVObjectTextFixed);
        assert.strictEqual(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.strictEqual(navObject.objectName, navObject.objectNameFixed);
        assert.strictEqual(navObject.objectNameFixedShort, '');
    });

    test("Reorganize Test Codeunits to 'test'-folder", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getTestCodeunit()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navTestObject2 = NAVTestObjectLibrary.getNormalCodeunitWithLongName()
        let navObject2 = new NAVObject(navTestObject2.ObjectText, testSettings, navTestObject2.ObjectFileName)

        assert.strictEqual(navObject.objectCodeunitSubType.toLowerCase(), 'test');
        assert.strictEqual(navObject2.objectCodeunitSubType, null);
    })

    test("Filename - <ObjectName[Short]> Normal object With Spaces", () => {
        //Long
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePattern] = '<ObjectName>.al'

        let navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectFileNameFixed.indexOf(' '), -1)

        //Short
        testSettings[Settings.FileNamePattern] = '<ObjectNameShort>.al'

        navTestObject = NAVTestObjectLibrary.getNormalCodeunitWithLongName()
        navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectFileNameFixed.indexOf(' '), -1)
    })

    test("Filename - Wrong Extension Casing", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.GetFileNameWithWrongCasing();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFileNameFixed.toLocaleLowerCase().endsWith('.al'), true);
    })



    test("PageExtension - Automatic Naming without settings", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectNameFixed, navObject.objectName)
    })

    test("TableExtension - Automatic Naming without settings", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectNameFixed, navObject.objectName)
    })

    test("Case Sensitive Object Types", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getPascalCasedObjectType_Report()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectType.toLocaleLowerCase(), 'report')
    })
    test("Filename - Rename enum", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getEnumObject();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notStrictEqual(navObject.extendedObjectName, navObject.objectName);
    })
    test("Filename - Rename enumExtension", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getEnumExtensionObject();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notStrictEqual(navObject.extendedObjectName, navObject.objectName);
    })
    test("Comments in table", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.FileNamePattern] = '<Prefix><Suffix><ObjectType><ObjectTypeShort><ObjectTypeShortPascalCase><ObjectTypeShortUpper><ObjectId>';

        let navTestObject = NAVTestObjectLibrary.getTableWithComments();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectType.toLowerCase().startsWith('table'), true);
        assert.strictEqual(navObject.objectFileNameFixed,
            testSettings[Settings.ObjectNamePrefix]
            + testSettings[Settings.ObjectNameSuffix]
            + navObject.objectType
            + navObject.objectTypeShort
            + navObject.ObjectTypeShortPascalCase
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectId)
    })

    test("TableExtension - Fields with keyword-names", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed)
        navObject2.tableFields.forEach(tableField => {
            if (DynamicsNAV.getAllKeywordsLowerCased().indexOf(tableField.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${tableField.name}"`
                //console.log(tableField.fullFieldTextFixed);
                assert.strictEqual((tableField.fullFieldText.indexOf(expectedValueToFind) > -1), true, `"${tableField.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${tableField.fullFieldText}"`)
            }
        });
    })
    test("TableExtension - Fields with keyword-names (with Prefix)", () => {
        //same as above, but now with prefix
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed)
        navObject2.tableFields.forEach(tableField => {
            if (DynamicsNAV.getAllKeywordsLowerCased().indexOf(tableField.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${tableField.name}"`
                //console.log(tableField.fullFieldTextFixed);
                assert.strictEqual((tableField.fullFieldText.indexOf(expectedValueToFind) > -1), true, `"${tableField.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${tableField.fullFieldText}"`)
            }
        });
    })
    test("Table - Fields with keyword-names", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getTableWrongFileNameAndKeyWord()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed)
        navObject2.tableFields.forEach(tableField => {
            if (DynamicsNAV.getAllKeywordsLowerCased().indexOf(tableField.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${tableField.name}"`
                //console.log(tableField.fullFieldTextFixed);
                assert.strictEqual((tableField.fullFieldText.indexOf(expectedValueToFind) > -1), true, `"${tableField.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${tableField.fullFieldText}"`)
            }
        });
    })
    test("Table - Fields with keyword-names (With Prefix)", () => {
        //same as above, but now with prefix
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableWrongFileNameAndKeyWord()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed)
        navObject2.tableFields.forEach(tableField => {
            if (DynamicsNAV.getAllKeywordsLowerCased().indexOf(tableField.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${tableField.name}"`
                //console.log(tableField.fullFieldTextFixed);
                assert.strictEqual((tableField.fullFieldText.indexOf(expectedValueToFind) > -1), true, `"${tableField.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${tableField.fullFieldText}"`)
            }
        });
    })
    test("Table - Fields with special characters in names", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getTableFieldNamesWithSpecialCharacters();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        navObject.tableFields.forEach(tableField => {
            if (tableField.name === '') {
                assert.fail('Table field name contains unrecognized characters.');
            }
        });
    });
    test("Page - Fields with special characters in names", () => {
        let testSettings = Settings.GetConfigSettings(null);

        let navTestObject = NAVTestObjectLibrary.getPageFieldNamesWithSpecialCharacters();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.pageFields.length, 4, "The system should recognize 4 fields");
    });
    test("Page - Actions with keyword-names (With Prefix)", () => {
        //TODO: this should be changed so that transaction(false) functioncall isn't going to get a "fix"
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageWithWaldoPrefixWrongName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed)
        navObject2.objectActions.forEach(pageAction => {
            if (DynamicsNAV.getAllKeywordsLowerCased().indexOf(pageAction.name.toLowerCase()) != -1) {
                var expectedValueToFind = `"${pageAction.name}"`
                //console.log(pageAction.fullFieldTextFixed);
                assert.strictEqual((pageAction.fullActionText.indexOf(expectedValueToFind) > -1), true, `"${pageAction.name}" is a keyword and should be surrounded with quotes, while this is the fixed text: "${pageAction.fullActionText}"`)
            }
        });
    })

});
