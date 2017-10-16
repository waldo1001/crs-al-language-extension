import * as vscode from 'vscode';
import {Powershell} from './PowerShell';
import * as PSScripts  from './PSScripts';
import * as PSModules from './PSModules';
import { ConsoleLogger, OutputLogger } from './logging';
import {Settings} from './Settings';
import {DynamicsNAV} from './DynamicsNAV';
import * as loadJsonFile from 'load-json-file';
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
    console.log('Running: ReorganizeCurrentFile');
    
    WorkspaceFiles.RenameCurrentFile(vscode.window.activeTextEditor.document.fileName);

    console.log('Done: ReorganizeCurrentFile')
}

export function RenameAllFiles(){
    console.log('Running: ReorganizeAllFiles');
    
    WorkspaceFiles.RenameAllFiles();

    console.log('Done: ReorganizeAllFiles')
}