7//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import {suite,test} from 'mocha';
import {FileFunctions} from '../src/FileFunctions'
import {WorkspaceFiles} from '../src/WorkspaceFiles'
import {StringFunctions} from '../src/StringFunctions'

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../src/extension';

// Defines a Mocha test suite to group tests of similar kind together
suite("Extension Tests", () => {

    // Defines a Mocha unit test
    test("FileFunctions", () => {
        assert.equal(FileFunctions.getDirectory('c:\\program files\\somefolder\\myFolder\\myfile.al'),'c:\\program files\\somefolder\\myFolder\\');
        assert.equal(FileFunctions.getFileName('c:\\program files\\somefolder\\myFolder\\myfile.al'),'myfile.al');
    });
    test("StringFunctions", () => {
        assert.equal(StringFunctions.replaceAll('Remove all "double" quotes" from this " text.','"',''), 'Remove all double quotes from this  text.');
    })
    test("WorkspaceFiles", () => {
        let objectText: any;
        objectText = 'page 50010 "My new page"';
        assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText).objectType,'page');
        assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText).objectId,'50010');
        assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText).objectNameShort,'Mynewpage');

        objectText = 'pagecustomization "My new pagecustomization" customizes "Some default page"';
        assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText).objectType,'pagecustomization');
        assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText).objectNameShort,'Mynewpagecustomization');
        assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText).objectFileName,'pagecust Mynewpagecustomization.al');
        
        objectText = 'profile "My New Rolecenter"';
        assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText).objectType,'profile');
        assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText).objectNameShort,'MyNewRolecenter');
    });
});