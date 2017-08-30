import {Powershell} from './PowerShell'
import * as PSScripts from './PSScripts'
import { ConsoleLogger, OutputLogger } from './logging';
import {QuickPickItem} from 'vscode'

let observers = [
    ConsoleLogger.getInstance(), 
    OutputLogger.getInstance()
    ];

export class DynamicsNAV {
    static GetAllObjectTypesAsQuickPickItem() : QuickPickItem[] {
        let items: QuickPickItem[] = [];
        
        items.push({label:'Table',description: 'Table'});
        items.push({label:'Page',description: 'Page'});     
        items.push({label:'Report',description: 'Report'});
        items.push({label:'Codeunit',description: 'Codeunit'});
        items.push({label:'Query',description: 'Query'});
        items.push({label:'XMLPort',description: 'XMLPort'});
        items.push({label:'MenuSuite',description: 'MenuSuite'});
                                                
        return items
    }
    static GetAllObjectTypes() : String[] {
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

    static GetRunRTCObjectTypesAsQuickPickItem() : QuickPickItem[] {
        let items: QuickPickItem[] = [];
        
        items.push({label:'Table',description: 'Table'})
        items.push({label:'Page',description: 'Page'})        
        items.push({label:'Report',description: 'Report'})
        items.push({label:'Codeunit',description: 'Codeunit'})
        items.push({label:'Query',description: 'Query'})
        items.push({label:'XMLPort',description: 'XMLPort'})
                                                
        return items
    }

    static GetRunRTCObjectTypes() : String[] {
        let items: String[] = [];
        
        items.push('Table');
        items.push('Page');
        items.push('Report');
        items.push('Codeunit');
        items.push('Query');
        items.push('XMLPort');
                                                
        return items
    }

    static GetRunWebObjectTypesAsQuickPickItem() : QuickPickItem[] {
        let items: QuickPickItem[] = [];
        
        items.push({label:'Page',description: 'Page'})        
        items.push({label:'Report',description: 'Report'})

        return items
    }

    static GetRunWebObjectTypes() : String[] {
        let items: String[] = [];

        items.push('Page');
        items.push('Report');

        return items
    }

    static RunWeb(objecttype: QuickPickItem, objectid: any){
        let ps = new Powershell(PSScripts.RUNOBJECTWEB);
        
        ps.observers = observers;

        ps.settings = {
            ObjectType: objecttype.label,
            ObjectID: objectid,
            WebServerInstance: 'NAV'
        };

        console.log(PSScripts.RUNOBJECTWEB + ' ' + objecttype + ' ' + objectid)

        ps.invoke();
               
    }

    static RunWindows(objecttype: String, objectid: any){
        
    }
}