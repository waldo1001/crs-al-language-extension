import {window, WorkspaceConfiguration, workspace} from 'vscode';
import {join} from 'path';

export class Settings {
    
    static readonly DefaultRunObjectType = 'DefaultRunObjectType';
    static readonly DefaultRunObjectId = 'DefaultRunObjectId';

    static readonly WebServer = 'WebServer';
    static readonly WebServerInstance = 'WebServerInstance';
    static readonly WebServerInstancePort = 'WebServerInstancePort';
    
    static readonly WinServer = 'WinServer';
    static readonly WinServerInstance = 'WinServerInstance';
    static readonly WinServerInstancePort = 'WinServerInstancePort';
    
    static readonly Tenant = 'Tenant';

    static readonly AppName = 'name'
    static readonly NstFolder = 'nstfolder'
    static readonly ManagementModule = 'managementmodule'

    private static config: WorkspaceConfiguration;
    private static launchconfig: WorkspaceConfiguration;

    private static WORKSPACEKEY: string = 'CRS';

    private static readonly MANAGEMENTDLL = 'Microsoft.Dynamics.Nav.Management.dll';
    
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

        result[this.NstFolder] = this.getSetting(this.NstFolder);
        result[this.ManagementModule] = this.joinPaths([result[this.NstFolder], this.MANAGEMENTDLL]);
        result[this.WebServerInstancePort] =  this.getSetting(this.WebServerInstancePort);;
        result[this.WinServer] = this.getSetting(this.WinServer);
        result[this.WinServerInstance] = this.getSetting(this.WinServerInstance);
        result[this.WinServerInstancePort] = this.getSetting(this.WinServerInstancePort);

        //appsettings
        let appSettings = require(join(workspace.rootPath,"app.json"));
        result[this.AppName] = appSettings.name
        
        //launchsettings
        let currentLaunchConfig = this.launchconfig.configurations;
        result[this.WebServer] = currentLaunchConfig[0].server;
        result[this.WebServerInstance] = currentLaunchConfig[0].serverInstance;                    
        result[this.Tenant] = currentLaunchConfig[0].tenant ? currentLaunchConfig[0].tenant : "default"; 
        
        result[this.DefaultRunObjectType] = 'Page'; 
        result[this.DefaultRunObjectId] = currentLaunchConfig[0].startupObjectId;         
        
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

    private static joinPaths(paths: string[]) {
        for(let i = 0; i < paths.length; i++)
        {
            if(!paths[i] || paths[i] === "")
                return null;
        }
        return join.apply(null, paths);
    }
}