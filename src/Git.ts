import * as vscode from 'vscode';
import * as path from 'path'
import * as fs from 'fs';
import * as crsOutput from './CRSOutput';
import { WorkspaceFiles } from './WorkspaceFiles'

var projectRoot = vscode.workspace.rootPath;
var simpleGit = require('simple-git')((projectRoot) ? projectRoot : '.');

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

export function gitMove(from: string, to: string) {
	simpleGit.mv(from, to, function (error) {
		if (error) {
			crsOutput.showOutput(error);
			fs.renameSync(from, to);
			crsOutput.showOutput(`fallback: renaming without git from ${from.substr(from.lastIndexOf('\\') + 1)} to ${to.substr(to.lastIndexOf('\\') + 1)}`);
		} else {
			crsOutput.showOutput(`success: git mv ${from.substr(from.lastIndexOf('\\') + 1)} ${to.substr(to.lastIndexOf('\\') + 1)}`);
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
