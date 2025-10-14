import * as assert from 'assert';
import { suite, test } from 'mocha';

import { NAVObject } from '../../NAVObject'
import { WorkspaceFiles } from '../../WorkspaceFiles'
import * as myExtension from '../../extension';
import * as NAVTestObjectLibrary from './NAVTestObjectLibrary'
import { Settings } from '../../Settings';
import { FileDecoration } from 'vscode';

suite("NAVObject ObjectNamePrefix Tests", () => {
    test("Object without prefix - No prefix to set", () => {
        let testSettings = Settings.GetConfigSettings(null);
        testSettings[Settings.ObjectNamePrefix] = null;

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName);

        assert.strictEqual(navObject.objectActions[0].name, navObject.objectActions[0].nameFixed);
    });

    test("Page without prefix - set prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.strictEqual(navObject.objectActions[0].name, navObject.objectActions[0].nameFixed) //don't rename actions on new pages
    });

    test("PageExtension without prefix - set prefix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectActions[0].nameFixed, testSettings[Settings.ObjectNamePrefix] + navObject.objectActions[0].name)
        assert.strictEqual(navObject.objectActions[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.strictEqual(navObject.objectActions.length, 3)
        navObject.objectActions.forEach(action => {
            assert.strictEqual(action.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.strictEqual(action.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })
    });

    test("Pageextension without prefix - set prefix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectActions[0].nameFixed, testSettings[Settings.ObjectNamePrefix] + navObject.objectActions[0].name)
        assert.strictEqual(navObject.objectActions[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.strictEqual(navObject.objectActions.length, 3)
        navObject.objectActions.forEach(action => {
            assert.strictEqual(action.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.strictEqual(action.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

    });
    test("Pageextension - set suffix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectActions[0].nameFixed, navObject.objectActions[0].name + testSettings[Settings.ObjectNameSuffix])
        assert.strictEqual(navObject.objectActions[0].nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        assert.strictEqual(navObject.objectActions.length, 3)
        navObject.objectActions.forEach(action => {
            assert.strictEqual(action.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.strictEqual(action.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })

    });
    test("Pageextension - set prefix to fields and groups", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.pageGroups.length, 2);
        assert.strictEqual(navObject.pageFields.length, 5);
        navObject.pageFields.forEach(field => {
            assert.strictEqual(field.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })
        navObject.pageGroups.forEach(group => {
            assert.strictEqual(group.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.pageFields.forEach(field => {
            assert.strictEqual(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })
        navObject2.pageGroups.forEach(group => {
            assert.strictEqual(group.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

    });
    test("Pageextension - set suffix to fields and groups", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWrongFileNameWithActions()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.pageGroups.length, 2);
        assert.strictEqual(navObject.pageFields.length, 5);
        navObject.pageFields.forEach(field => {
            assert.strictEqual(field.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })
        navObject.pageGroups.forEach(groups => {
            assert.strictEqual(groups.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.pageFields.forEach(field => {
            assert.strictEqual(field.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })
        navObject2.pageGroups.forEach(groups => {
            assert.strictEqual(groups.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })
    });

    test("Tableextension - set prefix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.tableFields[0].nameFixed, testSettings[Settings.ObjectNamePrefix] + navObject.tableFields[0].name)
        assert.strictEqual(navObject.tableFields[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.strictEqual(navObject.tableFields.length, 6) //has 6 fields 
        navObject.tableFields.forEach(field => {
            assert.strictEqual(field.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.tableFields.forEach(field => {
            assert.strictEqual(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        })
    });
    test("Table - set prefix to fields with brackets", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableWithBracketsInFieldName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let FullFixedText = navObject.NAVObjectTextFixed
    });
    test("Tableextension - skip setting prefix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWithSkippingFieldForRename();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        // assert.strictEqual(navObject.tableFields[0].nameFixed, navObject.tableFields[0].name)
        assert.strictEqual(navObject.tableFields[0].nameFixed, testSettings[Settings.ObjectNamePrefix] + navObject.tableFields[0].name)
        // assert.notStrictEqual(navObject.tableFields[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.strictEqual(navObject.tableFields[0].nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
        assert.strictEqual(navObject.tableFields.length, 1) //has 1 field

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed.replace('disable', '').replace('enable', ''), testSettings, navTestObject.ObjectFileName)
        assert.strictEqual(navObject2.tableFields[0].name.startsWith(testSettings[Settings.ObjectNamePrefix]), false)
        assert.strictEqual(navObject2.tableFields[1].name.startsWith(testSettings[Settings.ObjectNamePrefix]), true)
    });
    test("Tableextension - set suffix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWrongFileNameAndKeyWord();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.tableFields[0].nameFixed, navObject.tableFields[0].name + testSettings[Settings.ObjectNameSuffix])
        assert.strictEqual(navObject.tableFields[0].nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        assert.strictEqual(navObject.tableFields.length, 6) //has 6 fields 
        navObject.tableFields.forEach(field => {
            assert.strictEqual(field.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })

        //check result text that would be saved to file
        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.tableFields.forEach(field => {
            assert.strictEqual(field.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true)
        })
    });


    test("Tableextension - Don't set double Affix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.MandatoryAffixes] = ['waldo'];

        let navTestObject = NAVTestObjectLibrary.getTableExtensionWithSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.tableFields.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.tableFields.forEach(tableField => {
            assert.strictEqual(tableField.name.endsWith(testSettings[Settings.MandatoryAffixes][0]), true);
            assert.strictEqual(tableField.name, tableField.nameFixed);
        })

        for (let i = 0; i < navObject2.tableFields.length; i++) {
            assert.strictEqual(navObject2.tableFields[i].name, navObject.tableFields[i].name)
        }
    });


    test("Tableextension - Don't change fieldnumber", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.tableFields[0].number, navObject2.tableFields[0].number);

    });
    test("Table - avoid setting prefix to fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableWithWrongFileName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.tableFields.length, 0);

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.tableFields.forEach(field => {
            assert.strictEqual(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), false) //does not start with prefix
        })
    });
    test("Page - avoid setting prefix to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageNoPrefixCorrectNameWithActions();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectActions.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(field => {
            assert.strictEqual(field.name.startsWith(testSettings[Settings.ObjectNamePrefix]), false) //does not start with prefix
        })
    });
    test("Page - add quotations to fields/actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageWithIntegerPrefixedNames();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        // Non integer-prefixed actions and fields are not contained in double-quotes
        assert.strictEqual(navObject.objectActions.find(a => a.name === 'Action1')
            .fullActionTextFixed, " action(Action1)");

        assert.strictEqual(navObject.pageFields.find(a => a.name === 'Field1')
            .fullFieldTextFixed, "field(Field1; RandomSource)");

        // Integer-prefixed actions and fields are contained in double-quotes
        assert.strictEqual(navObject.objectActions.find(a => a.name === '2Action')
            .fullActionTextFixed, " action(\"2Action\")");

        assert.strictEqual(navObject.pageFields.find(a => a.name === '2Field')
            .fullFieldTextFixed, "field(\"2Field\"; RandomSource)");
    });
    test("Test - add quotations to table fields", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getTableWithIntegerPrefixedNames();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        // Non integer-prefixed actions and fields are not contained in double-quotes
        assert.strictEqual(navObject.tableFields.find(a => a.name === 'MyField')
                            .fullFieldTextFixed, "field(1; MyField; Integer)");

        // Integer-prefixed actions and fields are contained in double-quotes
        assert.strictEqual(navObject.tableFields.find(a => a.name === '2Field')
                            .fullFieldTextFixed, "field(2; \"2Field\"; Integer)");

        // Field with parenthesis is correctly quoted
        assert.strictEqual(navObject.tableFields.find(a => a.name === 'With (Parenthesis)')
                            .fullFieldTextFixed, "field(3; \"With (Parenthesis)\"; Decimal)");

        // Object should be unchanged other than object prefix
        assert.strictEqual(navTestObject.ObjectText.replace('FieldsWithIntegers', 'waldoFieldsWithIntegers'), navObject.NAVObjectTextFixed);
    });
    test("Pageextension - avoid setting double prefixes to actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithWaldoPrefixWithActions();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectActions.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.strictEqual(action.name.startsWith(testSettings[Settings.ObjectNamePrefix]), true);
            assert.strictEqual(action.name, action.nameFixed);
        })
    });
    
    test("Pageextension - avoid setting double affixes", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.MandatoryAffixes] = ['waldo'];

        let navTestObject = NAVTestObjectLibrary.getPageExtensionWithWaldoSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectActions.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        
        assert.strictEqual(navObject2.objectName.endsWith(testSettings[Settings.MandatoryAffixes][0]), true);
        assert.strictEqual(navObject2.objectName, navObject2.objectNameFixed)
        navObject2.objectActions.forEach(action => {
            assert.strictEqual(action.name.endsWith(testSettings[Settings.MandatoryAffixes][0]), true);
            assert.strictEqual(action.name, action.nameFixed);
        })
    });
    test("Page - avoid removing prefixes from actions", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageWithWaldoPrefixWrongName();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectActions.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.objectActions.forEach(action => {
            assert.strictEqual(action.name, action.nameFixed);
        })
    });
    test("Object with prefix - No prefix to set", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageWithWaldoPrefixWrongName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.objectFileName, navObject.objectFileNameFixed);
        assert.strictEqual(navObject.objectFileNameFixed.indexOf('waldowaldo'), -1);
        navObject.objectActions.forEach(action => {
            assert.strictEqual(action.name, action.nameFixed)
        })
        navObject.tableFields.forEach(field => {
            assert.strictEqual(field.name, field.nameFixed)
        })
    });

    test("Load NAVObject with Suffix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getPageWithWaldoPrefixWrongName()
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectFileName.endsWith(testSettings[Settings.ObjectNameSuffix]), false)
        assert.notStrictEqual(navObject.objectFileNameFixed.indexOf(testSettings[Settings.ObjectNameSuffix]), -1)
    });
    
    test("interface - Don't set double Affix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.MandatoryAffixes] = ['waldo'];

        let navTestObject = NAVTestObjectLibrary.getInterfaceWithSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.objectNameFixed,navObject.objectName);
    });

    test("Reportextension - Set prefix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.reportColumns.length, 0)

        navObject.reportColumns.forEach(column => {
            assert.strictEqual(column.nameFixed.startsWith(testSettings[Settings.ObjectNamePrefix]), true);
        })
    });
    test("Reportextension - Set Suffix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.reportColumns.length, 0)

        navObject.reportColumns.forEach(column => {
            assert.strictEqual(column.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true);
        })
    });
    test("Reportextension - Don't set double suffix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getReportExtensionWithSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.reportColumns.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.reportColumns.forEach(column => {
            assert.strictEqual(column.name.endsWith(testSettings[Settings.ObjectNameSuffix]), true);
            assert.strictEqual(column.name, column.nameFixed);
        })

        for (let i = 0; i < navObject2.reportColumns.length; i++) {
            assert.strictEqual(navObject2.reportColumns[i].name, navObject.reportColumns[i].name)
        }
    });

    test("Reportextension - Don't set double Affix", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNamePrefix] = 'waldo';
        testSettings[Settings.MandatoryAffixes] = ['waldo'];

        let navTestObject = NAVTestObjectLibrary.getReportExtensionWithSuffix();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.reportColumns.length, 0)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)
        navObject2.reportColumns.forEach(column => {
            assert.strictEqual(column.name.endsWith(testSettings[Settings.MandatoryAffixes][0]), true);
            assert.strictEqual(column.name, column.nameFixed);
        })

        for (let i = 0; i < navObject2.reportColumns.length; i++) {
            assert.strictEqual(navObject2.reportColumns[i].name, navObject.reportColumns[i].name)
        }
    });

    test("Reportextension - Fields on request page", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        assert.notStrictEqual(navObject.reportColumns.length, 0)
        assert.notStrictEqual(navObject.pageFields.length, 0)

        navObject.pageFields.forEach(field => {
            assert.strictEqual(field.nameFixed.endsWith(testSettings[Settings.ObjectNameSuffix]), true);
            assert.notStrictEqual(field.name, field.nameFixed);
        })
    });
    test("Reportextension - Only quotes if necessary - None expected", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = 'waldo';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        navObject.reportColumns.forEach(column => {
            assert.strictEqual(column.fullColumnTextFixed.includes('"'), false)
        })
    });
    test("Reportextension - No spaces in fixed", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = ' waldo';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        navObject.reportColumns.forEach(column => {
            assert.strictEqual(column.nameFixed.includes(' '), false)
        })
    });
    test("Reportextension - No spaces in fixed", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = ' waldo';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject.reportColumns[0].fullColumnTextFixed, navObject2.reportColumns[0].fullColumnTextFixed)
    });
    test("Reportextension - Column with array", () => {
        let testSettings = Settings.GetConfigSettings(null)
        testSettings[Settings.ObjectNameSuffix] = ' waldo';

        let navTestObject = NAVTestObjectLibrary.getSimpleReportExtension();
        let navObject = new NAVObject(navTestObject.ObjectText, testSettings, navTestObject.ObjectFileName)

        let navObject2 = new NAVObject(navObject.NAVObjectTextFixed, testSettings, navTestObject.ObjectFileName)

        assert.strictEqual(navObject2.reportColumns.length, 5)
        assert.strictEqual(navObject2.reportColumns[3].fullColumnTextFixed.includes('waldo'), true)
        assert.strictEqual(navObject2.reportColumns[3].expression, navObject.reportColumns[3].expression)
        assert.strictEqual(navObject2.reportColumns[3].name, navObject.reportColumns[3].name + 'waldo')
    });
});