'use strict';

import { StringFunctions } from "../StringFunctions";
import { DynamicsNAV } from "../DynamicsNAV";
import { Settings } from "../Settings";

export class ObjectNameHelper {
    public objectType: string;
    public objectId: string;
    public objectName: string;
    public extendedObjectName: string;
    public extendedObjectId: string;
    public isExtension : boolean;
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

    constructor(newObjectType : string, newObjectId : string, newObjectName : string, newExtendedObjectId : string, newExtendedObjectName : string) {
        this.objectType = newObjectType;
        this.objectId = newObjectId;
        this.objectName = newObjectName;
        this.extendedObjectId = newExtendedObjectId;
        this.extendedObjectName = newExtendedObjectName;
        this._workSpaceSettings = Settings.GetConfigSettings(null);
        this._objectFileNamePattern = this.getFileNamePattern();
    }

    private getFileNamePattern() {
        switch (this.objectType.trim().toLowerCase()) {
            case 'page':
            case 'codeunit':
            case 'query':
            case 'report':
            case 'requestpage':
            case 'table':
            case 'xmlport':
            case 'enum': 
            case 'profile':
                return this._workSpaceSettings[Settings.FileNamePattern];
            case 'pageextension':
            case 'tableextension':
            case 'enumextension':
                return this._workSpaceSettings[Settings.FileNamePatternExtensions];
            case 'pagecustomization':
                return this._workSpaceSettings[Settings.FileNamePatternPageCustomizations];
            default:
                return this._workSpaceSettings[Settings.FileNamePattern];
        }
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
    
    get objectFileNameFixed(): string {
        if (!this._objectFileNamePattern) { return this.objectName + '.al'; }
        let objectFileNameFixed = this._objectFileNamePattern

        objectFileNameFixed = this.ApplyPatternToFileName(objectFileNameFixed);

        return objectFileNameFixed
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


} 