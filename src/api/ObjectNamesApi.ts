import * as CRSApi from 'crs-al-language-extension-api';
import { StringFunctions } from '../StringFunctions';
import { DynamicsNAV } from '../DynamicsNAV';
import { ObjectNameHelper } from './ObjectNameHelper';

export class ObjectNamesApi implements CRSApi.IObjectNamesApi {

    public GetObjectFileName(objectType: string, objectId : string, objectName: string) : string {
        let objectNameHelper : ObjectNameHelper = new ObjectNameHelper(objectType, objectId, objectName, '', '');
        return objectNameHelper.objectFileNameFixed;
    }

    public GetObjectExtensionFileName(objectType: string, objectId : string, objectName: string, extendedObjectId : string, extendedObjectName : string) : string {
        let objectNameHelper : ObjectNameHelper = new ObjectNameHelper(objectType, objectId, objectName, extendedObjectId, extendedObjectName);
        return objectNameHelper.objectFileNameFixed;
    }

    public GetObjectExtensionName(objectType: string, objectId : string, objectName: string, extendedObjectId : string, extendedObjectName : string) : string {
        let objectNameHelper : ObjectNameHelper = new ObjectNameHelper(objectType, objectId, objectName, extendedObjectId, extendedObjectName);
       return objectNameHelper.objectNameFixed;
    }

}