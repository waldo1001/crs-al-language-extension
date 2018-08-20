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
    private prohibitedFilenameCharsPattern: string = '<>:"/\\\\|\\?\\*';

    constructor(navObject: string, workSpaceSettings: Settings, navObjectFileBaseName: string);
    constructor(navObject: any, workSpaceSettings: Settings, navObjectFileBaseName?: string) {
        this.NAVObjectText = navObject
        this.objectFileName = navObjectFileBaseName

        this._workSpaceSettings = workSpaceSettings;

        this.loadObjectProperties();
    }

    get objectTypeShort(): string {
        return DynamicsNAV.getBestPracticeAbbreviatedObjectType(this.objectType);
    }
    get objectNameFixed(): string {
        let objectNameFixed = this.ApplyExtensionObjectNamePattern(this.objectName.trim().toString());
        if (objectNameFixed == this.objectName.trim().toString()) {
            objectNameFixed = this.AddPrefixAndSuffixToObjectNameFixed(objectNameFixed);
        }

        return objectNameFixed;
    }

    get objectNameFixedForFileName(): string {
        let objectNameFixed = this.RemovePrefixAndSuffixFromObjectNameFixed(this.objectNameFixed);
        return objectNameFixed.replace(new RegExp(`[${this.prohibitedFilenameCharsPattern}]`, 'g'), '_');
    }
    get objectNameFixedShort(): string {
        return StringFunctions.removeAllButAlfaNumeric(this.RemovePrefixAndSuffixFromObjectNameFixed(this.objectNameFixed));
    }
    get extendedObjectNameFixed(): string {
        let extendedObjectName = this.extendedObjectName.trim().toString();
        return extendedObjectName;
    }
    get extendedObjectNameFixedForFileName(): string {
        let extendedObjectName = this.extendedObjectNameFixed;
        return extendedObjectName.replace(new RegExp(`[${this.prohibitedFilenameCharsPattern}]`, 'g'), '_');
    }
    get extendedObjectNameFixedShort(): string {
        return StringFunctions.removeAllButAlfaNumeric(this.extendedObjectNameFixed);
    }
    get NAVObjectTextFixed(): string {
        let NAVObjectTextFixed = this.NAVObjectText;
        NAVObjectTextFixed = this.updateObjectNameInObjectText(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixAndSuffixToActions(NAVObjectTextFixed);
        NAVObjectTextFixed = this.AddPrefixAndSuffixToFields(NAVObjectTextFixed);

        return NAVObjectTextFixed;
    }

    get objectFileNameFixed(): string {
        if (!this._objectFileNamePattern) { return this.objectFileName }
        let objectFileNameFixed = this._objectFileNamePattern

        objectFileNameFixed = this.ApplyPatternToFileName(objectFileNameFixed);

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
        var patternObjectType = new RegExp('(codeunit |page |pagecustomization |pageextension |profile |query |report |requestpage |table |tableextension |xmlport )', "i")

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
            this.objectActions.push(new NAVObjectAction(result[1], this.objectType, this._workSpaceSettings[Settings.ObjectNamePrefix], this._workSpaceSettings[Settings.ObjectNameSuffix]))
        }

        var reg = NAVTableField.fieldRegEx();
        var result;
        while ((result = reg.exec(this.NAVObjectText)) !== null) {
            this.tableFields.push(new NAVTableField(result[1], this.objectType, this._workSpaceSettings[Settings.ObjectNamePrefix], this._workSpaceSettings[Settings.ObjectNameSuffix]))
        }
    }
    private ApplyExtensionObjectNamePattern(objectName: string): string {
        if (!this._workSpaceSettings[Settings.ExtensionObjectNamePattern] || !this.objectType.toLocaleLowerCase().endsWith('extension')) { return objectName }

        let result = this._workSpaceSettings[Settings.ExtensionObjectNamePattern];
        result = this.ApplyPatternToObjectName(result);

        return result
    }
    private ApplyPatternToObjectName(pattern: string): string {
        let result = pattern;

        result = StringFunctions.replaceAll(result, '<Prefix>', this._workSpaceSettings[Settings.ObjectNamePrefix]);
        result = StringFunctions.replaceAll(result, '<Suffix>', this._workSpaceSettings[Settings.ObjectNameSuffix]);
        result = StringFunctions.replaceAll(result, '<ObjectType>', this.objectType)
        result = StringFunctions.replaceAll(result, '<ObjectTypeShort>', this.objectTypeShort);
        result = StringFunctions.replaceAll(result, '<ObjectTypeShortUpper>', this.objectTypeShort.toUpperCase());
        result = StringFunctions.replaceAll(result, '<ObjectId>', this.objectId);
        result = StringFunctions.replaceAll(result, '<BaseName>', this.extendedObjectNameFixedForFileName);
        result = StringFunctions.replaceAll(result, '<BaseNameShort>', this.extendedObjectNameFixedShort);
        result = StringFunctions.replaceAll(result, '<BaseId>', this.extendedObjectId);

        return result;
    }
    private ApplyPatternToFileName(pattern: string): string {
        let result = pattern;

        result = StringFunctions.replaceAll(result, '<Prefix>', this._workSpaceSettings[Settings.ObjectNamePrefix]);
        result = StringFunctions.replaceAll(result, '<Suffix>', this._workSpaceSettings[Settings.ObjectNameSuffix]);
        result = StringFunctions.replaceAll(result, '<ObjectType>', this.objectType)
        result = StringFunctions.replaceAll(result, '<ObjectTypeShort>', this.objectTypeShort);
        result = StringFunctions.replaceAll(result, '<ObjectTypeShortUpper>', this.objectTypeShort.toUpperCase());
        result = StringFunctions.replaceAll(result, '<ObjectId>', this.objectId);
        result = StringFunctions.replaceAll(result, '<ObjectName>', this.objectNameFixedForFileName);
        result = StringFunctions.replaceAll(result, '<ObjectNameShort>', this.objectNameFixedShort);
        result = StringFunctions.replaceAll(result, '<BaseName>', this.extendedObjectNameFixedForFileName);
        result = StringFunctions.replaceAll(result, '<BaseNameShort>', this.extendedObjectNameFixedShort);
        result = StringFunctions.replaceAll(result, '<BaseId>', this.extendedObjectId);

        return result;
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
    private RemovePrefixAndSuffixFromObjectNameFixed(objectName: string): string {
        let removePrefix = this._workSpaceSettings[Settings.RemovePrefixFromFilename];
        let removeSuffix = this._workSpaceSettings[Settings.RemoveSuffixFromFilename];
        if (!removePrefix && !removeSuffix) { return objectName }

        let prefix: string = this._workSpaceSettings[Settings.ObjectNamePrefix];
        let suffix: string = this._workSpaceSettings[Settings.ObjectNameSuffix];
        if (!prefix && !suffix) { return objectName }

        if (prefix && removePrefix && objectName.startsWith(prefix)) {
            objectName = objectName.substr(prefix.length);
        }

        if (suffix && removeSuffix && objectName.endsWith(suffix)) {
            objectName = objectName.substr(0, objectName.length - suffix.length);
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

    private AddPrefixAndSuffixToActions(objectText: string): string {
        this.objectActions.forEach(action => {
            objectText = objectText.replace(action.fullActionText, action.fullActionTextFixed);
        })

        return objectText;
    }

    private AddPrefixAndSuffixToFields(objectText: string): string {
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
    private _suffix: string;
    private _objectType: string;

    public static actionRegEx(): RegExp {
        return /.*((action\("?)([ a-zA-Z0-9._/&-]+)"?\))/g
    }

    get nameFixed(): string {
        if (!this._prefix && !this._suffix) { return this.name }
        if (this._objectType.toLocaleLowerCase() != "pageextension") { return this.name }; //avoid on pages

        let result = this.name
        if (this._prefix && !this.name.startsWith(this._prefix)) {
            result = this._prefix + result
        }
        if (this._suffix && !this.name.endsWith(this._suffix)) {
            result = result + this._suffix
        }
        return result
    }

    get fullActionTextFixed(): string {
        if (!this._prefix && !this._suffix) { return this.fullActionText };

        return "action(\"" + this.nameFixed + "\")"
    }

    constructor(fullActionText: string, objectType: string, prefix?: string, suffix?: string) {
        this.fullActionText = fullActionText;
        this._prefix = prefix ? prefix : null;
        this._suffix = suffix ? suffix : null;
        this._objectType = objectType;

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
    private _suffix: string;

    public static fieldRegEx(): RegExp {
        return /.*(field\((\d+); *"?([ a-zA-Z0-9._/&-]+)"?;(.*)\))/g;
    }

    get nameFixed(): string {
        if (!this._prefix && !this._suffix) { return this.name }
        if (this._objectType.toLocaleLowerCase() != "tableextension") { return this.name }; //avoid on tables

        let result = this.name
        if (this._prefix && !this.name.startsWith(this._prefix)) {
            result = this._prefix + result
        }
        if (this._suffix && !this.name.endsWith(this._suffix)) {
            result = result + this._suffix
        }
        return result
    }

    get fullFieldTextFixed(): string {
        if (!this._prefix && !this._suffix) { return this.fullFieldText }

        return "field(" + this.number + "; \"" + this.nameFixed + "\"; " + this.type + ")"
    }

    constructor(fullFieldText: string, objectType: string, prefix?: string, suffix?: string) {
        this.fullFieldText = fullFieldText;
        this._prefix = prefix ? prefix : null;
        this._suffix = suffix ? suffix : null;
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

