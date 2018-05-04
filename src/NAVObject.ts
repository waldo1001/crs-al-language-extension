import * as vscode from 'vscode';
import { Settings } from './Settings';
import { StringFunctions } from './StringFunctions'
import { DynamicsNAV } from './DynamicsNAV';
import * as fs from 'fs';
import * as path from 'path'

export class NAVObject {
    public objectFileName: string;
    public objectType: string;
    public objectId: string;
    public objectName: string;
    public objectActions: NAVPageAction[] = new Array();
    public ExtendedObjectName: string;
    public ExtendedObjectId: string;
    public NAVObjectText: string;
    private _workSpaceSettings: Settings;
    private _objectFileNamePattern: string;

    constructor(navObject: string, workSpaceSettings: Settings, navObjectFileBaseName: string);
    constructor(navObject: any, workSpaceSettings: Settings, navObjectFileBaseName?: string) {
        this.NAVObjectText = navObject
        this.objectFileName = navObjectFileBaseName

        this._workSpaceSettings = workSpaceSettings;

        /*         this._NAVObjectFile = !NAVObjectFile ? vscode.window.activeTextEditor.document.uri : NAVObjectFile;
                if (!NAVObjectFile) {
                    vscode.window.showErrorMessage('No valid file to process... ');
                } */

        //this.loadWorkSpaceSettings();
        this.loadObjectProperties();
    }

    get objectTypeShort(): string {
        return DynamicsNAV.getBestPracticeAbbreviatedObjectType(this.objectType);
    }

    get objectNameFixedShort(): string {
        return StringFunctions.removeAllButAlfaNumeric(this.objectNameFixed.replace(/[^ 0-9a-zA-Z._&-]/g, '_'));
    }
    get objectNameFixed(): string {
        let objectNameFixed = this.objectName.trim().toString();
        objectNameFixed = this.AddPrefixAndSuffixToObjectNameFixed(this.objectName);

        return objectNameFixed;
    }
    get NAVObjectTextFixed(): string {
        let NAVObjectTextFixed = this.NAVObjectText;
        NAVObjectTextFixed = this.updateObjectNameInObjectText(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixToActions(NAVObjectTextFixed);

        return NAVObjectTextFixed;
    }

    get objectFileNameFixed(): string {

        let objectFileNameFixed = this._objectFileNamePattern
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectType>', this.objectType)
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectTypeShort>', this.objectTypeShort);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectId>', this.objectId);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectName>', this.objectNameFixed);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectNameShort>', this.objectNameFixedShort);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<BaseName>', this.ExtendedObjectName);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<BaseId>', this.ExtendedObjectId);

        return objectFileNameFixed
    }

    /*     public RenameFileIfNecessary(): string {
            let fixedObjectFileName = this.objectFileNameFixed;
    
            if (fixedObjectFileName == '') { return '' }
    
            if (this.objectFileName != fixedObjectFileName) {
                let newFilePath = path.join(path.dirname(this._NAVObjectFile.fsPath), fixedObjectFileName);
                fs.renameSync(this._NAVObjectFile.fsPath, newFilePath);
                console.log('renamed', this._NAVObjectFile.fsPath, '-->', newFilePath);
                return newFilePath;
            } else {
                console.log('paths are the same.');
            }
        } */

    /*     private loadWorkSpaceSettings() {
            if (this.workSpaceSettings) { return null }
    
            if (this._NAVObjectFile) {
                this.workSpaceSettings = Settings.GetConfigSettings(this._NAVObjectFile);
            } else {
                this.workSpaceSettings = Settings.GetConfigSettings(null);
            }
        } */

    private loadObjectProperties(): any {
        var patternObjectType = new RegExp('(codeunit |page |pagecustomization |pageextension |profile |query |report |requestpage |table |tableextension |xmlport )')

        let ObjectTypeArr = this.NAVObjectText.match(patternObjectType);

        this._objectFileNamePattern = '';
        this.objectType = '';
        this.objectId = '';
        this.objectName = '';
        this.ExtendedObjectName = '';
        this.ExtendedObjectId = '';

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
                    let currObject = this.NAVObjectText.match(patternObject);

                    this.objectType = currObject[1];
                    this.objectId = currObject[2];
                    this.objectName = currObject[3];

                    this._objectFileNamePattern = this._workSpaceSettings[Settings.FileNamePattern];

                    break;
                }
                case 'pageextension':
                case 'tableextension': {
                    var patternObject = new RegExp('(\\w+)( +[0-9]+)( +"?[ a-zA-Z0-9._&-]+\\/?[ a-zA-Z0-9._&-]+"?) +extends( +"?[ a-zA-Z0-9._&-]+\\/?[ a-zA-Z0-9._&-]+"?) ?(\\/\\/+ *)?([0-9]+)?');
                    let currObject = this.NAVObjectText.match(patternObject);

                    this.objectType = currObject[1];
                    this.objectId = currObject[2];
                    this.objectName = currObject[3];
                    this.ExtendedObjectName = currObject[4];
                    this.ExtendedObjectId = currObject[6] ? currObject[6] : '';

                    this._objectFileNamePattern = this._workSpaceSettings[Settings.FileNamePatternExtensions];

                    break;
                }

                case 'profile': {

                    var patternObject = new RegExp('(profile)( +"?[ a-zA-Z0-9._/&-]+"?)');
                    let currObject = this.NAVObjectText.match(patternObject);

                    this.objectType = currObject[1];
                    this.objectId = '';
                    this.objectName = currObject[2];

                    this._objectFileNamePattern = this._workSpaceSettings[Settings.FileNamePattern];

                    break;
                }
                case 'pagecustomization': {

                    var patternObject = new RegExp('(\\w+)( +"?[ a-zA-Z0-9._/&-]+"?) +customizes( +"?[ a-zA-Z0-9._&-]+\\/?[ a-zA-Z0-9._&-]+"?) (\\/\\/+ *)?([0-9]+)?');
                    let currObject = this.NAVObjectText.match(patternObject);

                    this.objectType = currObject[1];
                    this.objectId = '';
                    this.objectName = currObject[2];
                    this.ExtendedObjectName = currObject[3];
                    this.ExtendedObjectId = currObject[5] ? currObject[5] : '';
                    this._objectFileNamePattern = this._workSpaceSettings[Settings.FileNamePatternPageCustomizations];

                    break;
                }
                default: {
                    Error('Not able to parse this file: ' + this.NAVObjectText);
                }
            }

            this.objectType = this.objectType.trim().toString();
            this.objectId = this.objectId.trim().toString();
            this.objectName = this.objectName.trim().toString().replace(/"/g, '');
            this.ExtendedObjectName = this.ExtendedObjectName.trim().toString().replace(/"/g, '');
            this.ExtendedObjectId = this.ExtendedObjectId.trim().toString();
        }

        let navPageActions: NAVPageAction[] = new Array();
        var reg = /.+((action\("?)([ a-zA-Z0-9._/&-]+)"?\))/g;
        var result;
        while ((result = reg.exec(this.NAVObjectText)) !== null) {
            this.objectActions.push(new NAVPageAction(result[1], result[3], this._workSpaceSettings[Settings.ObjectNamePrefix]))
        }
    }

    private AddPrefixAndSuffixToObjectNameFixed(objectName: string): string {
        let prefix = this._workSpaceSettings[Settings.ObjectNamePrefix];
        let suffix = this._workSpaceSettings[Settings.ObjectNameSuffix];
        if (!prefix && !suffix) { return objectName }

        if (prefix && !objectName.startsWith(prefix)) {
            objectName = prefix + objectName;
        }
        if (suffix && !objectName.endsWith(suffix)) {
            objectName = objectName + suffix;
        }
        return objectName
    }

    private updateObjectNameInObjectText(objectText: string): string {
        if (objectText.indexOf("\"" + this.objectName + "\"") >= 0) {
            return objectText.replace(this.objectName, this.objectNameFixed);
        } else {
            return objectText.replace(this.objectName, "\"" + this.objectNameFixed + "\"");
        }
    }

    private AddPrefixToActions(objectText: string): string {
        this.objectActions.forEach(action => {
            objectText = objectText.replace(action.fullActionText, "action(\"" + action.nameFixed + "\")")
        })

        return objectText;
    }
}

class NAVPageAction {
    public name: string;
    public fullActionText: string;
    private _prefix: string;

    get nameFixed(): string {
        if (!this._prefix) { return this.name }

        if (!this.name.startsWith(this._prefix)) {
            return this._prefix + this.name
        } else {
            return this.name
        }
    }

    constructor(fullActionText: string, actionName: string, prefix?: string) {
        this.name = actionName;
        this.fullActionText = fullActionText;
        this._prefix = prefix ? prefix : null;
    }
}
