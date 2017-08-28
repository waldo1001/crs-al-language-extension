import * as vscode from 'vscode';
import {Powershell} from './PowerShell'
import * as PSScripts  from './PSScripts'
import * as PSModules from './PSModules'
import { ConsoleLogger, OutputLogger } from './logging';

let observers = [
    ConsoleLogger.getInstance(), 
    OutputLogger.getInstance()
    ];

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




export function WaldoSaysHello(){
    console.log('Run: WaldoSaysHello');

    vscode.window.showInformationMessage('waldo says good night!');    
}