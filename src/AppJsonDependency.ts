
export class AppJsonDependency {

    _appJsonDependency: any;

    constructor(appJsonDependency: any) {
        if (appJsonDependency) {
            this._appJsonDependency = appJsonDependency;
        } else {
            this._appJsonDependency = new Object();
        }
    }

    get name(): string {
        return this._appJsonDependency.name;
    }
    set name(value: string) {
        this._appJsonDependency.name = value;
    }

    get publisher(): string {

        return this._appJsonDependency.publisher;
    }

    set publisher(value: string) {
        this._appJsonDependency.publisher = value;
    }

    get id(): string {
        if (this._appJsonDependency.id) {
            return this._appJsonDependency.id;
        } else {
            return this._appJsonDependency.appId;
        }
    }

    set id(value: string) {
        this._appJsonDependency.id = value;
    }

    get version(): string {
        return this._appJsonDependency.version;
    }

    set version(value: string) {
        this._appJsonDependency.version = value;
    }



    get isTestApp(): boolean {
        //TODO:
        if ((this.isMicrosoft) && (this.name.toLocaleLowerCase().includes('test'))) {
            return true;
        }

        return (this.name.toLocaleLowerCase().endsWith('test'));
    }

    get isMicrosoft(): boolean {
        if (this._appJsonDependency.publisher == '') { return false }
        return (this._appJsonDependency.publisher.toLowerCase() == 'microsoft');
    }

    get TestFields(): boolean {
        if (this.name == '') { return false };
        if (this.publisher == '') { return false };

        return true;
    }


}


