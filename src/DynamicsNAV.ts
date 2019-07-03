import { QuickPickItem } from 'vscode';
import { Settings } from './Settings';
import * as crsOutput from './CRSOutput';

const open = require('opn');

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
        crsOutput.showOutput(`RunObjectInWebClient - ${runURL}`);
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
            case 'enum': return 'Enum';
            case 'enumextension': return 'Enum';
        }
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
            "extends",
            "tableextension",
            "table",
            "xmlport",
            "query",
            "report",
            "FieldCaption",
            "grid",
            "profile"
        ];

        return keywords;
    }
}