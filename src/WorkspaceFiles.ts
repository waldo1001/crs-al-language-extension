//import {fs} from fs;
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path'
import { Settings } from './Settings';
import { DynamicsNAV } from './DynamicsNAV';
import { error } from 'util';
import { NAVObject } from './NAVObject';
import { Dictionary } from './Dictionary';
import * as git from './Git';
import * as CRSTerminal from './CRSTerminal';
import * as crsOutput from './CRSOutput';

export class WorkspaceFiles {

    static getCurrentWorkspaceFolder(): vscode.WorkspaceFolder {
        let workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.workspace.workspaceFolders[0].uri);

        let activeTextEditorDocumentUri = null
        try {
            activeTextEditorDocumentUri = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri);
        } catch (error) {
            activeTextEditorDocumentUri = null
        }

        if (activeTextEditorDocumentUri) { workspaceFolder = activeTextEditorDocumentUri }

        return workspaceFolder;
    }
    static getCurrentWorkspaceFolderFromUri(filePath: vscode.Uri): vscode.WorkspaceFolder {
        let workspaceFolder = vscode.workspace.getWorkspaceFolder(filePath);

         return workspaceFolder;
    }
    static getAlFilesFromCurrentWorkspace() {
        let activeTextEditorDocumentUri = this.getCurrentWorkspaceFolder();

        if (activeTextEditorDocumentUri) {
            return vscode.workspace.findFiles(new vscode.RelativePattern(activeTextEditorDocumentUri, '**/*.*'))
        } else {
            return vscode.workspace.findFiles('**/*.*');
        }
    }

    static RenameFile(fileName: vscode.Uri, withGit?: boolean): string {
        if (!fileName.toString().toLowerCase().endsWith('.al')) { return fileName.fsPath };
        let settings = Settings.GetConfigSettings(fileName);

        let navObject = new NAVObject(fs.readFileSync(fileName.fsPath).toString(), settings, path.basename(fileName.fsPath))

        this.SaveAutoFixesToFile(fileName, navObject);

        if (navObject.objectFileName != navObject.objectFileNameFixed) {
            let newFilePath = path.join(path.dirname(fileName.fsPath), navObject.objectFileNameFixed);

            withGit = withGit ? withGit : (git.isGitRepositorySync() && settings[Settings.RenameWithGit])
            this.DoRenameFile(fileName, newFilePath, withGit)

            return newFilePath;
            //console.log('renamed', fileName.fsPath, '-->', newFilePath);
        } else {
            //console.log('paths are the same.');
            return fileName.fsPath
        }
    }

    static SaveAutoFixesToFile(fileName: vscode.Uri, navObject: NAVObject) {
        let FixedCode = navObject.NAVObjectTextFixed;
        if (navObject.NAVObjectText == FixedCode) { return null }

        fs.writeFileSync(fileName.fsPath, FixedCode);
    }

    static ReorganizeFile(fileName: vscode.Uri, withGit?: boolean): string {
        if (!fileName.toString().toLowerCase().endsWith('.al')) { return fileName.fsPath };

        let navObject = new NAVObject(fs.readFileSync(fileName.fsPath).toString(), Settings.GetConfigSettings(fileName), path.basename(fileName.fsPath))
        this.SaveAutoFixesToFile(fileName, navObject);

        let settings = Settings.GetConfigSettings(fileName);
        this.throwErrorIfReorgFilesNotAllowed(settings);


        let fixedname = navObject.objectFileNameFixed
        if (navObject.objectFileName && navObject.objectFileName != '' && fixedname && fixedname != '') {

            let objectFolder = path.join(vscode.workspace.getWorkspaceFolder(fileName).uri.fsPath, this.getDestinationFolder(navObject, settings));
            let objectTypeFolder = path.join(objectFolder, this.getObjectTypeFolder(navObject));
            let destinationFileName = path.join(objectTypeFolder, fixedname);

            if (destinationFileName.toLocaleLowerCase() == fileName.fsPath.toLocaleLowerCase()) {
                //console.log('paths are the same.');
                return fileName.fsPath;
            } else {

                (!fs.existsSync(objectFolder)) ? fs.mkdirSync(objectFolder) : '';
                (!fs.existsSync(objectTypeFolder)) ? fs.mkdirSync(objectTypeFolder) : '';

                withGit = withGit ? withGit : (git.isGitRepositorySync() && settings[Settings.RenameWithGit])
                this.DoRenameFile(fileName, destinationFileName, withGit)

                //console.log('renamed', fileName.fsPath, '-->', destinationFileName);

                return destinationFileName;
            }
        }

        return fileName.fsPath;
    }

    static DoRenameFile(from: vscode.Uri, to: string, withGit: boolean) {
        if (!withGit) {
            fs.renameSync(from.fsPath, to);
            crsOutput.showOutput(`Rename file from ${from.fsPath.substr(from.fsPath.lastIndexOf('\\') + 1)} to ${to.substr(to.lastIndexOf('\\') + 1)}`)
        } else {
            git.gitMove(from, to);
        }
    }

    static RenameAllFiles() {
        vscode.workspace.saveAll();

        crsOutput.showOutput('Rename all files', true);

        let settings = Settings.GetConfigSettings(null);
        let withGit = (git.isGitRepositorySync() && settings[Settings.RenameWithGit])

        this.getAlFilesFromCurrentWorkspace().then(Files => {
            let renamedfiles = new Dictionary<string>();
            let totalFileCount = 0;
            let renamedFileCount = 0;
            try {
                Files.forEach(file => {
                    //console.log(file.fsPath);
                    totalFileCount++;
                    let newFilename = this.RenameFile(file, withGit);
                    if (file.fsPath != newFilename) {
                        renamedFileCount++;
                        renamedfiles.Add(file.fsPath, newFilename);
                    }
                })

                vscode.window.showInformationMessage(`${renamedFileCount} files out of ${totalFileCount} was renamed`)
            } catch (error) {
                vscode.window.showErrorMessage(error.message);
            }

            //WorkspaceFiles.ReopenFilesInEditor(renamedfiles);
        });
    }

    static ReorganizeAllFiles() {
        vscode.workspace.saveAll();

        crsOutput.showOutput('Reorganize all files', true);

        let settings = Settings.GetConfigSettings(null);
        let withGit = (git.isGitRepositorySync() && settings[Settings.RenameWithGit])

        this.getAlFilesFromCurrentWorkspace().then(Files => {
            let renamedfiles = new Dictionary<string>();
            try {
                let totalFileCount = 0;
                let renamedFileCount = 0;
                Files.forEach(file => {
                    totalFileCount++;
                    let newFilename = this.ReorganizeFile(file, withGit);
                    if (file.fsPath != newFilename) {
                        renamedFileCount++;
                        renamedfiles.Add(file.fsPath, newFilename);
                    }

                })
                vscode.window.showInformationMessage(`${renamedFileCount} files out of ${totalFileCount} was reorganized`)
            } catch (error) {
                vscode.window.showErrorMessage(error.message);
            }

            //WorkspaceFiles.ReopenFilesInEditor(renamedfiles);
        });
    }

    private static ReopenFilesInEditor(renamedfiles: Dictionary<string>) {
        let openfiles = new Array<string>();

        vscode.workspace.textDocuments.forEach(doc => {
            if (doc.languageId != 'log') {
                if (renamedfiles.ContainsKey(doc.fileName)) {
                    openfiles.push(renamedfiles.Item(doc.fileName));
                }
                else {
                    openfiles.push(doc.fileName);
                }
            }
        });
        vscode.commands.executeCommand('workbench.action.closeAllEditors');
        openfiles.forEach(f => {
            vscode.workspace.openTextDocument(f).then(newdoc => vscode.window.showTextDocument(newdoc, { preserveFocus: true, viewColumn: vscode.ViewColumn.Active, preview: false }));
        });
    }


    static throwErrorIfReorgFilesNotAllowed(mySettings: any) {
        if (mySettings[Settings.AlSubFolderName] == 'None') {
            let errorMessage =
                "Configuration "
                + Settings.AlSubFolderName
                + " is set to 'None'.  Please choose another value for this function to work.";

            vscode.window.showErrorMessage(errorMessage);
            throw new error(errorMessage);
        }
    }

    static renameFileOnSave() {
        let currentfile = vscode.window.activeTextEditor.document.uri;
        if (!currentfile.fsPath.toLowerCase().endsWith('.al')) { return }

        //vscode.window.activeTextEditor.document.save();

        let mySettings = Settings.GetConfigSettings(currentfile);

        let newFilePath: string;
        switch (mySettings[Settings.OnSaveAlFileAction].toLowerCase()) {
            case "rename":
                newFilePath = this.RenameFile(currentfile);
                break;
            case "reorganize":
                newFilePath = this.ReorganizeFile(currentfile);
                break;
            case "donothing":
                newFilePath = currentfile.fsPath;
                break
        }

        if (newFilePath != currentfile.fsPath) {
            this.openRenamedFile(newFilePath);
        }
    }

    static openRenamedFile(newFilePath: string) {
        let currentEditor = vscode.window.activeTextEditor;

        let settings = Settings.GetConfigSettings(vscode.Uri.parse(newFilePath));

        vscode.commands.executeCommand('workbench.action.closeActiveEditor');

        if (git.isGitRepositorySync && settings[Settings.RenameWithGit]) {
            CRSTerminal.OpenFileFromTerminal(newFilePath);
        } else {
            vscode.workspace.openTextDocument(newFilePath).then(doc =>
                vscode.window.showTextDocument(doc).then(doc =>
                    this.setSelectionOnTextEditor(doc, currentEditor)
                ));
        }
    }

    static setSelectionOnTextEditor(doc: vscode.TextEditor, editor: vscode.TextEditor) {
        //console.log('setSelectionOnTextEditor2');

        let currentSelection = editor.selection;
        let linecount = editor.document.lineCount - 1;
        let currentRange = editor.document.lineAt(currentSelection.active.line == linecount ? linecount : currentSelection.active.line + 1).range;

        doc.selection = currentSelection;
        doc.revealRange(currentRange);
    }

    static getDestinationFolder(navObject: NAVObject, mySettings: any): string {
        if (navObject.objectCodeunitSubType) {
            if (navObject.objectCodeunitSubType.toLowerCase() == 'test') {
                return navObject.objectCodeunitSubType.toLowerCase()
            }
        }

        return mySettings[Settings.AlSubFolderName]
    }

    static getObjectTypeFolder(navObject: NAVObject): string {
        if (navObject.objectCodeunitSubType) {
            if (navObject.objectCodeunitSubType.toLowerCase() == 'test') {
                return ''
            }
        }

        if (navObject.objectType == 'controladdin'){
            return `${navObject.objectType}\\${navObject.objectNameFixed}`
        }

        return navObject.objectType
    }
}





