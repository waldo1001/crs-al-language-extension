'use strict';

declare module 'crs-al-language-extension-api' {

    export interface ICRSExtensionPublicApi {
        RunObjectApi : IRunObjectApi;
        ObjectNamesApi : IObjectNamesApi;
    }

    export interface IObjectNamesApi {

    }

    export interface IRunObjectApi {
        RunObjectInWebClient(objecttype: any, objectid: any) : void;
        RunObjectInTabletClient(objecttype: any, objectid: any) : void;
        RunObjectInPhoneClient(objecttype: any, objectid: any) : void;
        RunObjectInWindowsClient(objecttype: any, objectid: any) : void;    
    }

}