//import {fs} from fs;
import * as vscode from 'vscode';
import * as fs from 'fs';
import { StringFunctions } from './StringFunctions'
import { FileFunctions } from './FileFunctions'
import * as path from 'path'
import { Settings } from './Settings';
import { DynamicsNAV } from './DynamicsNAV';
import { settings } from 'cluster';
import { error } from 'util';


export class WorkspaceFiles {
    static getAlFilesFromCurrentWorkspace() {
        //TODO: Current Workspace with "RelativePattern" (which doesn't work yet)

        return vscode.workspace.findFiles('**/*.al');
    }

    static RenameAllFiles() {
        vscode.workspace.saveAll();

        this.getAlFilesFromCurrentWorkspace().then(Files => {
            Files.forEach(file => {
                this.RenameFile(file);
            })
        });
    }

    static RenameFile(fileName: vscode.Uri): string {
        this.ApplySuffixAndPrefixToObjectName(fileName);

        let data = fs.readFileSync(fileName.fsPath, null);
        let objectProperties = this.getFilePropertiesFromObjectText(data.toString(), fileName);

        if (objectProperties.objectFileName != '') {
            if (path.join(path.dirname(fileName.fsPath), objectProperties.objectFileName) == fileName.fsPath) {
                console.log('paths are the same.');
            } else {
                let newFilePath = path.join(path.dirname(fileName.fsPath), objectProperties.objectFileName);
                fs.renameSync(fileName.fsPath, newFilePath);
                console.log('renamed', fileName.fsPath, '-->', newFilePath);
                return newFilePath;
            }
        }

        return '';
    }

    static ApplySuffixAndPrefixToObjectName(fileName: vscode.Uri) {
        let workspacesettings = Settings.GetConfigSettings(fileName);

        if (!workspacesettings[Settings.ObjectNamePrefix] && !workspacesettings[Settings.ObjectNameSuffix]) { return }

        let data = fs.readFileSync(fileName.fsPath, null);
        let objectProperties = this.getFilePropertiesFromObjectText(data.toString(), fileName);
        if (!objectProperties) { return };

        let newObjectData = data.toString();
        newObjectData = workspacesettings[Settings.ObjectNamePrefix] ? this.GetObjectNamewithPrefix(newObjectData, objectProperties, workspacesettings[Settings.ObjectNamePrefix]) : newObjectData;
        newObjectData = workspacesettings[Settings.ObjectNameSuffix] ? this.GetObjectNameWithSuffix(newObjectData, objectProperties, workspacesettings[Settings.ObjectNameSuffix]) : newObjectData;

        newObjectData != data.toString() ? fs.writeFileSync(fileName.fsPath, newObjectData) : null;
    }

    static GetObjectNamewithPrefix(data: string, objectProperties: any, prefix: string): any {
        if (objectProperties.objectNameUnfixed.startsWith(prefix)) { return data }
        console.log('Added prefix "' + prefix + '" to ' + objectProperties.objectNameUnfixed);
        return this.RenameObjectName(data, objectProperties.objectNameUnfixed, prefix + objectProperties.objectNameUnfixed);
    }

    static GetObjectNameWithSuffix(data: string, objectProperties: any, suffix: string): any {
        if (objectProperties.objectNameUnfixed.endsWith(suffix)) { return data }
        console.log('Added suffix "' + suffix + '" to ' + objectProperties.objectNameUnfixed);
        return this.RenameObjectName(data, objectProperties.objectNameUnfixed, objectProperties.objectNameUnfixed + suffix);
    }

    static RenameObjectName(ObjectText: string, OldName: string, NewName: string): any {
        return ObjectText.replace(OldName, NewName);
    }

    static getFilePropertiesFromObjectText(ObjectText: string, file: vscode.Uri): any {
        let workspacesettings = Settings.GetConfigSettings(file);

        var patternObjectType = new RegExp('(codeunit |page |pagecustomization |pageextension |profile |query |report |requestpage |table |tableextension |xmlport )')
        let objectFileName, objectType, objectTypeShort, objectId, objectName, objectNameShort, baseName, baseId, objectNameUnfixed: string;

        let ObjectTypeArr = ObjectText.match(patternObjectType);
        objectType = '';
        objectTypeShort = '';
        objectId = '';
        objectName = '';
        objectNameShort = '';
        objectFileName = '';
        baseName = '';
        baseId = '';
        objectNameUnfixed = '';

        if (!ObjectTypeArr) { return null }

        if (ObjectTypeArr) {
            switch (ObjectTypeArr[0].trim().toLowerCase()) {
                case 'page':
                case 'codeunit':
                case 'query':
                case 'report':
                case 'requestpage':
                case 'table':
                case 'xmlport': {

                    var patternObject = new RegExp('(\\w+)( +[0-9]+)( +"?[ a-zA-Z0-9._/&-]+"?)');
                    let currObject = ObjectText.match(patternObject);

                    objectType = currObject[1];
                    objectId = currObject[2];
                    objectName = currObject[3].replace(/"/g, '').replace(/[^ 0-9a-zA-Z._&-]/g, '_');
                    objectNameUnfixed = currObject[3];
                    objectNameShort = StringFunctions.removeAllButAlfaNumeric(currObject[3].trim());

                    objectFileName = workspacesettings[Settings.FileNamePattern];

                    break;
                }
                case 'pageextension':
                case 'tableextension': {
                    var patternObject = new RegExp('(\\w+)( +[0-9]+)( +"?[ a-zA-Z0-9._&-]+\\/?[ a-zA-Z0-9._&-]+"?) +extends( +"?[ a-zA-Z0-9._&-]+\\/?[ a-zA-Z0-9._&-]+"?) ?(\\/\\/+ *)?([0-9]+)?');
                    let currObject = ObjectText.match(patternObject);

                    objectType = currObject[1];
                    objectId = currObject[2];
                    objectName = currObject[3];
                    objectNameUnfixed = currObject[3];
                    baseName = currObject[4];
                    baseId = currObject[6] ? currObject[6] : '';
                    objectNameShort = StringFunctions.removeAllButAlfaNumeric(currObject[3].trim());

                    objectFileName = workspacesettings[Settings.FileNamePatternExtensions];

                    break;
                }

                case 'profile': {

                    var patternObject = new RegExp('(profile)( +"?[ a-zA-Z0-9._/&-]+"?)');
                    let currObject = ObjectText.match(patternObject);

                    objectType = currObject[1];
                    objectId = '';
                    objectName = currObject[2];
                    objectNameUnfixed = currObject[2];
                    objectNameShort = StringFunctions.removeAllButAlfaNumeric(currObject[2].trim());

                    objectFileName = workspacesettings[Settings.FileNamePattern];

                    break;
                }
                case 'pagecustomization': {

                    var patternObject = new RegExp('(\\w+)( +"?[ a-zA-Z0-9._/&-]+"?) +customizes( +"?[ a-zA-Z0-9._&-]+\\/?[ a-zA-Z0-9._&-]+" ?) (\\/\\/+ *)?([0-9]+)?');
                    let currObject = ObjectText.match(patternObject);

                    objectType = currObject[1];
                    objectId = '';
                    objectName = currObject[2];
                    objectNameUnfixed = currObject[2];
                    baseName = currObject[3];
                    baseId = currObject[5] ? currObject[5] : '';
                    objectNameShort = StringFunctions.removeAllButAlfaNumeric(currObject[2].trim());
                    objectFileName = workspacesettings[Settings.FileNamePatternPageCustomizations];

                    break;
                }
                default: {
                    Error('Not able to parse this file: ' + ObjectText);
                }
            }
            //}

            objectType = objectType.trim().toString();
            objectTypeShort = DynamicsNAV.getBestPracticeAbbreviatedObjectType(objectType);
            objectId = objectId.trim().toString();
            objectName = objectName.trim().toString().replace(/"/g, '').replace(/[^ 0-9a-zA-Z._&-]/g, '_');
            objectNameUnfixed = objectNameUnfixed.trim().toString().replace(/"/g, '');
            baseName = baseName.trim().toString().replace(/"/g, '');
            baseId = baseId.trim().toString();
            objectNameShort = StringFunctions.removeAllButAlfaNumeric(objectNameShort);

            objectFileName = StringFunctions.replaceAll(objectFileName, '<ObjectType>', objectType)
            objectFileName = StringFunctions.replaceAll(objectFileName, '<ObjectTypeShort>', objectTypeShort);
            objectFileName = StringFunctions.replaceAll(objectFileName, '<ObjectId>', objectId);
            objectFileName = StringFunctions.replaceAll(objectFileName, '<ObjectName>', objectName);
            objectFileName = StringFunctions.replaceAll(objectFileName, '<ObjectNameShort>', objectNameShort);
            objectFileName = StringFunctions.replaceAll(objectFileName, '<BaseName>', baseName);
            objectFileName = StringFunctions.replaceAll(objectFileName, '<BaseId>', baseId);
        }
        return {
            objectType: objectType,
            objectTypeShort: objectTypeShort,
            objectId: objectId,
            objectName: objectName,
            objectNameUnfixed: objectNameUnfixed,
            baseName: baseName,
            baseId: baseId,
            objectNameShort: objectNameShort,
            objectFileName: objectFileName
        }
    }

    static ReorganizeAllFiles() {
        vscode.workspace.saveAll();

        this.getAlFilesFromCurrentWorkspace().then(Files => {
            Files.forEach(file => {
                this.ReorganizeFile(file);
            })
        });
    }

    static ReorganizeFile(fileName: vscode.Uri): string {
        this.ApplySuffixAndPrefixToObjectName(fileName);

        let mySettings = Settings.GetConfigSettings(fileName);
        this.throwErrorIfReorgFilesNotAllowed(mySettings);

        let data = fs.readFileSync(fileName.fsPath, null);

        let objectProperties = this.getFilePropertiesFromObjectText(data.toString(), fileName);

        if (objectProperties && objectProperties.objectFileName && objectProperties.objectFileName != '') {
            if (path.join(vscode.workspace.getWorkspaceFolder(fileName).uri.fsPath, objectProperties.objectType, objectProperties.objectFileName) == fileName.fsPath) {
                console.log('paths are the same.');
                return fileName.fsPath;
            } else {
                let objectFolder = path.join(vscode.workspace.getWorkspaceFolder(fileName).uri.fsPath, mySettings[Settings.AlSubFolderName]);
                let objectTypeFolder = path.join(objectFolder, objectProperties.objectType);
                let destinationFileName = path.join(objectTypeFolder, objectProperties.objectFileName);

                (!fs.existsSync(objectFolder)) ? fs.mkdirSync(objectFolder) : '';
                (!fs.existsSync(objectTypeFolder)) ? fs.mkdirSync(objectTypeFolder) : '';

                fs.renameSync(fileName.fsPath, destinationFileName);

                console.log('renamed', fileName.fsPath, '-->', destinationFileName);

                return destinationFileName;
            }
        }

        return fileName.fsPath;
    }

    static throwErrorIfReorgFilesNotAllowed(mySettings: any) {
        if (mySettings[Settings.AlSubFolderName] == 'None') {
            let errorMessage = "Configuration " + Settings.AlSubFolderName + " is set to 'None'.  Please choose another value for this function to work.";

            vscode.window.showErrorMessage(errorMessage);
            throw new error(errorMessage);
        }
    }
}





