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
import { settings } from 'cluster';


// Defines a Mocha test suite to group tests of similar kind together
suite("NAVObject Tests", () => {

    test("Object without prefix - No prefix to set", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = null;

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.equal(navObject.objectActions[0].name, navObject.objectActions[0].nameFixed)

    });

    test("Page without prefix - set prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.equal(navObject.objectActions[0].name, navObject.objectActions[0].nameFixed) //don't rename actions on new pages
    });

    test("PageExtension without prefix - set prefix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
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

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
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
    test("Pageextension - set suffix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectActions[0].nameFixed, navObject.objectActions[0].name + testSettings[Settings.ObjectNameSuffix])
        assert.equal(navObject.objectActions[0].nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        assert.equal(navObject.objectActions.length, 3)
        navObject.objectActions.forEach(action => {
            assert.equal(action.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.equal(action.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
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
    test("Tableextension - set suffix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.tableFields[0].nameFixed, navObject.tableFields[0].name + testSettings[Settings.ObjectNameSuffix])
        assert.equal(navObject.tableFields[0].nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        assert.equal(navObject.tableFields.length, 3)
        navObject.tableFields.forEach(field => {
            assert.equal(field.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.tableFields.forEach(field => {
            assert.equal(field.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })
    });
    test("Table - avoid setting prefix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableWithWrongFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.tableFields.length, 0);

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.tableFields.forEach(field => {
            assert.equal(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), false) //does not start with prefix
        })
    });
    test("Page - avoid setting prefix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectActions.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(field => {
            assert.equal(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), false) //does not start with prefix
        })
    });
    test("Pageextension - avoid setting double prefixes to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithWaldoPrefixWithActions();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectActions.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.equal(action.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true);
            assert.equal(action.name, action.nameFixed);
        })
    });
    test("Page - avoid removing prefixes from actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageWithWaldoPrefixWrongName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectActions.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.equal(action.name, action.nameFixed);
        })
    });
    test("Object with prefix - No prefix to set", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageWithWaldoPrefixWrongName()
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

        let navTestObject = NAVTestObjectLibrary.getPageWithWaldoPrefixWrongName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileName.endsWith(testSettings[Settings.ObjectNameSuffix]), false)
        assert.notEqual(navObject.objectFileNameFixed.indexOf(testSettings[Settings.ObjectNameSuffix]), -1)
    });

    test("Filename - FileNamePatterns with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePattern] = '<ObjectType><ObjectTypeShort><ObjectTypeShortUpper><ObjectId><ObjectName><ObjectNameShort>';//<ObjectType>,<ObjectTypeShort>,<ObjectTypeShortUpper>,<ObjectId>,<ObjectName>,<ObjectNameShort>

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions()
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

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectFileNameFixed.indexOf(' '), -1)

        //Short
        testSettings[Settings.FileNamePatternExtensions] = '<BaseNameShort>.al'

        navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed.indexOf(' '), -1)
    })
    test("Filename - <prefix> and <suffix>", () => {
        //Long
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'MyPrefix';
        testSettings[Settings.ObjectNameSuffix] = 'MySuffix';
        testSettings[Settings.FileNamePatternExtensions] = '<Prefix><Suffix>.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed, testSettings[Settings.ObjectNamePrefix] + testSettings[Settings.ObjectNameSuffix] + '.al')
        assert.notEqual(navObject.objectFileName, navObject.objectFileNameFixed)
    })

    test("Filename - Rename PageExtension with WeirdChars", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>_<ObjectName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithWeirdChars();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notEqual(navObject.objectFileNameFixed.indexOf('µ'), -1); //does still contain µ
        assert.notEqual(navObject.objectFileNameFixed.indexOf('åäö'), -1); //does still contain åäö

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


    test("Filename - Rename PageExtension with double qoutes in object name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>_<ObjectName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithQuotesInObjectName();
        try {
            let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
            throw new Error('Object Name parsing accepted double quotes in name.');
        } catch (error) {
            assert.equal(error.message, `File '${navTestObject.ObjectFileName}' does not have valid object names. Maybe it got double quotes (") in the object name?`)

        }


    })


    test("Filename - Rename Page with double qoutes in object name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>_<ObjectName>.al'

        let navTestObject = NAVTestObjectLibrary.getPageWithQuotesInObjectName();
        try {
            let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
            throw new Error('Object Name parsing accepted double quotes in name.');
        } catch (error) {
            assert.equal(error.message, `File '${navTestObject.ObjectFileName}' does not have valid object name, it has too many double quotes (")`)

        }
    })

    test("Filename - Rename Page with Brackets in the object name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>_<ObjectName>.al'

        let navTestObject = NAVTestObjectLibrary.getObjectWithBracketsInName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectFileNameFixed.indexOf('('), -1);
        assert.equal(navObject.objectFileNameFixed.indexOf(')'), -1);

    })

    test("Filename - Rename PageExtension with Prefix in object name, and remove prefix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNamePrefix] = 'CRS ';
        testSettings[Settings.RemovePrefixFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithPrefix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.equal(navObject.objectFileNameFixed, 'SalespersonsPurchasers__Salespersons_Purchasers.al')
        assert.equal(navObject.objectNameFixed, 'CRS Salespersons/Purchasers')
    })

    test("Filename - Rename PageExtension with Prefix in object name, and remove prefix in filename (data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNamePrefix] = 'CRS ';
        testSettings[Settings.RemovePrefixFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithPrefix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.equal(navObject.objectFileNameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), false);
        assert.equal(navObject.objectNameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true);
    })


    test("Filename - Rename PageExtension with Suffix in object name, and remove suffix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNameSuffix] = ' CRS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.equal(navObject.objectFileNameFixed, 'SalespersonsPurchasers__Salespersons_Purchasers.al')
        assert.equal(navObject.objectNameFixed, 'Salespersons/Purchasers CRS')
    })

    test("Filename - Rename PageExtension with Suffix in object name, and remove suffix in filename (data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNameSuffix] = ' CRS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.equal(navObject.objectFileNameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), false)
        assert.equal(navObject.objectNameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
    })


    test("Filename - Rename PageExtension with both Prefix and Suffix in object name, and remove Prefix and Suffix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNamePrefix] = 'PCRS ';
        testSettings[Settings.RemovePrefixFromFilename] = true;

        testSettings[Settings.ObjectNameSuffix] = ' SCRS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithPrefixAndSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.equal(navObject.objectFileNameFixed, 'SalespersonsPurchasers__Salespersons_Purchasers.al')
        assert.equal(navObject.objectNameFixed, 'PCRS Salespersons/Purchasers SCRS')
    })

    test("Filename - Rename PageExtension with both Prefix and Suffix in object name, and remove Prefix and Suffix in filename (data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNamePrefix] = 'PCRS ';
        testSettings[Settings.RemovePrefixFromFilename] = true;

        testSettings[Settings.ObjectNameSuffix] = ' SCRS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithPrefixAndSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.equal(navObject.objectFileNameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), false)
        assert.equal(navObject.objectFileNameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), false)
        assert.equal(navObject.objectNameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.equal(navObject.objectNameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
    })

    test("PageExtension - Automatic Naming with settings", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.ExtensionObjectNamePattern] = '<Prefix><Suffix><ObjectType><ObjectTypeShort><ObjectTypeShortUpper><ObjectId><BaseName><BaseNameShort><BaseId>';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectNameFixed,
            testSettings[Settings.ObjectNamePrefix]
            + testSettings[Settings.ObjectNameSuffix]
            + navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectId
            + navObject.extendedObjectName
            + navObject.extendedObjectNameFixedShort
            + navObject.extendedObjectId)
    })

    test("PageExtension - Automatic Naming without settings", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectNameFixed, navObject.objectName)
    })

    test("TableExtension - Automatic Naming with settings", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.ExtensionObjectNamePattern] = '<Prefix><Suffix><ObjectType><ObjectTypeShort><ObjectTypeShortUpper><ObjectId><BaseName><BaseNameShort><BaseId>';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectNameFixed,
            testSettings[Settings.ObjectNamePrefix]
            + testSettings[Settings.ObjectNameSuffix]
            + navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectId
            + navObject.extendedObjectName
            + navObject.extendedObjectNameFixedShort
            + navObject.extendedObjectId)
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
});
