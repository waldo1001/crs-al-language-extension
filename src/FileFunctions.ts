import * as fs from 'fs';
import {StringFunctions} from './StringFunctions'

export class FileFunctions {
    static getDirectory(fullPath: string) : string {
        return fullPath.substring(0,fullPath.lastIndexOf("\\")+1);        
    }

    static getFileName(fullPath: string) : string {
        return fullPath.substr(this.getDirectory(fullPath).length);
    }    
}