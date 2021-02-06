import * as vscode from 'vscode';

export function configureBestPracticesNaming() {
    const items: vscode.QuickPickItem[] = [];
    const uriMap: any[] = [];

    function addPick(label: string, description: string, uri: any) {
        uriMap.push(uri);
        items.push({ label, description });
    }

    addPick('User', 'User configuration (applies to all workspaces)', vscode.ConfigurationTarget.Global);
    if (vscode.workspace.name) {
        let file = vscode.workspace['workspaceFile'];
        if (file) {
            addPick(vscode.workspace.name, file.path, vscode.ConfigurationTarget.Workspace);
            for (let folder of vscode.workspace.workspaceFolders) {
                addPick(folder.name, `${folder.uri.path}/.vscode/settings.json`, folder.uri);
            }
        } else {
            addPick('Workspace', `${vscode.workspace.workspaceFolders[0].uri.path}/.vscode/settings.json`, vscode.ConfigurationTarget.WorkspaceFolder);
        }
    }

    vscode.window.showQuickPick(items, { placeHolder: 'Where would you like to configure the best-practice naming configuration?' })
        .then(choice => {
            if (!choice) {
                return;
            }

            let index = items.indexOf(choice);
            let uri = uriMap[index];
            let updateTarget = index === 0 || undefined; // undefined is necessary here! Leaving it at false would always update Workspace.
            let config = vscode.workspace.getConfiguration('CRS', uri);
            config.update('FileNamePattern', '<ObjectNameShort>.<ObjectTypeShortPascalCase>.al', updateTarget);
            config.update('FileNamePatternExtensions', '<ObjectNameShort>.<ObjectTypeShortPascalCase>.al', updateTarget);
            config.update('FileNamePatternPageCustomizations', '<ObjectNameShort>.<ObjectTypeShortPascalCase>.al', updateTarget);
        });
}