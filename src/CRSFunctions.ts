import * as vscode from 'vscode';
import { Powershell } from './PowerShell';
import * as PSScripts from './PSScripts';
import * as PSModules from './PSModules';
import { ConsoleLogger, OutputLogger } from './logging';
import { Settings } from './Settings';
import { DynamicsNAV } from './DynamicsNAV';
import { join } from 'path';
import { WorkspaceFiles } from './WorkspaceFiles';
import { SnippetFunctions } from './SnippetFunctions';
import * as fs from 'fs';


let observers = [
    ConsoleLogger.getInstance(),
    OutputLogger.getInstance()
];

export function InstallWaldosModules() {
    console.log('Running: InstallWaldosModules');

    let ps = new Powershell(PSScripts.INSTALLWALDOSMODULES);

    ps.observers = observers;

    ps.invoke();

    console.log('Done: InstallWaldosModules');
}

export function RunCurrentObjectWeb() {
    console.log('Running: RunCurrentObjectWeb');

    let currentFile = vscode.window.activeTextEditor.document.uri
    let data = fs.readFileSync(currentFile.fsPath, null);
    let objectProperties = WorkspaceFiles.getFilePropertiesFromObjectText(data.toString(), currentFile);

    DynamicsNAV.RunObjectInWebClient(objectProperties.objectType, objectProperties.objectId, 'WebClient');

    console.log('Done: RunCurrentObjectWeb')
}

export function RunObjectWeb() {
    console.log('Running: RunObjectWeb');

    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype =>
        vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid =>
            DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'WebClient')));

    console.log('Done: RunObjectWeb')
}
export function RunTestTool() {
    console.log('Running: RunTestTool');

    DynamicsNAV.RunObjectInWebClient('Page', 130401, 'WebClient');

    console.log('Done: RunTestTool')
}

export function RunObjectTablet() {
    console.log('Running: RunObjectTablet');

    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype =>
        vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid =>
            DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'Tablet')));

    console.log('Done: RunObjectTablet')
}

export function RunObjectPhone() {
    console.log('Running: RunObjectPhone');

    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype =>
        vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid =>
            DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'Phone')));

    console.log('Done: RunObjectPhone')
}

export function RunObjectWindows() {
    console.log('Running: RunObjectWindows');

    vscode.window.showQuickPick(DynamicsNAV.GetRunRTCObjectTypesAsQuickPickItem()).then(objecttype =>
        vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid =>
            DynamicsNAV.RunObjectInWindowsClient(objecttype, objectid)));

    console.log('Done: RunObjectWindows')
}

export function RenameCurrentFile() {
    console.log('Running: RenameCurrentFile');

    let newFileName = WorkspaceFiles.RenameFile(vscode.window.activeTextEditor.document.uri);
    vscode.workspace.openTextDocument(newFileName).then(doc => vscode.window.showTextDocument(doc));

    console.log('Done: RenameCurrentFile')
}

export function RenameAllFiles() {
    console.log('Running: RenameAllFiles');

    vscode.window.showWarningMessage('Are you sure to rename all files from all opened workspaces?', 'Yes', 'No').then((action: String) => {
        if (action === 'Yes') {
            WorkspaceFiles.RenameAllFiles();
        }
    });

    console.log('Done: RenameAllFiles')
}

export function ReorganizeCurrentFile() {
    console.log('Running: ReorganizeCurrentFile');

    let newFileName = WorkspaceFiles.ReorganizeFile(vscode.window.activeTextEditor.document.uri);
    vscode.workspace.openTextDocument(newFileName).then(doc => vscode.window.showTextDocument(doc));

    console.log('Done: ReorganizeCurrentFile')
}

export function ReorganizeAllFiles() {
    console.log('Running: ReorganizeAllFiles');

    vscode.window.showWarningMessage('Are you sure to reorganize all files from all opened workspaces?', 'Yes', 'No').then((action: String) => {
        if (action === 'Yes') {
            WorkspaceFiles.ReorganizeAllFiles();
        }
    });

    console.log('Done: ReorganizeAllFiles')
}

export function SetupSnippets() {
    console.log('Running: SetupSnippets');

    SnippetFunctions.SetupDefaultAlSnippets();
    SnippetFunctions.SetupCRSAlSnippets();

    console.log('Done: SetupSnippets');
}

export function HandleOnSaveTextDocument() {
    console.log('Running: HandleOnSaveTextDocument');

    WorkspaceFiles.handleOnSaveTextDocument();

    console.log('Done: HandleOnSaveTextDocument');
}
