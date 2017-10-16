//import {fs} from fs;
import {window, WorkspaceConfiguration, workspace,commands} from 'vscode';
import * as fs from 'fs';
import {StringFunctions} from './StringFunctions'

export class WorkspaceFiles {
    static getAlFilesFromCurrentWorkspace(){
        if (workspace.rootPath === null){
            Error('No Workspace Root!')
        }
        
        return workspace.findFiles('**/*al*');        
    }

    static RenameAllFiles(){
        //save all
        commands.executeCommand('');

        this.getAlFilesFromCurrentWorkspace().then(Files => {
            Files.forEach(file => {
                this.RenameCurrentFile(file);                      
            })
        });        
    }

    static RenameCurrentFile(file: any){
        console.log('Start RenameCurrentFile: ' + file.fsPath);

        let data = fs.readFileSync(file.fsPath,null);
        
        let objectProperties = this.getFilePropertiesFromObjectText(data.toString());

        console.log(objectProperties);
        
        console.log('Stop RenameCurrentFile: ' + file.fsPath);
    }  
    
    static getFilePropertiesFromObjectText(ObjectText: string) : any{

        var patternObjectType = new RegExp('(codeunit |page |pagecustomization |pageextension |profile |query |report |requestpage |table |tableextension |xmlport )')
        let objectFileName, objectType, objectId, objectName, objectNameShort: string;

        let ObjectTypeArr = ObjectText.match(patternObjectType);
        if (! ObjectTypeArr){
            return '';
        }
        switch (ObjectTypeArr[0].trim().toLowerCase()) {
            case 'page':
            case 'codeunit':
            case 'query':
            case 'report':
            case 'requestpage':
            case 'table':
            case 'xmlport':{
                var patternObject = new RegExp('(\\w+)( +[0-9]+)( +"?[ a-zA-Z]+"?)');
                let currObject = ObjectText.match(patternObject);
                
                objectType = currObject[1].trim().toString();
                objectId = currObject[2].trim().toString();
                objectName = currObject[3].trim().toString();
                objectNameShort =  StringFunctions.replaceAll(StringFunctions.replaceAll(currObject[3].trim(),'"',''),' ','')

                objectFileName = objectType + ' ' 
                                    + objectId + ' ' 
                                        + objectNameShort
                                            + '.al';       
                break;           
            }
            case 'pageextension':
            case 'tableextension':{
                var patternObject = new RegExp('(\\w+)( +[0-9]+)( +"?[ a-zA-Z]+"?) +extends( +"?[ a-zA-Z]+"?)');
                let currObject = ObjectText.match(patternObject);
                
                objectType = currObject[1].trim().toString();
                objectId = currObject[2].trim().toString();     
                objectName = currObject[3].trim().toString();
                objectNameShort =  StringFunctions.replaceAll(StringFunctions.replaceAll(currObject[3].trim(),'"',''),' ','')
                
                objectFileName =  currObject[1].substring(0,currObject[1].length - 'ension'.length).trim() + ' ' 
                                    + objectId + ' ' 
                                        + objectNameShort
                                            + '.al';       
                break;           
            } 

            case 'profile' :{
                var patternObject = new RegExp('(profile)( +"?[ a-zA-Z]+"?)');
                let currObject = ObjectText.match(patternObject);

                objectType = currObject[1].trim().toString();
                objectId = '';
                objectName = currObject[2].trim().toString();
                objectNameShort =  StringFunctions.replaceAll(StringFunctions.replaceAll(currObject[2].trim(),'"',''),' ','')
                
                objectFileName =  objectType + ' ' 
                                    + objectNameShort
                                        + '.al';       
                break;           
            }
            case 'pagecustomization':{
                var patternObject = new RegExp('(\\w+)( +"?[ a-zA-Z]+"?) +customizes( +"?[ a-zA-Z]+"?)');
                let currObject = ObjectText.match(patternObject);
                
                objectType = currObject[1].trim().toString();
                objectId = '';
                objectName = currObject[2].trim().toString();
                objectNameShort =  StringFunctions.replaceAll(StringFunctions.replaceAll(currObject[2].trim(),'"',''),' ','')
                                
                objectFileName =  currObject[1].substring(0,currObject[1].length - 'omization'.length).trim() + ' ' 
                                    + objectNameShort
                                        + '.al';       
                break;           
            }
            default: {                
                objectType = '';
                objectId = '';
                objectName = '';
                objectNameShort = '';
                objectFileName = '';           
                break;                  
            }                
        }

        return {
            objectType: objectType,
            objectId: objectId,
            objectName: objectName,
            objectNameShort: objectNameShort,
            objectFileName: objectFileName
        }
    }
}





