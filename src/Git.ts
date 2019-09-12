import * as vscode from 'vscode';
import * as path from 'path'
import * as fs from 'fs';
import * as crsOutput from './CRSOutput';
import { WorkspaceFiles } from './WorkspaceFiles'

//var projectRoot = vscode.workspace.rootPath;
//var simpleGit = require('simple-git')((projectRoot) ? projectRoot : '.');

export async function isGitRepository(folder: vscode.WorkspaceFolder): Promise<boolean> {
	return true;  //TODO: Doesn't work in multiple workspaces
	
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
	return true;  //TODO: Doesn't work in multiple workspaces
	
	let folder = WorkspaceFiles.getCurrentWorkspaceFolder();

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

export function gitMove(from: vscode.Uri, to: string) {
	let currentWorkspaceFolder = WorkspaceFiles.getCurrentWorkspaceFolderFromUri(from).uri.fsPath;
	const git = require('simple-git')(currentWorkspaceFolder);

	git.mv(from.fsPath, to, function (error) {
		if (error) {
			fs.renameSync(from.fsPath, to);
			crsOutput.showOutput(`*** Warning`, true);
			crsOutput.showOutput(`* ${error}`);
			crsOutput.showOutput(`* fallback: renaming without git from ${from.fsPath.substr(from.fsPath.lastIndexOf('\\') + 1)} to ${to.substr(to.lastIndexOf('\\') + 1)}`);
			crsOutput.showOutput(`* you might want to set the setting "crs.RenameWithGit" to false for this workspace.`);
			crsOutput.showOutput(`***`);			
		} else {
			crsOutput.showOutput(`success: git mv ${from.fsPath.substr(from.fsPath.lastIndexOf('\\') + 1)} ${to.substr(to.lastIndexOf('\\') + 1)}`);
		}
	})
}

function fillFileList(status, fileList, is_gitadd = false) {
	console.log(status);
	status.modified.forEach(function (element) {
		var item = {
			'label': element,
			'description': "Modified"
		};
		fileList.push(item);
	}, this);
	status.not_added.forEach(function (element) {
		var item = {
			'label': element,
			'description': "Untracked"
		};
		fileList.push(item)
	}, this);

	if (!is_gitadd) {
		status.created.forEach(function (element) {
			var item = {
				'label': element,
				'description': "New"
			};
			fileList.push(item)
		}, this);
	}
	return fileList;
}
