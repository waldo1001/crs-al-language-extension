import * as CRSApi from 'crs-al-language-extension-api';
import { StringFunctions } from '../StringFunctions';
import { DynamicsNAV } from '../DynamicsNAV';
import { NAVObject } from '../NAVObject';
import { Settings } from '../Settings';

export class ObjectNamesApi implements CRSApi.IObjectNamesApi {

    private getConfigSettings() : any {
        return Settings.GetConfigSettings(null);
    }

    public GetObjectFileName(objectType: string, objectId : string, objectName: string) : string {
        let navObject : NAVObject = new NAVObject('', this.getConfigSettings(), '');
        navObject.setObjectProperies(objectType, objectId, objectName);
        return navObject.objectFileNameFixed;
    }

    public GetObjectExtensionFileName(objectType: string, objectId : string, objectName: string, extendedObjectId : string, extendedObjectName : string) : string {
        let navObject : NAVObject = new NAVObject('', this.getConfigSettings(), '');
        navObject.setObjectExtensionProperies(objectType, objectId, objectName, extendedObjectId, extendedObjectName);
        return navObject.objectFileNameFixed;
    }

    public GetObjectExtensionName(objectType: string, objectId : string, objectName: string, extendedObjectId : string, extendedObjectName : string) : string {
        let navObject : NAVObject = new NAVObject('', this.getConfigSettings(), '');
        navObject.setObjectExtensionProperies(objectType, objectId, objectName, extendedObjectId, extendedObjectName);
        return navObject.objectNameFixed;
    }

}