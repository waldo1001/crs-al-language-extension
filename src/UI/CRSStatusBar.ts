import * as vscode from 'vscode'

export const RunObjectFromStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,100)

export function toggleRunObjectFromStatusBar(){
    RunObjectFromStatusBar.command = 'crs.RunCurrentObjectWeb'

    let currentfile = vscode.window.activeTextEditor.document.uri;

    if (!currentfile.fsPath.toLowerCase().endsWith('.al')) { 
        RunObjectFromStatusBar.hide();
     } else {
         RunObjectFromStatusBar.text = 'Run In Web Client';
         RunObjectFromStatusBar.show();
     }

}
