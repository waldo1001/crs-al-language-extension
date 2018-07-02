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
        vscode.commands.registerCommand('crs.InstallWaldosModules', CRSFunctions.InstallWaldosModules),

        vscode.commands.registerCommand('crs.RunCurrentObjectWeb', CRSFunctions.RunCurrentObjectWeb),
        vscode.commands.registerCommand('crs.RunObjectWeb', CRSFunctions.RunObjectWeb),
        vscode.commands.registerCommand('crs.RunObjectTablet', CRSFunctions.RunObjectTablet),
        vscode.commands.registerCommand('crs.RunObjectPhone', CRSFunctions.RunObjectPhone),
        vscode.commands.registerCommand('crs.RunObjectWindows', CRSFunctions.RunObjectWindows),
        vscode.commands.registerCommand('crs.RunTestTool', CRSFunctions.RunTestTool),

        vscode.commands.registerCommand('crs.RenameCurrentFile', CRSFunctions.RenameCurrentFile),
        vscode.commands.registerCommand('crs.RenameAllFiles', CRSFunctions.RenameAllFiles),
        vscode.commands.registerCommand('crs.ReorganizeCurrentFile', CRSFunctions.ReorganizeCurrentFile),
        vscode.commands.registerCommand('crs.ReorganizeAllFiles', CRSFunctions.ReorganizeAllFiles),

        vscode.commands.registerCommand('crs.SearchMicrosoftDocs', CRSFunctions.SearchMicrosoftDocs),
        vscode.commands.registerCommand('crs.SearchGoogle', CRSFunctions.SearchGoogle),

        vscode.commands.registerCommand('crs.SetupSnippets', CRSFunctions.SetupSnippets),
    ];

    context.subscriptions.concat(commandlist);

    context.subscriptions.push(vscode.workspace.onDidSaveTextDocument(CRSFunctions.HandleOnSaveTextDocument));

    vscode.commands.executeCommand('crs.SetupSnippets');
}

// this method is called when your extension is deactivated
export function deactivate() {
    console.log('You just deactivated "crs-al-language-extension".  Sad to see you go!')
}