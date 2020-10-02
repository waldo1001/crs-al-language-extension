import * as vscode from 'vscode'

export const RunObjectFromStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,100)

export function toggleRunObjectFromStatusBar(document?: vscode.TextDocument) {
    RunObjectFromStatusBar.command = 'crs.RunCurrentObjectWeb'

    let openDocument =  document || vscode.window.activeTextEditor?.document;
    if (!openDocument) {
        RunObjectFromStatusBar.hide();
        return;
    }

    let currentfile = openDocument.uri;

    if (!currentfile?.fsPath) {
        RunObjectFromStatusBar.hide();
        return;
    }

    if (!currentfile.fsPath.toLowerCase().endsWith('.al')) { 
        RunObjectFromStatusBar.hide();
     } else {
         RunObjectFromStatusBar.text = 'Run In Web Client';
         RunObjectFromStatusBar.show();
     }

}
