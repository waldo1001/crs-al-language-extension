7//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';
import { suite, test } from 'mocha';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import * as myExtension from '../extension';

// Defines a Mocha test suite to group tests of similar kind together

suite("Sample Tests", () => {

    // Defines a Mocha unit test

    /*     test("Example 1", () => {
            assert.equal(-1, [1, 2, 3].indexOf(5));
            assert.equal(-1, [1, 2, 3].indexOf(0));
        }); */

    /*     test("WorkspaceFiles", () => {
            let objectText: any;
            objectText = 'page 50010 "My new page"';
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectType, 'page');
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectId, '50010');
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectNameShort, 'Mynewpage');
    
            objectText = 'pagecustomization "My new pagecustomization" customizes "Some default page"';
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectType, 'pagecustomization');
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectNameShort, 'Mynewpagecustomization');
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectFileName, 'pagecust Mynewpagecustomization.al');
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectId, '');
    
            objectText = 'profile "My New Rolecenter"';
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectType, 'profile');
            assert.equal(WorkspaceFiles.getFilePropertiesFromObjectText(objectText, null).objectNameShort, 'MyNewRolecenter');
        }); */
});