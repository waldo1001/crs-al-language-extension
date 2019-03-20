import * as vscode from 'vscode';

export const Terminal = vscode.window.createTerminal('crs');

export function GitMove(from: string, to: string) {
    //console.log(`git mv ${from} ${to}`);
    Terminal.show();
    Terminal.sendText(`git mv ${from} ${to}`);
}

export function OpenFileFromTerminal(path: string) {
    Terminal.show();
    Terminal.sendText(`code ${path}`);
}