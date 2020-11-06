import * as crsOutput from './CRSOutput';
import { AppJson } from './AppJson';
import { Settings } from './Settings';
import { AppJsonDependency } from './AppJsonDependency';
import * as vscode from 'vscode';
import { exit } from 'process';

export class ALGraphVis {

    private _workSpaceSettings: Settings;
    private _graphVizText: string[];

    constructor();
    constructor() {
        this._graphVizText = [];
        this._workSpaceSettings = Settings.GetConfigSettings(null);
    }

    // addDependency(dependency: any);
    addDependency(app: AppJson, dependency: AppJsonDependency) {
        if (this._workSpaceSettings[Settings.DependencyGraphExcludePublishers].includes(dependency.publisher)) { return };
        if (this._workSpaceSettings[Settings.DependencyGraphExcludePublishers].includes(app.publisher)) { return };

        if (this._workSpaceSettings[Settings.DependencyGraphExcludeAppNames].includes(dependency.name)) { return };
        if (this._workSpaceSettings[Settings.DependencyGraphExcludeAppNames].includes(app.name)) { return };

        if (!dependency.TestFields) { return }; // check for empty fields

        if ((!this._workSpaceSettings[Settings.DependencyGraphIncludeTestApps]) && dependency.isTestApp) { return };
        if ((!this._workSpaceSettings[Settings.DependencyGraphIncludeTestApps]) && app.isTestApp) { return };

        let removePrefix = this._workSpaceSettings[Settings.DependencyGraphRemovePrefix];
        let appName = app.name.startsWith(removePrefix) ? app.name.substr(removePrefix.length) : app.name;
        let dependencyName = dependency.name.startsWith(removePrefix) ? dependency.name.substr(removePrefix.length) : dependency.name;        

        let dependencyTxt = `"${appName}" -> "${dependencyName}"`
        crsOutput.showOutput(dependencyTxt, false);
        this._graphVizText.push(dependencyTxt);

    }

    get graphVizText(): string[] {
        return this._graphVizText
    }

    get dotContent(): string {
        let result = `digraph G {\n`

        this._graphVizText.forEach(line => {
            result += line + '\n';
        })

        result += '}'

        return result
    }
}
