import * as vscode from 'vscode';
import { AppJsonDependency } from './AppJsonDependency';

export class AppJson {

    _appJson: any;
    _appJsonDependencies: AppJsonDependency[];

    constructor(appJson: vscode.Uri) {
        this._appJson = require(appJson.fsPath);
        this._appJsonDependencies = [];

        if (this._appJson.dependencies) {
            this._appJson.dependencies.forEach(dependency => {
                let _dep = new AppJsonDependency(dependency);
                this._appJsonDependencies.push(_dep);
            });
        }

        if (this._appJson.application) {
            let _dep = new AppJsonDependency(null);
            _dep.id = 'NoGuidAvailable';
            _dep.name = 'Microsoft BaseApp';
            _dep.publisher = 'Microsoft';
            _dep.version = this._appJson.application;

            this._appJsonDependencies.push(_dep);
        }
        if (this._appJson.platform) {
            let _dep = new AppJsonDependency(null);
            _dep.id = 'NoGuidAvailable';
            _dep.name = 'Microsoft System';
            _dep.publisher = 'Microsoft';
            _dep.version = this._appJson.platform;

            this._appJsonDependencies.push(_dep);
        }

    }

    get dependencies(): AppJsonDependency[] {
        return this._appJsonDependencies;
    }

    get name(): string {
        return this._appJson.name;
    }

    get application(): string {
        return this._appJson.application;
    }

    get platform(): string {
        return this._appJson.platform;
    }

    get publisher(): string {

        return this._appJson.publisher;
    }
    get isTestApp(): boolean {
        //TODO:
        if ((this.isMicrosoft) && (this.name.toLocaleLowerCase().includes('test'))) {
            return true;
        }

        return (this.name.toLocaleLowerCase().endsWith('test'));
    }

    get isMicrosoft(): boolean {
        return (this.publisher.toLowerCase() == 'microsoft');
    }



}


