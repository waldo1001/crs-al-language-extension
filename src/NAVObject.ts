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
    public objectActions: NAVObjectAction[] = new Array();
    public tableFields: NAVTableField[] = new Array()
    public extendedObjectName: string;
    public extendedObjectId: string;
    public NAVObjectText: string;
    private _workSpaceSettings: Settings;
    private _objectFileNamePattern: string;

    // Windows chars not allowed in filenames or paths (includes Linux):
    // < (less than)
    // > (greater than)
    // : (colon - sometimes works, but is actually NTFS Alternate Data Streams)
    // " (double quote)
    // / (forward slash)
    // \ (backslash)
    // | (vertical bar or pipe)
    // ? (question mark)
    // * (asterisk)
    private prohibitedFilenameCharsPattern :string = '<>:"/\\\\|\\?\\*';

    constructor(navObject: string, workSpaceSettings: Settings, navObjectFileBaseName: string);
    constructor(navObject: any, workSpaceSettings: Settings, navObjectFileBaseName?: string) {
        this.NAVObjectText = navObject
        this.objectFileName = navObjectFileBaseName
        console.log(`Loading file "${this.objectFileName}"`);

        this._workSpaceSettings = workSpaceSettings;

        this.loadObjectProperties();
    }

    get objectTypeShort(): string {
        return DynamicsNAV.getBestPracticeAbbreviatedObjectType(this.objectType);
    }
    get objectNameFixed(): string {
        let objectNameFixed = this.objectName.trim().toString();
        objectNameFixed = this.AddPrefixAndSuffixToObjectNameFixed(this.objectName);
        return objectNameFixed;
    }
    get objectNameFixedForFileName(): string {
        let objectNameFixed = this.objectNameFixed;
        return objectNameFixed.replace(new RegExp(`[${this.prohibitedFilenameCharsPattern}]`,'g'), '_');
    }
    get objectNameFixedShort(): string {
        return StringFunctions.removeAllButAlfaNumeric(this.objectNameFixed);
    }
    get extendedObjectNameFixed(): string {
        let extendedObjectName = this.extendedObjectName.trim().toString();
        return extendedObjectName;
    }
    get extendedObjectNameFixedForFileName(): string {
        let extendedObjectName = this.extendedObjectNameFixed;
        return extendedObjectName.replace(new RegExp(`[${this.prohibitedFilenameCharsPattern}]`,'g'), '_');
    }
    get extendedObjectNameFixedShort(): string {
        return StringFunctions.removeAllButAlfaNumeric(this.extendedObjectNameFixed);
    }
    get NAVObjectTextFixed(): string {
        let NAVObjectTextFixed = this.NAVObjectText;
        NAVObjectTextFixed = this.updateObjectNameInObjectText(NAVObjectTextFixed); 
        NAVObjectTextFixed = this.AddPrefixToActions(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixToFields(NAVObjectTextFixed);

        return NAVObjectTextFixed;
    }

    get objectFileNameFixed(): string {
        if (!this._objectFileNamePattern) { return this.objectFileName }
        let objectFileNameFixed = this._objectFileNamePattern

        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<Prefix>', this._workSpaceSettings[Settings.ObjectNamePrefix]);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<Suffix>', this._workSpaceSettings[Settings.ObjectNameSuffix]);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectType>', this.objectType)
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectTypeShort>', this.objectTypeShort);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectTypeShortUpper>', this.objectTypeShort.toUpperCase());
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectId>', this.objectId);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectName>', this.objectNameFixedForFileName);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<ObjectNameShort>', this.objectNameFixedShort);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<BaseName>', this.extendedObjectNameFixedForFileName);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<BaseNameShort>', this.extendedObjectNameFixedShort);
        objectFileNameFixed = StringFunctions.replaceAll(objectFileNameFixed, '<BaseId>', this.extendedObjectId);

        return objectFileNameFixed
    }

    get objectCodeunitSubType(): string {
        if (this.objectType.toLowerCase() != 'codeunit') { return null }

        var reg = /(Subtype) *= *(.+);/g
        var result = reg.exec(this.NAVObjectText)
        if (result !== null) {
            return result[2]
        }

        return null
    }

    private loadObjectProperties(): any {
        var patternObjectType = new RegExp('(codeunit |page |pagecustomization |pageextension |profile |query |report |requestpage |table |tableextension |xmlport )')

        let ObjectTypeArr = this.NAVObjectText.match(patternObjectType);

        this._objectFileNamePattern = '';
        this.objectType = '';
        this.objectId = '';
        this.objectName = '';
        this.extendedObjectName = '';
        this.extendedObjectId = '';
        var ObjectNamePattern = '"[^"]*"' // All characters except "
        var ObjectNameNoQuotesPattern = '[\\w]*';

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

                    var patternObject = new RegExp(`(\\w+) +([0-9]+) +(${ObjectNamePattern}|${ObjectNameNoQuotesPattern})([^"\n]*"[^"\n]*)?`);
                    let currObject = this.NAVObjectText.match(patternObject);
                    if (currObject == null) {
                        throw new Error(`File '${this.objectFileName}' does not have valid object name. Maybe it got double quotes (") in the object name?`)
                    }
                    if (currObject[4] != null) {
                        throw new Error(`File '${this.objectFileName}' does not have valid object name, it has too many double quotes (")`)
                    }

                    this.objectType = currObject[1];
                    this.objectId = currObject[2];
                    this.objectName = currObject[3];

                    this._objectFileNamePattern = this._workSpaceSettings[Settings.FileNamePattern];

                    break;
                }
                case 'pageextension':
                case 'tableextension': {
                    var patternObject = new RegExp(`(\\w+) +([0-9]+) +(${ObjectNamePattern}|${ObjectNameNoQuotesPattern}) +extends +(${ObjectNamePattern}|${ObjectNameNoQuotesPattern})\\s*(\\/\\/\\s*)?([0-9]+)?`);
                    let currObject = this.NAVObjectText.match(patternObject);
                    if (currObject == null) {
                       throw new Error(`File '${this.objectFileName}' does not have valid object names. Maybe it got double quotes (") in the object name?`)
                    }
                    this.objectType = currObject[1];
                    this.objectId = currObject[2];
                    this.objectName = currObject[3];
                    this.extendedObjectName = currObject[4];
                    this.extendedObjectId = currObject[6] ? currObject[6] : '';

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
                    this.extendedObjectName = currObject[3];
                    this.extendedObjectId = currObject[5] ? currObject[5] : '';
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
            this.extendedObjectName = this.extendedObjectName.trim().toString().replace(/"/g, '');
            this.extendedObjectId = this.extendedObjectId.trim().toString();
        }

        var reg = NAVObjectAction.actionRegEx();
        var result;
        while ((result = reg.exec(this.NAVObjectText)) !== null) {
            this.objectActions.push(new NAVObjectAction(result[1], this._workSpaceSettings[Settings.ObjectNamePrefix]))
        }

        var reg = NAVTableField.fieldRegEx();
        var result;
        while ((result = reg.exec(this.NAVObjectText)) !== null) {
            this.tableFields.push(new NAVTableField(result[1], this.objectType, this._workSpaceSettings[Settings.ObjectNamePrefix]))
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
        if (!this.objectName) { return objectText };
        var escapedObjectName = this.escapeRegExp(this.objectName);
        var searchPattern = RegExp(escapedObjectName);
        if (objectText.indexOf("\"" + this.objectName + "\"") >= 0) {
            return objectText.replace(searchPattern, this.objectNameFixed);
        } else {
            return objectText.replace(searchPattern, "\"" + this.objectNameFixed + "\"");
        }
    }

    private escapeRegExp(str) {
        // Ref. https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }

    private AddPrefixToActions(objectText: string): string {
        this.objectActions.forEach(action => {
            objectText = objectText.replace(action.fullActionText, action.fullActionTextFixed);
        })

        return objectText;
    }

    private AddPrefixToFields(objectText: string): string {
        this.tableFields.forEach(field => {
            objectText = objectText.replace(field.fullFieldText, field.fullFieldTextFixed);
        })

        return objectText;
    }
}

class NAVObjectAction {
    public name: string;
    public fullActionText: string;
    private _prefix: string;

    public static actionRegEx(): RegExp {
        return /.*((action\("?)([ a-zA-Z0-9._/&-]+)"?\))/g
    }

    get nameFixed(): string {
        if (!this._prefix) { return this.name }

        if (!this.name.startsWith(this._prefix)) {
            return this._prefix + this.name
        } else {
            return this.name
        }
    }

    get fullActionTextFixed(): string {
        if (!this._prefix) { return this.fullActionText };

        return "action(\"" + this.nameFixed + "\")"
    }

    constructor(fullActionText: string, prefix?: string) {
        this.fullActionText = fullActionText;
        this._prefix = prefix ? prefix : null;

        this.parseActionText();
    }

    private parseActionText() {
        var reg = NAVObjectAction.actionRegEx();
        var result = reg.exec(this.fullActionText)
        if (result !== null) {
            this.name = result[3];
        }
    }
}

class NAVTableField {
    public name: string;
    public fullFieldText: string;
    public number: string;
    public type: string;
    private _objectType: string;
    private _prefix: string;

    public static fieldRegEx(): RegExp {
        return /.*(field\((\d+); *"?([ a-zA-Z0-9._/&-]+)"?;(.*)\))/g;
    }

    get nameFixed(): string {
        if (!this._prefix) { return this.name }
        if (this._objectType.toLocaleLowerCase() != "tableextension") { return this.name };

        if (!this.name.startsWith(this._prefix)) {
            return this._prefix + this.name
        } else {
            return this.name
        }
    }

    get fullFieldTextFixed(): string {
        if (!this._prefix) { return this.fullFieldText }

        return "field(" + this.number + "; \"" + this.nameFixed + "\"; " + this.type + ")"
    }

    constructor(fullFieldText: string, objectType: string, prefix?: string) {
        this.fullFieldText = fullFieldText;
        this._prefix = prefix ? prefix : null;
        this._objectType = objectType;

        this.parseFieldText();
    }

    private parseFieldText() {
        var reg = NAVTableField.fieldRegEx();
        var result = reg.exec(this.fullFieldText)
        if (result !== null) {
            this.number = result[2].trim().toString();
            this.name = result[3].trim().toString();
            this.type = result[4].trim().toString();
        }
    }
}

