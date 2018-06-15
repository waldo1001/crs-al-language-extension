import { Powershell } from './PowerShell'
import * as PSScripts from './PSScripts'
import { ConsoleLogger, OutputLogger } from './logging';
import { QuickPickItem } from 'vscode';
import { Settings } from './Settings';

const open = require('opn');

let observers = [
    ConsoleLogger.getInstance(),
    OutputLogger.getInstance()
];

export class DynamicsNAV {
    static GetAllObjectTypesAsQuickPickItem(): QuickPickItem[] {
        let items: QuickPickItem[] = [];

        items.push({ label: 'Table', description: 'Table' });
        items.push({ label: 'Page', description: 'Page' });
        items.push({ label: 'Report', description: 'Report' });
        items.push({ label: 'Codeunit', description: 'Codeunit' });
        items.push({ label: 'Query', description: 'Query' });
        items.push({ label: 'XMLPort', description: 'XMLPort' });
        items.push({ label: 'MenuSuite', description: 'MenuSuite' });

        return items
    }
    static GetAllObjectTypes(): String[] {
        let items: String[] = [];

        items.push('Table');
        items.push('Page');
        items.push('Report');
        items.push('Codeunit');
        items.push('Query');
        items.push('XMLPort');
        items.push('MenuSuite');

        return items
    }

    static GetRunRTCObjectTypesAsQuickPickItem(): QuickPickItem[] {
        let items: QuickPickItem[] = [];

        items.push({ label: 'Table', description: 'Table' })
        items.push({ label: 'Page', description: 'Page' })
        items.push({ label: 'Report', description: 'Report' })
        items.push({ label: 'Codeunit', description: 'Codeunit' })
        items.push({ label: 'Query', description: 'Query' })
        items.push({ label: 'XMLPort', description: 'XMLPort' })

        return items
    }

    static GetRunRTCObjectTypes(): String[] {
        let items: String[] = [];

        items.push('Table');
        items.push('Page');
        items.push('Report');
        items.push('Codeunit');
        items.push('Query');
        items.push('XMLPort');

        return items
    }

    static GetRunWebObjectTypesAsQuickPickItem(): QuickPickItem[] {
        let items: QuickPickItem[] = [];

        items.push({ label: 'Page', description: 'Page' })
        items.push({ label: 'Report', description: 'Report' })
        items.push({ label: 'Table', description: 'Table' })

        return items
    }

    static GetRunWebObjectTypes(): String[] {
        let items: String[] = [];

        items.push('Page');
        items.push('Report');
        items.push('Table');

        return items
    }

    static RunObjectInWebClient(objecttype: any, objectid: any, clienttype: string) {
        let workspacesettings = Settings.GetAllSettings(null);

        if (clienttype != 'WebClient') {
            clienttype = clienttype + '.aspx'
        }

        let objectType = (!objecttype.label) ? objecttype : objecttype.label
        let runURL = this.ComposeRunObjectInWebClientURL(
            workspacesettings,
            clienttype,
            objectType.toString(),
            objectid);

        console.log('url: ' + runURL);
        open(runURL);
    }
    public static ComposeRunObjectInWebClientURL(workspacesettings: any, ClientType: string, runObjectType: String, runObjectid: number): String {

        let returnUrl = "https://businesscentral.dynamics.com/sandbox?"

        if (workspacesettings[Settings.WebServer]) {
            if (workspacesettings[Settings.PublicWebBaseUrl]) {
                returnUrl = workspacesettings[Settings.PublicWebBaseUrl]
            } else {
                returnUrl = workspacesettings[Settings.WebServer];
                if (workspacesettings[Settings.WebServerInstancePort] != "") {
                    returnUrl += ':' + workspacesettings[Settings.WebServerInstancePort]
                }
                returnUrl += '/' + workspacesettings[Settings.WebServerInstance];
            }
            returnUrl += '/' + ClientType

            if (workspacesettings[Settings.Tenant] != '') {
                returnUrl += '?tenant=' + workspacesettings[Settings.Tenant] + '&';
            } else {
                returnUrl += '?'
            }
        }

        returnUrl += runObjectType + '=' + runObjectid;

        return returnUrl;
    }


    static RunObjectInWindowsClient(objecttype: QuickPickItem, objectid: any) {
        let workspacesettings = Settings.GetAllSettings(null);

        let runURL = this.ComposeRunObjectInWindowsClientURL(workspacesettings[Settings.WinServer],
            workspacesettings[Settings.WinServerInstancePort],
            workspacesettings[Settings.WinServerInstance],
            workspacesettings[Settings.Tenant],
            objecttype.label,
            objectid);

        console.log('url: ' + runURL);
        open(runURL);
    }

    private static ComposeRunObjectInWindowsClientURL(server: String, Port: string, NAVInstance: string, Tenant: string, runObjectType: String, runObjectid: number): String {
        return "DynamicsNAV://" + server + ':' + Port + '/' + NAVInstance + '//Run' + runObjectType + '?' + runObjectType + '=' + runObjectid + '&tenant=' + Tenant

    }

    static getBestPracticeAbbreviatedObjectType(ObjectType: String): string {
        //https://docs.microsoft.com/da-dk/dynamics-nav/compliance/apptest-bestpracticesforalcode
        switch (ObjectType.trim().toLowerCase()) {
            case 'page': return 'Pag';
            case 'pageextension': return 'Pag';
            case 'codeunit': return 'Cod';
            case 'table': return 'Tab';
            case 'tableextension': return 'Tab';
            case 'xmlport': return 'Xml';
            case 'report': return 'Rep';
            case 'query': return 'Que';
            case 'profile': return 'Prof';
            case 'pagecustomization': return 'Pag';
        }
    }
}