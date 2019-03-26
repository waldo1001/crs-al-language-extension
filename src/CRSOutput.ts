import * as vscode from 'vscode';
var outputChannel = vscode.window.createOutputChannel("crs-al-language");

export function showOutput(text, show?: boolean) {
    let currTime = new Date();
    outputChannel.append('\n' + currTime.toLocaleString() + ' - ' + text);

    show ? outputChannel.show(vscode.ViewColumn.Three) : null;
}