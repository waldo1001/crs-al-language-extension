import {window, WorkspaceConfiguration, workspace} from 'vscode';
import {join} from 'path';

export class Settings {
    
    static readonly DefaultRunObjectType = 'DefaultRunObjectType';
    static readonly DefaultRunObjectId = 'DefaultRunObjectId';
    static readonly TestServerInstance = 'serverInstance';
    static readonly TestTenant = 'tenant';
    static readonly AppName = 'name'

    private static config: WorkspaceConfiguration;
    private static launchconfig: WorkspaceConfiguration;

    private static WORKSPACEKEY: string = 'CRS';
    
    private static getSetting(key: string){         
        if(!this.config.has(key)) 
        { 
            return null; 
        } else {
            return this.config.get(key); 
        }            
    } 

    private static getSettings(){ 
        let result = {}; 

        result[this.DefaultRunObjectType] = this.getSetting(this.DefaultRunObjectType); 
        result[this.DefaultRunObjectId] = this.getSetting(this.DefaultRunObjectId); 

        //appsettings
        let appSettings = require(join(workspace.rootPath,"app.json"));
        result[this.AppName] = appSettings.name
        
        //launchsettings
        let currentLaunchConfig = this.launchconfig.configurations;
        result[this.TestServerInstance] = currentLaunchConfig[0].serverInstance;            
        result[this.TestTenant] = currentLaunchConfig[0].tenant;            

        return result; 
    }

    public static GetAllSettings() {
        this.config = workspace.getConfiguration(this.WORKSPACEKEY);
        this.launchconfig = workspace.getConfiguration('launch');

        return this.getSettings();
    }

    public static UpdateSetting(key: string,newvalue: any){
        this.config.update(key,newvalue);
    }
}