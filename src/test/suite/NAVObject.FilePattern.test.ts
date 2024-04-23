import * as assert from 'assert';
import { suite, test } from 'mocha';

import { NAVObject } from '../../NAVObject'
import { WorkspaceFiles } from '../../WorkspaceFiles'
import * as myExtension from '../../extension';
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { Settings } from '../../Settings';
import { settings } from 'cluster';
import { StringFunctions } from '../../StringFunctions'

suite("NAVObject FilePattern Tests", () => {
    test("Filename - FileNamePatterns with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePattern] = '<ObjectType><ObjectTypeShort><ObjectTypeShortPascalCase><ObjectTypeShortUpper><ObjectId><ObjectName><ObjectNameShort>';//<ObjectType>,<ObjectTypeShort>,<ObjectTypeShortUpper>,<ObjectId>,<ObjectName>,<ObjectNameShort>

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.ObjectTypeShortPascalCase
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectId
            + navObject.objectNameFixed
            + navObject.objectNameFixedShort)
    })
    test("Filename - FileNamePatternExtensions with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectType><ObjectTypeShort><ObjectTypeShortPascalCase><ObjectTypeShortUpper><ObjectId><ObjectName><ObjectNameShort><BaseName><BaseId>';//<ObjectType>,<ObjectTypeShort>,<ObjectTypeShortUpper>,<ObjectId>,<ObjectName>,<ObjectNameShort>,<BaseName>,<BaseId>

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.ObjectTypeShortPascalCase
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

        assert.strictEqual(navObject.objectFileNameFixed,
            navObject.objectType
            + navObject.objectTypeShort
            + navObject.objectTypeShort.toUpperCase()
            + navObject.objectNameFixed
            + navObject.objectNameFixedShort
            + navObject.extendedObjectName
            + navObject.extendedObjectId)
    })

    test("FileName - <ObjectTypeShortUpper>", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternPageCustomizations] = '<ObjectTypeShortUpper>'

        let navTestObject = NAVTestObjectLibrary.getPageCustomizationWrongFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectType, navObject.objectTypeShort);
        assert.strictEqual(navObject.objectTypeShort.toUpperCase(), navObject.objectFileNameFixed);

    })

    test("Filename - Rename PageExtension with slash", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithSlashInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFileNameFixed.indexOf('/'), -1); //does not contain slash
    })
    test("Filename - <BaseName> Rename PageExtension with ampersand(&)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notStrictEqual(navObject.objectFileNameFixed.indexOf('&'), -1); //does contain &
        assert.notStrictEqual(navObject.extendedObjectName, navObject.objectName);
    })
    test("Filename - <ObjectName> Rename PageExtension with ampersand(&)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notStrictEqual(navObject.objectFileNameFixed.indexOf('&'), -1); //does contain &
        assert.notStrictEqual(navObject.extendedObjectName, navObject.objectName);
    })
    test("Filename - <BaseNameShort> Rename PageExtension with ampersand(&)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseNameShort>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFileNameFixed.indexOf('&'), -1); //does not contain &
        assert.notStrictEqual(navObject.extendedObjectName, navObject.objectName);
    })
    test("Filename - <ObjectNameShort> Rename PageExtension with ampersand(&)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFileNameFixed.indexOf('&'), -1); //does not contain &
        assert.notStrictEqual(navObject.extendedObjectName, navObject.objectName);
    })

    test("Filename - <BaseName[Short]> Extension Base object With Spaces", () => {
        //Long
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectFileNameFixed.indexOf(' '), -1)

        //Short
        testSettings[Settings.FileNamePatternExtensions] = '<BaseNameShort>.al'

        navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectFileNameFixed.indexOf(' '), -1)
    })

    test("Filename - <prefix> and <suffix>", () => {
        //Long
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'MyPrefix';
        testSettings[Settings.ObjectNameSuffix] = 'MySuffix';
        testSettings[Settings.FileNamePatternExtensions] = '<Prefix><Suffix>.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectFileNameFixed, testSettings[Settings.ObjectNamePrefix] + testSettings[Settings.ObjectNameSuffix] + '.al')
        assert.notStrictEqual(navObject.objectFileName, navObject.objectFileNameFixed)
    })

    test("Filename - Rename PageExtension with WeirdChars", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>_<ObjectName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithWeirdChars();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.notStrictEqual(navObject.objectFileNameFixed.indexOf('µ'), -1); //does still contain µ
        assert.notStrictEqual(navObject.objectFileNameFixed.indexOf('åäö'), -1); //does still contain åäö

        assert.strictEqual(navObject.objectFileNameFixed.indexOf('<'), -1); //does not contain slash
        assert.strictEqual(navObject.objectFileNameFixed.indexOf('>'), -1); //does not contain slash
        assert.strictEqual(navObject.objectFileNameFixed.indexOf(':'), -1); //does not contain slash
        assert.strictEqual(navObject.objectFileNameFixed.indexOf('"'), -1); //does not contain slash
        assert.strictEqual(navObject.objectFileNameFixed.indexOf('/'), -1); //does not contain slash
        assert.strictEqual(navObject.objectFileNameFixed.indexOf('\\'), -1); //does not contain slash
        assert.strictEqual(navObject.objectFileNameFixed.indexOf('|'), -1); //does not contain slash
        assert.strictEqual(navObject.objectFileNameFixed.indexOf('?'), -1); //does not contain slash
        assert.strictEqual(navObject.objectFileNameFixed.indexOf('*'), -1); //does not contain slash

    })

    test("Filename - Rename PageExtension with double qoutes in object name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>_<ObjectName>.PageExt.al'

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithQuotesInObjectName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectId, '')
    })

    test("Filename - Rename Page with Brackets in the object name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>_<ObjectName>.al'

        let navTestObject = NAVTestObjectLibrary.getObjectWithBracketsInName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFileNameFixed.indexOf('('), -1);
        assert.strictEqual(navObject.objectFileNameFixed.indexOf(')'), -1);

    })

    test("Filename - Rename PageExtension with Prefix in object name, and remove prefix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNamePrefix] = 'CRS ';
        testSettings[Settings.RemovePrefixFromFilename] = true;
        testSettings[Settings.RemoveUnderscoreFromFilename] = false;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithPrefix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'SalespersonsPurchasers__Salespersons_Purchasers.al')
        assert.strictEqual(navObject.objectNameFixed, 'CRS Salespersons/Purchasers')
    })

    test("Filename - Rename PageExtension with Prefix in object name, and remove prefix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNamePrefix] = 'CRS ';
        testSettings[Settings.RemovePrefixFromFilename] = true;
        testSettings[Settings.RemoveUnderscoreFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithPrefix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'SalespersonsPurchasersSalespersonsPurchasers.al')
        assert.strictEqual(navObject.objectNameFixed, 'CRS Salespersons/Purchasers')
    })

    test("Filename - Rename PageExtension with Prefix in object name, and remove prefix in filename (data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNamePrefix] = 'CRS ';
        testSettings[Settings.RemovePrefixFromFilename] = true;
        testSettings[Settings.RemoveUnderscoreFromFilename] = false;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithPrefix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), false);
        assert.strictEqual(navObject.objectNameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true);
    })


    test("Filename - Rename PageExtension with Suffix in object name, and remove suffix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNameSuffix] = ' CRS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;
        testSettings[Settings.RemoveUnderscoreFromFilename] = false;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'SalespersonsPurchasers__Salespersons_Purchasers.al')
        assert.strictEqual(navObject.objectNameFixed, 'Salespersons/Purchasers CRS')
    })

    test("Filename - Rename PageExtension with Suffix in object name, and remove suffix in filename (data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNameSuffix] = ' CRS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;
        testSettings[Settings.RemoveUnderscoreFromFilename] = false;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), false)
        assert.strictEqual(navObject.objectNameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
    })


    test("Filename - Rename PageExtension with both Prefix and Suffix in object name, and remove Prefix and Suffix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>__<ObjectName>.al';
        testSettings[Settings.ObjectNamePrefix] = 'PCRS ';
        testSettings[Settings.RemovePrefixFromFilename] = true;
        testSettings[Settings.RemoveUnderscoreFromFilename] = false;

        testSettings[Settings.ObjectNameSuffix] = ' SCRS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithPrefixAndSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'SalespersonsPurchasers__Salespersons_Purchasers.al')
        assert.strictEqual(navObject.objectNameFixed, 'PCRS Salespersons/Purchasers SCRS')
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
        assert.strictEqual(navObject.objectFileNameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), false)
        assert.strictEqual(navObject.objectFileNameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), false)
        assert.strictEqual(navObject.objectNameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.strictEqual(navObject.objectNameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
    })


    test("PageExtension - ExtensionObjectNamePattern - Automatic Naming with settings", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.ExtensionObjectNamePattern] = '<Prefix><Suffix><ObjectType><ObjectTypeShort>'; //<ObjectTypeShortUpper><ObjectId><BaseName><BaseNameShort><BaseId>

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectNameFixed,
            testSettings[Settings.ObjectNamePrefix]
            + testSettings[Settings.ObjectNameSuffix]
            + navObject.objectType
            + navObject.objectTypeShort
        )
    })
    test("ReportExtension - ExtensionObjectNamePattern - Automatic Naming with settings", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.ExtensionObjectNamePattern] = '<Prefix><Suffix><ObjectType><ObjectTypeShort>'; //<ObjectTypeShortUpper><ObjectId><BaseName><BaseNameShort><BaseId>

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectNameFixed,
            testSettings[Settings.ObjectNamePrefix]
            + testSettings[Settings.ObjectNameSuffix]
            + navObject.objectType
            + navObject.objectTypeShort
        )
    })

    test("PageExtension - ExtensionObjectNamePattern - Ignore Too Long Object Name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ExtensionObjectNamePattern] = 'This is a pattern that makes the object name far too long, so it should be ignored';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectName.length, navObject.objectNameFixed.length);
        assert.strictEqual(true, navObject.objectNameFixed.length > 30)
    })

    test("PageExtension - ExtensionObjectNamePattern - Ignore too Long - With Very Long Base name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ExtensionObjectNamePattern] = '<BaseNameShort> Ext PTE';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithLongBaseName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navObject.objectFileNameFixed)
        assert.strictEqual(navObject2.objectName.length, navObject.objectName.length);
        assert.strictEqual(navObject2.objectName, navObject.objectName);
        assert.strictEqual(true, navObject2.objectName.length <= 30)
    })

    test("ReportExtension - Automatic Naming with settings", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.ExtensionObjectNamePattern] = '<ObjectId><BaseName><BaseNameShort><BaseId>';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(
            navObject.objectNameFixed,
            navObject.objectId
            + navObject.extendedObjectName
            + navObject.extendedObjectNameFixedShort
            + navObject.extendedObjectId)
    })

    test("TableExtension - Automatic Naming with settings", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.ExtensionObjectNamePattern] = '<ObjectId><BaseName><BaseNameShort><BaseId>';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(
            navObject.objectNameFixed,
            // testSettings[Settings.ObjectNamePrefix]
            // + testSettings[Settings.ObjectNameSuffix]
            // + navObject.objectType
            // + navObject.objectTypeShort
            // + navObject.objectTypeShort.toUpperCase()
            // + 
            navObject.objectId
            + navObject.extendedObjectName
            + navObject.extendedObjectNameFixedShort
            + navObject.extendedObjectId)
    })


    test("FileName - Extension Object with which would be too", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort><ObjectTypeShortPascalCase>';
        testSettings[Settings.ExtensionObjectNamePattern] = '<BaseNameShort> Ext BASE';

        let navTestObject = NAVTestObjectLibrary.getExtensionObjectWithVeryLongObjectName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(true, navObject.objectFileNameFixed.startsWith(StringFunctions.removeAllButAlfaNumeric(navObject.objectName)))
    })
    test("FileName - Extension Object with which would be too (not DataAgnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort><ObjectTypeShortPascalCase>';
        testSettings[Settings.ExtensionObjectNamePattern] = '<BaseNameShort> Ext BASE';

        let navTestObject = NAVTestObjectLibrary.getExtensionObjectWithVeryLongObjectName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectFileNameFixed, 'BlankPurchOrderSubfrmExtBASEPageExt')
    })
    test("FileName - Simple Interface (not DataAgnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePattern] = '<ObjectNameShort>.<ObjectTypeShortPascalCase>.al';

        let navTestObject = NAVTestObjectLibrary.getSimpleInterface()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectFileNameFixed, 'IBallColorIdentifier.Interface.al')
    })
    test("FileName - Simple Entitlement (not DataAgnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.FileNamePattern] = '<ObjectNameShort>.<ObjectTypeShortPascalCase>.al';

        let navTestObject = NAVTestObjectLibrary.getSimpleEntitlement();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFileNameFixed, 'TheEntitlement.Entitlement.al');
    });

    test("Filename - Rename PageExtension with Suffix with underscore in object name, and remove suffix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePattern] = '<ObjectName>.al';
        testSettings[Settings.ObjectNameSuffix] = '_EVAS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;

        let navTestObject = NAVTestObjectLibrary.getTestCodeunitWithPrefix(); //codeunit 50101 "Vault Management_EVAS"
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'Vault Management.al')
        assert.strictEqual(navObject.objectNameFixed, 'Vault Management_EVAS')
    })
    test("Filename - Rename PageExtension with Suffix with underscore in object name, and remove suffix in filename (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePattern] = '<ObjectName>.al';
        testSettings[Settings.ObjectNameSuffix] = '_EVAS';
        testSettings[Settings.RemoveSuffixFromFilename] = true;
        testSettings[Settings.RemoveUnderscoreFromFilename] = false;

        let navTestObject = NAVTestObjectLibrary.getTestCodeunitWithPrefix(); //codeunit 50101 "Vault Management_EVAS"
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'Vault Management.al')
        assert.strictEqual(navObject.objectNameFixed, 'Vault Management_EVAS')
    })

    test("Filename - Rename PageExtension with underscore - remove underscore (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePattern] = '<ObjectName>.al';

        let navTestObject = NAVTestObjectLibrary.getTestCodeunitWithPrefix(); //codeunit 50101 "Vault Management_EVAS"
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'Vault ManagementEVAS.al')
        assert.strictEqual(navObject.objectNameFixed, 'Vault Management_EVAS')
    })

    test("Filename - Rename PageExtension with underscore - remove underscore (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePattern] = '<ObjectName>.al';
        testSettings[Settings.RemoveUnderscoreFromFilename] = false;

        let navTestObject = NAVTestObjectLibrary.getTestCodeunitWithPrefix(); //codeunit 50101 "Vault Management_EVAS"
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'Vault Management_EVAS.al')
        assert.strictEqual(navObject.objectNameFixed, 'Vault Management_EVAS')
    })

    test("Filename - Rename PageExtension with underscore - remove underscore (not data-agnostic)", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePattern] = '<ObjectNameShort>.al';
        testSettings[Settings.RemoveUnderscoreFromFilename] = false;

        let navTestObject = NAVTestObjectLibrary.getTestCodeunitWithPrefix(); //codeunit 50101 "Vault Management_EVAS"
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);
        assert.strictEqual(navObject.objectFileNameFixed, 'VaultManagement_EVAS.al')
        assert.strictEqual(navObject.objectNameFixed, 'Vault Management_EVAS')
    })
    test("Filename - Rename ReportExtension", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>.al';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFileNameFixed, 'CustomerTop10ListExt.al')
    })
    test("Filename - Object with comments", () => {
        // bug report: https://github.com/waldo1001/crs-al-language-extension/issues/167
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FileNamePatternExtensions] = '<ObjectNameShort>.<ObjectTypeShortPascalCase>.al';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtensionWithSummaryComments();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFileNameFixed, 'CustomerTop10ListExt.ReportExt.al')
    })
    test("Folder path - Default folder path", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFolderPathFixed,
            testSettings[Settings.AlSubFolderName] + '\\' +
            navObject.objectType.toLowerCase() + '\\');
    })
    test("Folder path - Default folder path with control addin", () => {
        let testSettings = Settings.GetConfigSettings(null)

        let navTestObject = NAVTestObjectLibrary.getControlAddinObject();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFolderPathFixed,
            testSettings[Settings.AlSubFolderName] + '\\' +
            navObject.objectType.toLowerCase() + '\\' +
            navObject.objectNameFixedShort);
    })
    test("Folder path - Custom folder path with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)

        testSettings[Settings.FolderPathPattern] = '<AlSubFolder>\\<Prefix>\\<ObjectType>';

        let navTestObject = NAVTestObjectLibrary.getTestCodeunitWithPrefix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectFolderPathFixed,
            testSettings[Settings.AlSubFolderName] + '\\' +
            testSettings[Settings.ObjectNamePrefix] + '\\' +
            navObject.objectType.toLowerCase());
    })
})
