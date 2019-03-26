import { Uri } from "vscode";

var vscode = require('vscode');
var projectRoot = vscode.workspace.rootPath;
var simpleGit = require('simple-git')((projectRoot) ? projectRoot : '.');
var outputChannel = vscode.window.createOutputChannel("simpleGit");

//trying to figure out thanks to :
//https://github.com/iambibhas/vscode-git-easy

export function getGitStatusforFile(filePath: Uri): boolean {
    let fileName = filePath.fsPath.substr(filePath.fsPath.lastIndexOf('\\') + 1);

    simpleGit.status(function (error, status) {
        if (error) {
            showOutput(error);
            return false;
        }

        return status.not_added.includes(fileName);
    })

    return false

}

export function GetGitStatus2(file): string {
    simpleGit.status(function (error, status) {
        var fileList = [];
        if (error) {
            showOutput(error);
            return 'error';
        }
        fileList.push({
            'label': "Add All Modified",
            'description': "AddAllModified"
        })
        fileList.push({
            'label': "Add All Modified + Untracked",
            'description': "AddAllModifiedUntracked"
        })
        fileList = fillFileList(status, fileList, true)
        var qp = vscode.window.showQuickPick(fileList);
        qp.then(function (result) {
            if (result == null) {
                return;
            }
            if (result.description == "AddAllModified") {
                simpleGit.status(function (error, status) {
                    status.modified.forEach(function (element) {
                        simpleGit.add(element);
                    }, this);
                });
            } else if (result.description == "AddAllModifiedUntracked") {
                simpleGit.status(function (error, status) {
                    status.modified.forEach(function (element) {
                        simpleGit.add(element);
                    }, this);
                    status.not_added.forEach(function (element) {
                        simpleGit.add(element);
                    }, this);
                });
            } else {
                simpleGit.add(result.label, function (result) {
                    console.log(result);
                })
            }
        })

    })

    return 'unknown'
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

function showOutput(text) {
    outputChannel.clear();
    outputChannel.append(text);
    outputChannel.show(vscode.ViewColumn.Three);
}