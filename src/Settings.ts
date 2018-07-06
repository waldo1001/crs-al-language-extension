import * as vscode from 'vscode';
import { join } from 'path';

export class Settings {

    static readonly DefaultRunObjectType = 'DefaultRunObjectType';
    static readonly DefaultRunObjectId = 'DefaultRunObjectId';

    static readonly WebServer = 'WebServer';
    static readonly WebServerInstance = 'WebServerInstance';
    static readonly WebServerInstancePort = 'WebServerInstancePort';

    static readonly WinServer = 'WinServer';
    static readonly WinServerInstance = 'WinServerInstance';
    static readonly WinServerInstancePort = 'WinServerInstancePort';
    static readonly PublicWebBaseUrl = 'PublicWebBaseUrl';
    static readonly Tenant = 'Tenant';

    static readonly AppName = 'name';
    static readonly NstFolder = 'nstfolder';
    static readonly ManagementModule = 'managementmodule';
    static readonly ExtensionObjectNamePattern = 'ExtensionObjectNamePattern';
    static readonly FileNamePattern = 'FileNamePattern';
    static readonly FileNamePatternExtensions = 'FileNamePatternExtensions';
    static readonly FileNamePatternPageCustomizations = 'FileNamePatternPageCustomizations';
    static readonly OnSaveAlFileAction = 'OnSaveAlFileAction';
    static readonly ObjectNamePrefix = 'ObjectNamePrefix';
    static readonly ObjectNameSuffix = 'ObjectNameSuffix';
    static readonly RemovePrefixFromFilename = 'RemovePrefixFromFilename';
    static readonly RemoveSuffixFromFilename = 'RemoveSuffixFromFilename';
    static readonly DisableDefaultAlSnippets = 'DisableDefaultAlSnippets';
    static readonly DisableCRSSnippets = 'DisableCRSSnippets';

    static readonly AlSubFolderName = 'AlSubFolderName';

    private static config: vscode.WorkspaceConfiguration;
    private static launchconfig: vscode.WorkspaceConfiguration;

    private static SettingCollection = {};

    private static WORKSPACEKEY: string = 'CRS';

    private static readonly MANAGEMENTDLL = 'Microsoft.Dynamics.Nav.Management.dll';

    private static getSetting(key: string) {
        if (!this.config.has(key)) {
            return null;
        } else {
            return this.config.get(key);
        }
    }

    private static getConfigSettings(ResourceUri: vscode.Uri) {
        this.config = ResourceUri ?
            vscode.workspace.getConfiguration(this.WORKSPACEKEY, ResourceUri) :
            vscode.window.activeTextEditor ?
                vscode.workspace.getConfiguration(this.WORKSPACEKEY, vscode.window.activeTextEditor.document.uri) :
                vscode.workspace.getConfiguration(this.WORKSPACEKEY, null);

        this.SettingCollection[this.NstFolder] = this.getSetting(this.NstFolder);
        this.SettingCollection[this.ManagementModule] = this.joinPaths([this.SettingCollection[this.NstFolder], this.MANAGEMENTDLL]);
        this.SettingCollection[this.WebServerInstancePort] = this.getSetting(this.WebServerInstancePort);;
        this.SettingCollection[this.WinServer] = this.getSetting(this.WinServer);
        this.SettingCollection[this.WinServerInstance] = this.getSetting(this.WinServerInstance);
        this.SettingCollection[this.WinServerInstancePort] = this.getSetting(this.WinServerInstancePort);
        this.SettingCollection[this.ExtensionObjectNamePattern] = this.getSetting(this.ExtensionObjectNamePattern);
        this.SettingCollection[this.FileNamePattern] = this.getSetting(this.FileNamePattern);
        this.SettingCollection[this.FileNamePatternExtensions] = this.getSetting(this.FileNamePatternExtensions);
        this.SettingCollection[this.FileNamePatternPageCustomizations] = this.getSetting(this.FileNamePatternPageCustomizations);
        this.SettingCollection[this.ObjectNamePrefix] = this.getSetting(this.ObjectNamePrefix);
        this.SettingCollection[this.ObjectNameSuffix] = this.getSetting(this.ObjectNameSuffix);
        this.SettingCollection[this.RemovePrefixFromFilename] = this.getSetting(this.RemovePrefixFromFilename);
        this.SettingCollection[this.RemoveSuffixFromFilename] = this.getSetting(this.RemoveSuffixFromFilename);
        this.SettingCollection[this.OnSaveAlFileAction] = this.getSetting(this.OnSaveAlFileAction);
        this.SettingCollection[this.AlSubFolderName] = this.getSetting(this.AlSubFolderName);
        this.SettingCollection[this.DisableDefaultAlSnippets] = this.getSetting(this.DisableDefaultAlSnippets);
        this.SettingCollection[this.DisableCRSSnippets] = this.getSetting(this.DisableCRSSnippets);
        this.SettingCollection[this.PublicWebBaseUrl] = this.getSetting(this.PublicWebBaseUrl);
    }

    private static getAppSettings(ResourceUri: vscode.Uri) {
        let appSettings = ResourceUri ?
            require(join(vscode.workspace.getWorkspaceFolder(ResourceUri).uri.fsPath, "app.json")) :
            vscode.window.activeTextEditor ?
                require(join(vscode.workspace.getWorkspaceFolder(vscode.window.activeTextEditor.document.uri).uri.fsPath, "app.json")) :
                require(join(vscode.workspace.workspaceFolders[0].uri.fsPath, "app.json"));

        this.SettingCollection[this.AppName] = appSettings.name
    }

    private static getLaunchSettings(ResourceUri: vscode.Uri) {
        this.launchconfig = ResourceUri ?
            vscode.workspace.getConfiguration('launch', ResourceUri) :
            vscode.window.activeTextEditor ?
                vscode.workspace.getConfiguration('launch', vscode.window.activeTextEditor.document.uri) :
                vscode.workspace.getConfiguration('launch', vscode.workspace.workspaceFolders[0].uri);

        let currentLaunchConfig = this.launchconfig.configurations;
        this.SettingCollection[this.WebServer] = currentLaunchConfig[0].server;
        this.SettingCollection[this.WebServerInstance] = currentLaunchConfig[0].serverInstance;
        this.SettingCollection[this.Tenant] = currentLaunchConfig[0].tenant ? currentLaunchConfig[0].tenant : "default";
        this.SettingCollection[this.DefaultRunObjectType] = currentLaunchConfig[0].startupObjectType;
        this.SettingCollection[this.DefaultRunObjectId] = currentLaunchConfig[0].startupObjectId;
    }

    public static GetAllSettings(ResourceUri: vscode.Uri) {
        this.getConfigSettings(ResourceUri);
        this.getAppSettings(ResourceUri);
        this.getLaunchSettings(ResourceUri);

        return this.SettingCollection;
    }

    public static GetAppSettings(ResourceUri: vscode.Uri) {
        this.getAppSettings(ResourceUri);

        return this.SettingCollection;
    }

    public static GetLaunchSettings(ResourceUri: vscode.Uri) {
        this.getLaunchSettings(ResourceUri);

        return this.SettingCollection;
    }

    public static GetConfigSettings(ResourceUri: vscode.Uri) {
        this.getConfigSettings(ResourceUri);

        return this.SettingCollection;
    }

    public static UpdateSetting(key: string, newvalue: any) {
        this.config.update(key, newvalue);
    }

    private static joinPaths(paths: string[]) {
        for (let i = 0; i < paths.length; i++) {
            if (!paths[i] || paths[i] === "")
                return null;
        }
        return join.apply(null, paths);
    }
}