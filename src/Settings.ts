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

    static readonly AppName = 'name';
    static readonly NstFolder = 'nstfolder';
    static readonly ManagementModule = 'managementmodule';

    static readonly FileNamePattern = 'FileNamePattern';
    static readonly FileNamePatternExtensions = 'FileNamePatternExtensions';
    static readonly FileNamePatternPageCustomizations = 'FileNamePatternPageCustomizations';

    static readonly AlSubFolderName = 'AlSubFolderName';

    private static config: WorkspaceConfiguration;
    private static launchconfig: WorkspaceConfiguration;

    private static SettingCollection = {};

    private static WORKSPACEKEY: string = 'CRS';

    private static readonly MANAGEMENTDLL = 'Microsoft.Dynamics.Nav.Management.dll';
    
    private static ConfigSettingsLoaded: boolean = false;
    private static AppSettingsLoaded: boolean = false;
    private static LaunchSettingsLoaded: boolean = false;

    private static getSetting(key: string){         
        if(!this.config.has(key)) 
        { 
            return null; 
        } else {
            return this.config.get(key); 
        }            
    } 

    private static getConfigSettings(){
        if (this.ConfigSettingsLoaded){ return } 
        
        this.config = workspace.getConfiguration(this.WORKSPACEKEY);
        
        this.SettingCollection[this.NstFolder] = this.getSetting(this.NstFolder);
        this.SettingCollection[this.ManagementModule] = this.joinPaths([this.SettingCollection[this.NstFolder], this.MANAGEMENTDLL]);
        this.SettingCollection[this.WebServerInstancePort] =  this.getSetting(this.WebServerInstancePort);;
        this.SettingCollection[this.WinServer] = this.getSetting(this.WinServer);
        this.SettingCollection[this.WinServerInstance] = this.getSetting(this.WinServerInstance);
        this.SettingCollection[this.WinServerInstancePort] = this.getSetting(this.WinServerInstancePort);
        this.SettingCollection[this.FileNamePattern] = this.getSetting(this.FileNamePattern);
        this.SettingCollection[this.FileNamePatternExtensions] = this.getSetting(this.FileNamePatternExtensions);
        this.SettingCollection[this.FileNamePatternPageCustomizations] = this.getSetting(this.FileNamePatternPageCustomizations);
        this.SettingCollection[this.AlSubFolderName] = this.getSetting(this.AlSubFolderName);
        
        this.ConfigSettingsLoaded = true;
    }
    
    private static getAppSettings(){
        if (this.AppSettingsLoaded){ return } 

        let appSettings = require(join(workspace.rootPath,"app.json")); //TODO: work with "workspace.workspaceFolders" or "workspace.getWorkspaceFolder" instead
        
        this.SettingCollection[this.AppName] = appSettings.name
        
        this.AppSettingsLoaded = true;
    }
    
    private static getLaunchSettings(){
        if (this.LaunchSettingsLoaded){ return } 
        
        this.launchconfig = workspace.getConfiguration('launch');
        
        let currentLaunchConfig = this.launchconfig.configurations;
        this.SettingCollection[this.WebServer] = currentLaunchConfig[0].server;
        this.SettingCollection[this.WebServerInstance] = currentLaunchConfig[0].serverInstance;                    
        this.SettingCollection[this.Tenant] = currentLaunchConfig[0].tenant ? currentLaunchConfig[0].tenant : "default";         
        this.SettingCollection[this.DefaultRunObjectType] = currentLaunchConfig[0].startupObjectType;
        this.SettingCollection[this.DefaultRunObjectId] = currentLaunchConfig[0].startupObjectId;         

        this.LaunchSettingsLoaded = true;
    }

    public static GetAllSettings() {
        this.getConfigSettings();
        this.getAppSettings();
        this.getLaunchSettings();   
        
        return this.SettingCollection;
    }

    public static GetAppSettings() {
        this.getAppSettings();
        
        return this.SettingCollection;
    }
    
    public static GetLaunchSettings() {
        this.getLaunchSettings();   
        
        return this.SettingCollection;
    }

    public static GetConfigSettings(){
        this.getConfigSettings();
        
        return this.SettingCollection;
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