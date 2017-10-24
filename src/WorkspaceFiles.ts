//import {fs} from fs;
import {window, WorkspaceConfiguration, workspace,commands} from 'vscode';
import * as fs from 'fs';
import {StringFunctions} from './StringFunctions'
import {FileFunctions} from './FileFunctions'
import * as path from 'path'


export class WorkspaceFiles {
    static getAlFilesFromCurrentWorkspace(){
        if (workspace.rootPath === null){
            Error('No Workspace Root!')
        }
        
        return workspace.findFiles('**/*al*');        
    }

    static RenameAllFiles(){
        commands.executeCommand('vscode.SaveAll');

        this.getAlFilesFromCurrentWorkspace().then(Files => {
            Files.forEach(file => {
                this.RenameFile(file.fsPath);                      
            })
        });        
    }

    static RenameFile(fileName: string){
        let data = fs.readFileSync(fileName,null);
        
        let objectProperties = this.getFilePropertiesFromObjectText(data.toString());
        
        if (objectProperties.objectFileName != ''){
            if(path.join(path.dirname(fileName),objectProperties.objectFileName) == fileName){
                console.log('paths are the same.');
            } else {                
                fs.renameSync(fileName,path.join(path.dirname(fileName),objectProperties.objectFileName));
                console.log('renamed',fileName,'-->', path.join(path.dirname(fileName),objectProperties.objectFileName));
            }
        }
    }  
    
    static getFilePropertiesFromObjectText(ObjectText: string) : any{

        var patternObjectType = new RegExp('(codeunit |page |pagecustomization |pageextension |profile |query |report |requestpage |table |tableextension |xmlport )')
        let objectFileName, objectType, objectId, objectName, objectNameShort: string;

        let ObjectTypeArr = ObjectText.match(patternObjectType);
        if (! ObjectTypeArr){
            objectType = '';
            objectId = '';
            objectName = '';
            objectNameShort = '';
            objectFileName = '';    
        } else {
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
                    var patternObject = new RegExp('(\\w+)( +[0-9]+)( +"?[ a-zA-Z0-9]+"?) +extends( +"?[ a-zA-Z]+"?)');
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
                    Error('Not able to parse this file: ' + ObjectText);                  
                }                
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

    static ReorganizeAllFiles(){
        commands.executeCommand('vscode.SaveAll');
        
        this.getAlFilesFromCurrentWorkspace().then(Files => {
            Files.forEach(file => {
                this.ReorganizeFile(file.fsPath);                      
            })
        });
    }
    
    static ReorganizeFile(fileName: string){
        let data = fs.readFileSync(fileName,null);
        
        let objectProperties = this.getFilePropertiesFromObjectText(data.toString());
        
        if (objectProperties.objectFileName != ''){            
            if(path.join(workspace.rootPath,objectProperties.objectType,objectProperties.objectFileName) == fileName){
                console.log('paths are the same.');
            } else {  
                let objectFolder = path.join(workspace.rootPath,'Objects');
                let objectTypeFolder = path.join(objectFolder, objectProperties.objectType);
                let destinationFileName = path.join(objectTypeFolder,objectProperties.objectFileName);

                (! fs.existsSync(objectFolder)) ? fs.mkdirSync(objectFolder):'' ;
                (! fs.existsSync(objectTypeFolder)) ? fs.mkdirSync(objectTypeFolder):'' ;
                
                fs.renameSync(fileName,destinationFileName);
                
                console.log('renamed',fileName,'-->', destinationFileName);
            }
        }
    }


}





