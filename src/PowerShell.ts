import { ILogger } from './logging';
import * as PowerShellRunner from 'powershell';

const enum MessageLevel {
    Start,
    End,
    Output,
    Error        
}

export class Powershell {
    
    private startTime: Date; 
    private endTime: Date;
    private path: string;
    modules: string[];
    settings: Object;
    observers: ILogger[];

    constructor(path: string) {
        this.path = path;
    }

    getArrayParameter(array: string[]) {
        let result = null;
        if(array){
            let parameterString = array.join("','");
            result = `'${parameterString}'`;
        }
        return result;
    }

    private getModuleString() {
        let modulestring = this.getArrayParameter(this.modules);
        if(modulestring) {
            return `-Modules ${modulestring}`
        }
    }

    private parseSetting(parameter: any) {
        if(Array.isArray(parameter))
            return "'" + parameter.join("','") + "'";
        if(typeof parameter === 'number')
            return parameter;
        if(parameter.startsWith("'")){
            return parameter;
        }
        return `'${parameter}'`; 
    }

    private getParameterString() {
        let result = "";
        if(this.settings) {
            let settingsarray = [];
            let keys = Object.keys(this.settings);
            for(let i = 0;i < keys.length; i++) {
                let currentKey = keys[i];
                let parameterString = this.parseSetting(this.settings[currentKey]);
                settingsarray.push(`-${currentKey} ${parameterString}`);
            }
            result = settingsarray.join(' ');
        }
        return result;
    }

    private getScriptString() {
        let result = "$ErrorActionPreference = 'Stop'\n";
        let moduleString = this.getModuleString();
        let settingsString = this.getParameterString();
        result += `$DebugPreference = 'Continue'\n`;
        result += this.path;
        if(moduleString)
            result += ` ${moduleString}`
        if(settingsString)
            result += ` ${settingsString}`
        return result;
    }

    public invoke() {
        let command = this.getScriptString();
        this.runPowershell(command);
    }

    private runPowershell(command: string) {
        let options = {
            debug: false,
            noprofile: true,
            executionpolicy: "Unrestricted"
        };
        this.startTime = new Date();
        let ps = new PowerShellRunner(command, options);

        this.LogStart(command);

        ps.proc.stderr.on('data', data => {
            this.LogError(data);
        });
        ps.proc.stdout.on('data', data => {
            this.LogOutput(data);
        });
        ps.proc.on("close", exitcode => {
            this.endTime = new Date();
            this.LogEnd(exitcode, this.endTime.valueOf() - this.startTime.valueOf());
        });
    }

    private FormatProcessOutput(data: string) {
        return data.split(/\n/);
    }

    private LogStart(command: string) {
        if(this.observers) {
            this.observers.forEach(observer => {
                observer.LogStart(command);
            });
        }
    }
    private LogEnd(exitcode: number, duration: number) {
        if(this.observers) {
            this.observers.forEach(observer => {
                observer.LogEnd(exitcode, duration);
            });
        }
    }
    private LogError(data: string) {
        if(this.observers) {
            let dataArray: string[] = this.FormatProcessOutput(data);
            this.observers.forEach(observer => {
                dataArray.forEach(line => {
                    observer.LogError(line);
                });
            });
        }
    }
    private LogOutput(data: string) {
        if(this.observers) {
            let dataArray: string[] = this.FormatProcessOutput(data); 
            this.observers.forEach(observer => {
                dataArray.forEach(line => {
                    observer.LogOutput(line);
                });
            });
        }
    }
}
