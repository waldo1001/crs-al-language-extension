import * as CRSApi from 'crs-al-language-extension-api';
import { RunObjectApi } from './RunObjectApi';
import { ObjectNamesApi } from './ObjectNamesApi';

export class CRSExtensionPublicApi implements CRSApi.ICRSExtensionPublicApi {
    RunObjectApi: CRSApi.IRunObjectApi;
    ObjectNamesApi: CRSApi.IObjectNamesApi;
    
    constructor() {
        this.RunObjectApi = new RunObjectApi();
        this.ObjectNamesApi = new ObjectNamesApi();
    }

} 