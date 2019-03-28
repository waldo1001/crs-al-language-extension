import * as vscode from 'vscode';

export const Terminal = vscode.window.createTerminal('crs');

export function GitMove(from: string, to: string) {
    Terminal.sendText(`git mv ${from} ${to}`);
}

export function GitCommit(filepath: string) {
    Terminal.sendText(`git add ${filepath}`);
    Terminal.sendText(`git stage ${filepath}`);
    Terminal.sendText(`git commit -m 'Commit ${filepath} before rename'`)
}

export function OpenFileFromTerminal(path: string) {
    //Terminal.show();
    Terminal.sendText(`code "${path}"`);
}