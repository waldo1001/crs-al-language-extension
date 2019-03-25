import * as vscode from 'vscode';

export const Terminal = vscode.window.createTerminal('crs');

export function GitMove(from: string, to: string) {
    //console.log(`git mv ${from} ${to}`);
    //Terminal.show();
    // let $Script = `
    //     git add -A -- ${from}
    //     git stage ${from}
    //     git commit -m 'Commit before file rename
    //     git mv ${from} ${to}
    //     git add -A -- ${to}
    //     git stage ${to}
    //     git commit -m 'Commit after file rename
    // `
    // Terminal.sendText($Script);
    // Terminal.sendText(`git add ${from}`);
    // Terminal.sendText(`git stage ${from}`);
    // Terminal.sendText(`git commit -m 'Commit ${from} before rename'`)
    Terminal.sendText(`git mv ${from} ${to}`);
    // Terminal.sendText(`git add ${to}`);
    // Terminal.sendText(`git stage ${to}`);
    // Terminal.sendText(`git commit -m 'Commit ${to} after file rename'`)
}

export function GitCommit(filepath: string) {
    Terminal.sendText(`git add ${filepath}`);
    Terminal.sendText(`git stage ${filepath}`);
    Terminal.sendText(`git commit -m 'Commit ${filepath} before rename'`)
}

export function OpenFileFromTerminal(path: string) {
    //Terminal.show();
    Terminal.sendText(`code ${path}`);
}