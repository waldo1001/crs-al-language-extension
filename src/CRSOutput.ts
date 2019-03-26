import * as vscode from 'vscode';
var outputChannel = vscode.window.createOutputChannel("crs-al-language");

export function showOutput(text?: string, show?: boolean) {
    if (text) {
        let currTime = new Date();
        outputChannel.append('\n' + currTime.toLocaleString() + ' - ' + text);
    }

    if (!text || show) {
        show ? outputChannel.show(vscode.ViewColumn.Three) : null;
    }
}
