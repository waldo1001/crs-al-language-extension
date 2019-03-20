import * as vscode from 'vscode';
import * as path from 'path'
import * as fs from 'fs';
import { error } from 'util';


export async function isGitRepository(folder: vscode.WorkspaceFolder): Promise<boolean> {
	if (folder.uri.scheme !== 'file') {
		return false;
	}

	const dotGit = path.join(folder.uri.fsPath, '.git');

	try {
		const dotGitStat = await new Promise<fs.Stats>((c, e) => fs.stat(dotGit, (err, stat) => err ? e(err) : c(stat)));
		return dotGitStat.isDirectory();
	} catch (err) {
		return false;
	}
}

export function isGitRepositorySync(): boolean {
	let folder = vscode.workspace.workspaceFolders[0];

	if (vscode.window.activeTextEditor) {
		folder = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri) //Active File
	}
	
	if (folder.uri.scheme !== 'file') {
		return false;
	}

	const dotGit = path.join(folder.uri.fsPath, '.git');

	try {
		return fs.statSync(dotGit).isDirectory()
	} catch (err) {
		return false;
	}
}

