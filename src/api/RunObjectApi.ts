import * as CRSApi from 'crs-al-language-extension-api';
import { DynamicsNAV } from "../DynamicsNAV";

export class RunObjectApi implements CRSApi.IRunObjectApi {

    public RunObjectInWebClient(objecttype: any, objectid: any) : void {
        DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'WebClient');
    }

    public RunObjectInTabletClient(objecttype: any, objectid: any) : void {
        DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'Tablet');
    }

    public RunObjectInPhoneClient(objecttype: any, objectid: any) : void {
        DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'Phone');
    }

    public RunObjectInWindowsClient(objecttype: any, objectid: any) : void {
        DynamicsNAV.RunObjectInWindowsClient(objecttype, objectid);
    }

}