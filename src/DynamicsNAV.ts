import { QuickPickItem } from 'vscode';
import { Settings } from './Settings';
import * as crsOutput from './CRSOutput';
import { exec, spawn } from 'child_process';
import * as vscode from 'vscode';
import { settings } from 'cluster';

const open = require('open');

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
        items.push({ label: 'Interface', description: 'Interface' });
        items.push({ label: 'PermissionSet', description: 'PermissionSet' });

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
        items.push('Interface');
        items.push('PermissionSet');

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
        items.push({ label: 'Query', description: 'Query' })
        items.push({ label: 'Report', description: 'Report' })
        items.push({ label: 'Table', description: 'Table' })

        return items
    }

    static GetRunWebObjectTypes(): String[] {
        let items: String[] = [];

        items.push('Page');
        items.push('Query');
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

        switch (workspacesettings[Settings.Browser]) {
            case 'Edge':
            case 'EdgeBeta':
                open(`microsoft-edge:${runURL}`)
                break;
            case 'Firefox':
                runURL = workspacesettings[Settings.Incognito] == true ? '-private-window ' + runURL : runURL;
                exec(`start firefox "${runURL}"`, { shell: 'cmd.exe' });
                break;
            case 'Chrome':
                runURL = workspacesettings[Settings.Incognito] == true ? '-incognito ' + runURL : runURL;
                exec(`start chrome "${runURL}"`, { shell: 'cmd.exe' });
                vscode.window.showWarningMessage('Running an object in Chrome might not work.  Use Edge instead (you can set al.Browser setting to Edge (in User Settings)).')
                break;
            default:
                crsOutput.showOutput("If you're using Chrome, the 'run object' command might not work.  Use Edge instead (you can set al.Browser setting to Edge (in User Settings)).", true)
                open(runURL);
                break;
        }


        crsOutput.showOutput(`RunObjectInWebClient - ${runURL}`);
    }
    public static ComposeRunObjectInWebClientURL(workspacesettings: any, ClientType: string, runObjectType: String, runObjectid: number): String {

        let returnUrl = "https://businesscentral.dynamics.com/"
        returnUrl += workspacesettings[Settings.SandboxName] ? workspacesettings[Settings.SandboxName] : 'sandbox'
        returnUrl += '?'

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
            case 'reportextension': return 'Rep';
            case 'xmlport': return 'Xml';
            case 'report': return 'Rep';
            case 'query': return 'Que';
            case 'profile': return 'Prof';
            case 'pagecustomization': return 'Pag';
            case 'enum': return 'Enum';
            case 'enumextension': return 'Enum';
            case 'controladdin': return 'ControlAddIn';
            case 'interface': return 'Iface';
            case 'requestpage': return 'RequestPage';
            case 'dotnet': return 'Dotnet';
            case 'permissionset': return 'PermissionSet';
            case 'permissionsetextension': return 'PermissionSetExt';
        }
    }

    static getBestPracticeObjectTypeInPascalCase(ObjectType: String): string {
        switch (ObjectType.trim().toLowerCase()) {
            case 'page': return 'Page';
            case 'pageextension': return 'PageExt';
            case 'codeunit': return 'Codeunit';
            case 'table': return 'Table';
            case 'tableextension': return 'TableExt';
            case 'reportextension': return 'ReportExt';
            case 'xmlport': return 'XmlPort';
            case 'report': return 'Report';
            case 'query': return 'Query';
            case 'profile': return 'Profile';
            case 'pagecustomization': return 'PageCust';
            case 'enum': return 'Enum';
            case 'enumextension': return 'EnumExt';
            case 'controladdin': return 'ControlAddin';
            case 'interface': return 'Interface';
            case 'permissionset': return 'PermissionSet';
            case 'permissionsetextension': return 'PermissionSetExt';
        }
    }

    static SearchObjectNames(SearchString: String) {
        let workspacesettings = Settings.GetConfigSettings(null);

        SearchString = workspacesettings[Settings.SearchObjectNamesRegexPattern] + SearchString;

        vscode.commands.executeCommand('workbench.action.findInFiles', {
            query: SearchString,
            triggerSearch: true,
            matchWholeWord: false,
            isCaseSensitive: false,
        });

        crsOutput.showOutput('SearchObjectNames: ' + SearchString)
    }

    static isKeyWord(value: String): boolean {
        return DynamicsNAV.getAllKeywordsLowerCased().indexOf(value.toLowerCase()) != -1
    }

    static getAllKeywordsLowerCased(): String[] {
        var lowerCasedNames = this.getAllKeywords().map(value => {
            return value.toLowerCase();
        })
        return lowerCasedNames;
    }

    static getAllKeywords(): String[] {
        //Source: AL Variable Helper Source Code (Thank you Rasmus ;-))
        let keywords: String[] = [
            "Confirm",
            "Count",
            "TestField",
            "BigText",
            "DateTime",
            "Validate",
            "Blob",
            "Codeunit",
            "DateFormula",
            "Dialog",
            "FieldRef",
            "File",
            "Guid",
            "InStream",
            "OutStream",
            "KeyRef",
            "Page",
            "Record",
            "RecordId",
            "RecordRef",
            "Report",
            "System",
            "TableFilter",
            "BigInteger",
            "Binary",
            "Boolean",
            "Char",
            "Code",
            "Date",
            "DateTime",
            "Decimal",
            "Duration",
            "Integer",
            "Option",
            "Text",
            "Time",
            "Variant",
            "and",
            "AssertError",
            "begin",
            "case",
            "div",
            "do",
            "downto",
            "else",
            "end",
            "exit",
            "for",
            "if",
            "in",
            "mod",
            "not",
            "of",
            "or",
            "repeat",
            "then",
            "to",
            "until",
            "while",
            "with",
            "with",
            "var",
            "procedure",
            "temporary",
            "true",
            "false",
            "XmlPort",
            "TextConst",
            "Error",
            "Message",
            "CalcFields",
            "CalcSums",
            "SetRange",
            "SetFilter",
            "Format",
            "RunModal",
            "Run",
            "Action",
            "SetTableView",
            "where",
            "field",
            "SetRecord",
            "GetRecord",
            "LookupMode",
            "const",
            "filter",
            "LowerCase",
            "StrSubstNo",
            "TextEncoding",
            "Enum",
            "Label",
            "StrLen",
            "ConvertStr",
            "CopyStr",
            "sorting",
            "Next",
            "Evaluate",
            "SelectStr",
            "Editable",
            "FieldError",
            "Round",
            "Commit",
            "GuiAllowed",
            "FindSet",
            "FindFirst",
            "FindLast",
            "Find",
            "IsEmpty",
            "Reset",
            "DeleteAll",
            "Clear",
            "UserId",
            "Update",
            "Insert",
            "HasValue",
            "Delete",
            "Init",
            "Get",
            "Count",
            "Skip",
            "GetFilters",
            "UseRequestPage",
            "Preview",
            "TableCaption",
            "codeunit",
            "record",
            "page",
            "pagecustomization",
            "pageextension",
            "reportextension",
            "permissionset",
            "entitlement",
            "permissionsetextension",
            "extends",
            "tableextension",
            "table",
            "xmlport",
            "query",
            "report",
            "FieldCaption",
            "grid",
            "profile",
            "Key",
            "Area",
            "Actions",
            "Trigger",
            "Interface",
            "Event"
        ];

        return keywords;
    }
}