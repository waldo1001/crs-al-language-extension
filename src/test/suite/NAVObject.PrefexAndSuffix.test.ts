import * as assert from 'assert';
import { suite, test } from 'mocha';

import { NAVObject } from '../../NAVObject'
import { WorkspaceFiles } from '../../WorkspaceFiles'
import * as myExtension from '../../extension';
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { Settings } from '../../Settings';
import { settings } from 'cluster';

suite("NAVObject ObjectNamePrefix Tests", () => {
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
    test("Pageextension - set prefix to fields and groups", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.pageGroups.length, 2);
        assert.equal(navObject.pageFields.length, 3);
        navObject.pageFields.forEach(field => {
            assert.equal(field.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })
        navObject.pageGroups.forEach(group => {
            assert.equal(group.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.pageFields.forEach(field => {
            assert.equal(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })
        navObject2.pageGroups.forEach(group => {
            assert.equal(group.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

    });
    test("Pageextension - set suffix to fields and groups", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.pageGroups.length, 2);
        assert.equal(navObject.pageFields.length, 3);
        navObject.pageFields.forEach(field => {
            assert.equal(field.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })
        navObject.pageGroups.forEach(groups => {
            assert.equal(groups.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.pageFields.forEach(field => {
            assert.equal(field.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })
        navObject2.pageGroups.forEach(groups => {
            assert.equal(groups.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })
    });

    test("Tableextension - set prefix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.tableFields[0].nameFixed, testSettings[Settings.ObjectNamePrefix] + navObject.tableFields[0].name)
        assert.equal(navObject.tableFields[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.equal(navObject.tableFields.length, 5) //has 5 fields 
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

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.equal(navObject.tableFields[0].nameFixed, navObject.tableFields[0].name + testSettings[Settings.ObjectNameSuffix])
        assert.equal(navObject.tableFields[0].nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        assert.equal(navObject.tableFields.length, 5) //has 5 fields 
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

});