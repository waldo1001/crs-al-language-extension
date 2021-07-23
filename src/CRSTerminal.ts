import * as vscode from 'vscode';
import { Terminal } from './extension';

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

export function CompileDGML(alcpath: string, projectpath: string, packagecachepath: string) {
    packagecachepath = packagecachepath ? packagecachepath : projectpath + '/.alpackages'

    Terminal.sendText(`$Temp = Get-Location`);
    Terminal.sendText(`Set-Location "${alcpath}"`);
    Terminal.sendText(`./alc.exe /project:"${projectpath}" /packagecachepath:"${packagecachepath}" /generatecrossreferences`);
    Terminal.sendText(`Set-Location $Temp`);

    Terminal.show();
}

export function GetTerminal(terminalName: string = 'crs'): vscode.Terminal {
    const terminals = vscode.window.terminals.filter(element => element.name === terminalName);
    
    if (terminals.length > 0) {
        return terminals.shift()!;
    }
    else {
        return vscode.window.createTerminal(terminalName);
    }
}