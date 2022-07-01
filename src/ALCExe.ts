import * as fs from 'fs';
import { join } from 'path';
import * as vscode from 'vscode';
import { Settings } from './Settings';
import * as crsOutput from './CRSOutput';
import * as CRSTerminal from './CRSTerminal';

export class ALCExe {

    static CompileDGML() {
        let projectpath

        try {
            projectpath = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri).uri.fsPath;
        } catch {
            vscode.window.showErrorMessage('No active project document.');
        }

        let workSpaceSettings = Settings.GetConfigSettings(projectpath);
        let packageCachePath = join(projectpath, workSpaceSettings[Settings.packageCachePath]);

        crsOutput.showOutput(`CompileDGML for project "${projectpath}"`, false);

        let alcpath = this.GetALCExeDir();

        CRSTerminal.CompileDGML(alcpath, projectpath, packageCachePath);
    }

    static GetALCExeDir(): string {
        let MicrosoftPath = fs.readdirSync(join(process.env.USERPROFILE, '.vscode', 'extensions')).filter(element => element.startsWith('ms-dynamics-smb.al'))
        MicrosoftPath = MicrosoftPath ? MicrosoftPath : fs.readdirSync(join(process.env.USERPROFILE, '.vscode', 'extensions')).filter(element => element.startsWith('microsoft.al'))

        if (!MicrosoftPath) { return null }

        let ALCPath = join(process.env.USERPROFILE, '.vscode', 'extensions', MicrosoftPath[0], 'bin')

        crsOutput.showOutput(`alc.exe path: ${ALCPath}`, false)

        return ALCPath
    }

}