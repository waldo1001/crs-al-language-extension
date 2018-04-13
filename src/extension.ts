'use strict';

import * as vscode from 'vscode';  //VS Code extensibility API
import * as CRSFunctions from './CRSFunctions';  //Our own functions

export function activate(context: vscode.ExtensionContext) { //is called when your extension is activated (when command is executed)

    // This line of code will only be executed once when your extension is activated
    console.log('Extension "crs-al-language-extension" is now activated!'); //diagnostic information

    // The commands have been defined in the package.json file
    // provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json    
    let commandlist = [
        vscode.commands.registerCommand('extension.InstallWaldosModules', CRSFunctions.InstallWaldosModules),

        vscode.commands.registerCommand('extension.RunCurrentObjectWeb', CRSFunctions.RunCurrentObjectWeb),
        vscode.commands.registerCommand('extension.RunObjectWeb', CRSFunctions.RunObjectWeb),
        vscode.commands.registerCommand('extension.RunObjectTablet', CRSFunctions.RunObjectTablet),
        vscode.commands.registerCommand('extension.RunObjectPhone', CRSFunctions.RunObjectPhone),
        vscode.commands.registerCommand('extension.RunObjectWindows', CRSFunctions.RunObjectWindows),

        vscode.commands.registerCommand('extension.RenameCurrentFile', CRSFunctions.RenameCurrentFile),
        vscode.commands.registerCommand('extension.RenameAllFiles', CRSFunctions.RenameAllFiles),
        vscode.commands.registerCommand('extension.ReorganizeCurrentFile', CRSFunctions.ReorganizeCurrentFile),
        vscode.commands.registerCommand('extension.ReorganizeAllFiles', CRSFunctions.ReorganizeAllFiles),

        vscode.commands.registerCommand('extension.SetupSnippets', CRSFunctions.SetupSnippets),
    ];

    context.subscriptions.concat(commandlist);

    vscode.commands.executeCommand('extension.SetupSnippets');
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.log('You just deactivated "crs-al-language-extension".  Sad to see you go!')
}