//import {fs} from fs;
import * as vscode from 'vscode';
import * as fs from 'fs';
import { StringFunctions } from './StringFunctions'
import { FileFunctions } from './FileFunctions'
import * as path from 'path'
import { Settings } from './Settings';
import { DynamicsNAV } from './DynamicsNAV';
import { error } from 'util';
import { NAVObject } from './NAVObject';

export class WorkspaceFiles {

    static getAlFilesFromCurrentWorkspace() {
        if (vscode.window.activeTextEditor) {
            let currentWorkspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri) //Active File
            return vscode.workspace.findFiles(new vscode.RelativePattern(currentWorkspaceFolder, '**/*.al'))
        } else {
            return vscode.workspace.findFiles('**/*.al');
        }

    }

    static RenameFile(fileName: vscode.Uri): string {
        let navObject = new NAVObject(fs.readFileSync(fileName.fsPath).toString(), Settings.GetConfigSettings(fileName), path.basename(fileName.fsPath))

        this.SaveAutoFixesToFile(fileName, navObject);

        if (navObject.objectFileName.toLowerCase() != navObject.objectFileNameFixed.toLowerCase()) {
            let newFilePath = path.join(path.dirname(fileName.fsPath), navObject.objectFileNameFixed);
            fs.renameSync(fileName.fsPath, newFilePath);
            console.log('renamed', fileName.fsPath, '-->', newFilePath);
            return newFilePath;
        } else {
            console.log('paths are the same.');
            return fileName.fsPath
        }
    }

    static SaveAutoFixesToFile(fileName: vscode.Uri, navObject: NAVObject) {
        let FixedCode = navObject.NAVObjectTextFixed;
        if (navObject.NAVObjectText == FixedCode) { return null }

        fs.writeFileSync(fileName.fsPath, FixedCode);
    }

    static ReorganizeFile(fileName: vscode.Uri): string {
        let navObject = new NAVObject(fs.readFileSync(fileName.fsPath).toString(), Settings.GetConfigSettings(fileName), path.basename(fileName.fsPath))
        this.SaveAutoFixesToFile(fileName, navObject);

        let mySettings = Settings.GetConfigSettings(fileName);
        this.throwErrorIfReorgFilesNotAllowed(mySettings);

        let fixedname = navObject.objectFileNameFixed
        if (navObject.objectFileName && navObject.objectFileName != '' && fixedname && fixedname != '') {

            let objectFolder = path.join(vscode.workspace.getWorkspaceFolder(fileName).uri.fsPath, this.getDestinationFolder(navObject, mySettings));
            let objectTypeFolder = path.join(objectFolder, this.getObjectTypeFolder(navObject));
            let destinationFileName = path.join(objectTypeFolder, fixedname);

            if (destinationFileName.toLocaleLowerCase() == fileName.fsPath.toLocaleLowerCase()) {
                console.log('paths are the same.');
                return fileName.fsPath;
            } else {

                (!fs.existsSync(objectFolder)) ? fs.mkdirSync(objectFolder) : '';
                (!fs.existsSync(objectTypeFolder)) ? fs.mkdirSync(objectTypeFolder) : '';

                fs.renameSync(fileName.fsPath, destinationFileName);

                console.log('renamed', fileName.fsPath, '-->', destinationFileName);

                return destinationFileName;
            }
        }

        return fileName.fsPath;
    }

    static RenameAllFiles() {
        vscode.workspace.saveAll();

        this.getAlFilesFromCurrentWorkspace().then(Files => {
            let totalFileCount = 0;
            let renamedFileCount = 0;
            try {
                Files.forEach(file => {
                    console.log(file.fsPath);
                    totalFileCount++;
                    let newFilename = this.RenameFile(file);
                    if (file.fsPath != newFilename) {
                        renamedFileCount++;
                    }

                })
                vscode.window.showInformationMessage(`${renamedFileCount} files out of ${totalFileCount} was renamed`)
            } catch (error) {
                vscode.window.showErrorMessage(error.message);
            }
        });
    }



    static ReorganizeAllFiles() {
        vscode.workspace.saveAll();
        this.getAlFilesFromCurrentWorkspace().then(Files => {
            try {
                let totalFileCount = 0;
                let renamedFileCount = 0;
                Files.forEach(file => {
                    totalFileCount++;
                    let newFilename = this.ReorganizeFile(file);
                    if (file.fsPath != newFilename) {
                        renamedFileCount++;
                    }

                })
                vscode.window.showInformationMessage(`${renamedFileCount} files out of ${totalFileCount} was reorganized`)
            } catch (error) {
                vscode.window.showErrorMessage(error.message);
            }
        }
        );
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

    static handleOnSaveTextDocument() {
        let currentfile = vscode.window.activeTextEditor.document.uri;
        if (!currentfile.fsPath.endsWith('.al')) { return }

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
            vscode.workspace.openTextDocument(newFilePath).then(doc => vscode.window.showTextDocument(doc));
        }
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

        return navObject.objectType
    }
}





