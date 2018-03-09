import * as vscode from 'vscode';
import {Powershell} from './PowerShell';
import * as PSScripts  from './PSScripts';
import * as PSModules from './PSModules';
import { ConsoleLogger, OutputLogger } from './logging';
import {Settings} from './Settings';
import {DynamicsNAV} from './DynamicsNAV';
import {join} from 'path';
import {WorkspaceFiles} from './WorkspaceFiles';
    

let observers = [
    ConsoleLogger.getInstance(), 
    OutputLogger.getInstance()
    ];

export function InstallWaldosModules(){
    console.log('Running: InstallWaldosModules');
    
    let ps = new Powershell(PSScripts.INSTALLWALDOSMODULES);
    
    ps.observers = observers;
    
    ps.invoke();

    console.log('Done: InstallWaldosModules');
}

export function RunObjectWeb(){
    console.log('Running: RunObjectWeb');

    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype => 
        vscode.window.showInputBox({prompt: 'ObjectID:'}).then(objectid => 
            DynamicsNAV.RunObjectInWebClient(objecttype,objectid, 'WebClient')));            

    console.log('Done: RunObjectWeb')
}

export function RunObjectTablet(){
    console.log('Running: RunObjectTablet');

    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype => 
        vscode.window.showInputBox({prompt: 'ObjectID:'}).then(objectid => 
            DynamicsNAV.RunObjectInWebClient(objecttype,objectid, 'Tablet')));   

    console.log('Done: RunObjectTablet')
}

export function RunObjectPhone(){
    console.log('Running: RunObjectPhone');

    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype => 
        vscode.window.showInputBox({prompt: 'ObjectID:'}).then(objectid => 
            DynamicsNAV.RunObjectInWebClient(objecttype,objectid, 'Phone'))); 

    console.log('Done: RunObjectPhone')
}

export function RunObjectWindows(){
    console.log('Running: RunObjectWindows');

    vscode.window.showQuickPick(DynamicsNAV.GetRunRTCObjectTypesAsQuickPickItem()).then(objecttype => 
        vscode.window.showInputBox({prompt: 'ObjectID:'}).then(objectid => 
            DynamicsNAV.RunObjectInWindowsClient(objecttype,objectid))); 

    console.log('Done: RunObjectWindows')
}

export function RenameCurrentFile(){
    console.log('Running: RenameCurrentFile');

    WorkspaceFiles.RenameFile(vscode.window.activeTextEditor.document.fileName);
    
    console.log('Done: RenameCurrentFile')
}

export function RenameAllFiles(){
    console.log('Running: RenameAllFiles');
    
    vscode.window.showWarningMessage('Are you sure to rename all files?','Yes','No').then((action: String) => {
        if (action === 'Yes'){
            WorkspaceFiles.RenameAllFiles();
        }
    });

    console.log('Done: RenameAllFiles')
}

export function ReorganizeCurrentFile(){
    console.log('Running: ReorganizeCurrentFile');
    
    WorkspaceFiles.ReorganizeFile(vscode.window.activeTextEditor.document.fileName);
    
    console.log('Done: ReorganizeCurrentFile')
}

export function ReorganizeAllFiles(){
    console.log('Running: ReorganizeAllFiles');
    
    vscode.window.showWarningMessage('Are you sure to reorganize all files?','Yes','No').then((action: String) => {
        if (action === 'Yes'){
            WorkspaceFiles.ReorganizeAllFiles();
        }
    });
    
    console.log('Done: ReorganizeAllFiles')
}