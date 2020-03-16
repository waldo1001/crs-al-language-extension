import * as assert from 'assert';
import { suite, test } from 'mocha';

import { NAVObject } from '../NAVObject'
import { WorkspaceFiles } from '../WorkspaceFiles'
import * as myExtension from '../extension';
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { Settings } from '../Settings';
import { settings } from 'cluster';

suite("NAVObject FilePattern Tests", () => {
    test("Filename - FileNamePatterns with prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePattern] = '<ObjectType><ObjectTypeShort><ObjectTypeShortPascalCase><ObjectTypeShortUpper><ObjectId><ObjectName><ObjectNameShort>';//<ObjectType>,<ObjectTypeShort>,<ObjectTypeShortUpper>,<ObjectId>,<ObjectName>,<ObjectNameShort>

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectFileNameFixed,
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

        assert.equal(navObject.objectFileNameFixed,
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

        assert.equal(navObject.objectFileNameFixed,
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

        assert.notEqual(navObject.objectType, navObject.objectTypeShort);
        assert.equal(navObject.objectTypeShort.toUpperCase(), navObject.objectFileNameFixed);

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
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectId, '')
    })


    test("Filename - Rename Page with double qoutes in object name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.FileNamePatternExtensions] = '<BaseName>_<ObjectName>.al'

        let navTestObject = NAVTestObjectLibrary.getPageWithQuotesInObjectName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.equal(navObject.objectId, '')
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


    test("PageExtension - ExtensionObjectNamePattern - Automatic Naming with settings", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.ExtensionObjectNamePattern] = '<Prefix><Suffix><ObjectType><ObjectTypeShort>'; //<ObjectTypeShortUpper><ObjectId><BaseName><BaseNameShort><BaseId>

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.objectNameFixed,
            testSettings[Settings.ObjectNamePrefix]
            + testSettings[Settings.ObjectNameSuffix]
            + navObject.objectType
            + navObject.objectTypeShort
            // + navObject.objectTypeShort.toUpperCase()
            // + navObject.objectId
            // + navObject.extendedObjectName
            // + navObject.extendedObjectNameFixedShort
            // + navObject.extendedObjectId
        )
    })

    test("PageExtension - ExtensionObjectNamePattern - Ignore Too Long Object Name", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ExtensionObjectNamePattern] = 'This is a pattern that makes the object name far too long, so it should be ignored';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithAmpersandInFileName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notEqual(navObject.objectName.length, navObject.objectNameFixed.length);
        assert.equal(true, navObject.objectNameFixed.length > 30)
    })

    test("TableExtension - Automatic Naming with settings", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.ObjectNameSuffix] = 'waldo';
        testSettings[Settings.ExtensionObjectNamePattern] = '<ObjectId><BaseName><BaseNameShort><BaseId>';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(
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

})
