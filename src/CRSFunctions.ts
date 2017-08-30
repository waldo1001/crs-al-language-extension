import * as vscode from 'vscode';
import {Powershell} from './PowerShell'
import * as PSScripts  from './PSScripts'
import * as PSModules from './PSModules'
import { ConsoleLogger, OutputLogger } from './logging';
import {Settings} from './Settings'
import {DynamicsNAV} from './DynamicsNAV'
import * as loadJsonFile from 'load-json-file';
import {join} from 'path';
    

let observers = [
    ConsoleLogger.getInstance(), 
    OutputLogger.getInstance()
    ];

export function WaldoSaysHello(){
    console.log('Run: WaldoSaysHello');

    vscode.window.showInformationMessage('waldo says good night!');    
}

export function InstallWaldosModules(){
    console.log('Running: InstallWaldosModules');
    
    //let settings = Settings.GetAllSettings();
    let ps = new Powershell(PSScripts.INSTALLWALDOSMODULES);
    
    ps.observers = observers;
    
    /* ps.modules = [
        
    ]; */
/*     ps.settings = {
        SourceDatabaseInstance: settings[Settings.REMOTEDBINSTANCE],
        SourceDatabaseName: settings[Settings.REMOTEDBNAME],
        CommonSQLLocation: settings[Settings.COMMONSQLLOCATION],
        DestinationDatabaseName: settings[Settings.SOLUTIONNAME]
    }; */
    ps.invoke();

    console.log('Done: InstallWaldosModules');
}

export function RunObjectWeb(){
    console.log('Running: RunObjectWeb');

    let workspacesettings = Settings.GetAllSettings();

    console.log(workspacesettings);

    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype => 
        vscode.window.showInputBox({prompt: 'ObjectID:'}).then(objectid => 
            DynamicsNAV.RunWeb(objecttype,objectid)));            
    

    console.log('Done: RunObjectWeb')
}

export function RunObjectTablet(){
    console.log('Running: RunObjectTablet');

    console.log('Done: RunObjectTablet')
}

export function RunObjectPhone(){
    console.log('Running: RunObjectPhone');

    console.log('Done: RunObjectPhone')
}

export function RunObjectWindows(){
    console.log('Running: RunObjectWindows');

    console.log('Done: RunObjectWindows')
}