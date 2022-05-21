<img src="images/waldo.png" align="right" width="120" height="120"/>

[![version](https://img.shields.io/vscode-marketplace/v/waldo.crs-al-language-extension.svg?&label=vscode%20marketplace)](https://marketplace.visualstudio.com/items?itemName=waldo.crs-al-language-extension)
[![installs](https://img.shields.io/vscode-marketplace/d/waldo.crs-al-language-extension.svg)](https://marketplace.visualstudio.com/items?itemName=waldo.crs-al-language-extension)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/waldo.crs-al-language-extension)](https://marketplace.visualstudio.com/items?itemName=waldo.crs-al-language-extension&ssr=false#review-details)

# crs-al-language-extension

> A bunch of useful commands, settings and snippets to improve your life as an al developer for Microsoft Dynamics 365 Business Central (or "Microsoft Dynamics NAV").

You can support me here:

[![https://www.buymeacoffee.com/waldo](./images/buymeacoffeeSmall.png)](https://www.buymeacoffee.com/waldo)

## Features

These features are concluded at this moment:

### Install waldo's modules (Temporarily disabled):

Download all PowerShell modules of author "waldo" from the PowerShellGallery.  Basically resulting in:

* Cloud.Ready.Software.NAV
* Cloud.Ready.Software.SQL
* Cloud.Ready.Software.Windows
* Cloud.Ready.Software.PowerShell

### Visualize dependencies by generating a GraphViz .dot file

Command: `CRS: Create GraphViz Dependency Graph`

This command will read all app.json files in your workspace (so this function is really useful in a Multi-root workspace) and create a .dot dependency file from it.  To display this file graphically, I recommend to also install the extension [Graphviz Interactive Preview](https://marketplace.visualstudio.com/items?itemName=tintinweb.graphviz-interactive-preview).  If you have, this command will automatically open the preview after generating the graph.

This functionality  will take these settings into account:

* `CRS.DependencyGraph.IncludeTestApps`: Whether to include all dependencies to test apps in the Dependency Graph.
* `CRS.DependencyGraph.ExcludeAppNames`: List of apps you don't want in the dependency graph.
* `CRS.DependencyGraph.ExcludePublishers`: List of publishers you don't want in the dependency graph.
* `CRS.DependencyGraph.RemovePrefix`: Remove this prefix from the appname in the graph.  Remark: this has no influence on the 'Exluce AppNames' setting.

To generate a DGML (using the ALC.EXE):

* `CRS: Compile DGML`, which enables the new capabilities of the compiler to generate a DGML document that can be opened by a DGML reader (usually Visual Studio).

### Run Object

The idea is to be able to run an object straight from the development environment.  There are four functions in the Command Palette:

* `CRS: Run Object (Web Client)`
* `CRS: Run Object (Tablet Client)`
* `CRS: Run Object (Phone Client)`
* `CRS: Run Object (Windows Client)`
Depending on which client, you will be asked for object type and object id.  The functionality looks at the settings (launch.json and configuration settings).

Furthermore, there are ways to open certain object directly:

* `CRS: Run Current Object (Web Client)` (CTRL+SHIFT+r) - runs the object from the open file (the extension needs to be published first).  You can also run this command from the status bar ('Run In Web Client') and the context menu from the explorer.`
* `CRS: Publish and Run Current Object`
* `CRS: Run AL Test Tool in Web Client`
* `CRS: Run Event Subscribers Page in Web Client`
* `CRS: Run Database Locks Page in Web Client`

### Reorganize Files

The commands can rename your file, and move the file to the folder, corresponding to the object type. There are four functions in the Command Palette:

* CRS: Rename - Current File
* CRS: Rename - All Files
* CRS: Reorganize - Current File
* CRS: CRS: Reorganize - All Files
Note - "Reorganize" will move a test-codeunit to the test-folder

With the command `CRS: Configure Best-practice File Naming`, it will set up your user settings or workspace settings with some settings that are considered to be best practice.

### Search on Google / Microsoft Docs

Two commands have been added to search for any given search string on Google or Microsoft Docs.  The search string "Business Central" will automatically be added.

* CRS: Search Microsoft Docs
* CRS: Search Google

The selected word in the editor will be added by default as a search string.

![Search on Google / Microsoft Docs](images/SearchGoogleDocs.gif)

### Snippets

al Snippets:

* tpagewizard3stepswaldo
    * creates a wizard with 3 steps
    * includes placeholders
* ttableextensionwaldo
    * Quite the same as the default snippet, but with the comment to include an TargetTableId to be able to properly rename the file (which might need that ID).
* tpageextensionwaldo
    * Quite the same as the default snippet, but with the comment to include an TargetPageId to be able to properly rename the file (which might need that ID).
* tpagecustomizationwaldo
    * Quite the same as the default snippet, but with the comment to include an TargetPageId to be able to properly rename the file (which might need that ID).
* tvarwaldo
    * Some easier way to greate a variable
* tfieldgroup(s)waldo
    * To work with fieldgroups (Like "Brick" & "DropDown")
* tProcedureFromClipboard
    * to convert a piece of code into a function, just cut the code and use this snippet - pretty cool ;-).
* tTestHandler.. 
    * [multiple snippets](https://github.com/waldo1001/crs-al-language-extension/commit/e58b72dddda3007b982b31e85a3b9caa351adcd4) for easily adding handlers in test-codeunits

Apply some design patterns:
* tcodeunittcodeunitMethodWithoutUIwaldo
    * creates a codeunit, conform on the "Event Based Software Architecture"
    * no functions for UI
    * includes placeholders
* tcodeunitMethodWithUIwaldo
    * Same as above, but WITH the UI functions
* tmynotificationswaldo
    * apply "discover event subscriber" for adding a "My Notification"
* tassistedsetupwaldo
    * apply "discover event subscriber" for adding an assisted setup
* tserviceconnectionwaldo
    * apply "discover event subscriber" for adding a service connection 
* ttablesetup & tpagesetup
    * create setup-table with page


Snippets for building metadata (used in an xml-file):
* twebservice.. - 2 snippets
* tpermission.. - 3 snippets

This extension includes an (what I believe) improved version of all the al snippets that come default with the AL Language Extension from Microsoft.  It's possible to disable the default al snippets in the settings, and enable the snippets from this extension.  It's also possible to just enable both, or disable the CRS ones.  For this, check the "Extension Settings" section below.

## Requirements

if all is well, these dependencies will be installed automagically:

* PowerShell
* format-duration
* path
* time-stamp

## Extension Settings

This extension contributes the following settings:

* `CRS.nstfolder`: Folder of the NST
* `CRS.WebServerInstancePort`: Port number for the web client
* `CRS.WinServer`: Server where the windows client is connecting to
* `CRS.WinServerInstance`: Serverinstance where the windows client is connecting to
* `CRS.WinServerInstancePort`: Portnumber of the serverinstance where the windows client is connecting to
* `CRS.PublicWebBaseUrl`: Override Launch.json settings with this setting if necessary to run objects from VSCode
* `CRS.ExtensionObjectNamePattern`: The pattern for the object name. If set (it's not set by default), it will perform an automatic object name for extension objects
    - `<Prefix>`
    - `<Suffix>`
    - `<ObjectType>`
    - `<ObjectTypeShort>` - a short notation of the object type.
    - `<ObjectTypeShortPascalCase>` - PascalCased object type
    - `<ObjectTypeShortUpper>` - Same as "ObjectTypeShort" but uppercased
    - `<ObjectId>`
    - `<BaseName>` - weird chars are removed - does NOT include prefix nor suffix
    - `<BaseNameShort>` - does NOT include prefix nor suffix
    - `<BaseId>` - If you want this to work, you need to put the Id in comment after the base name (see below)
* `CRS.FileNamePattern`: The pattern of the filename for non-extension objects..  These vars can be used: 
    - `<Prefix>` - just the prefix separately
    - `<Suffix>` - just the suffix separately
    - `<ObjectType>`
    - `<ObjectTypeShort>` - a short notation of the object type.
    - `<ObjectTypeShortPascalCase>` - PascalCased object type
    - `<ObjectTypeShortUpper>` - Same as "ObjectTypeShort" but uppercased
    - `<ObjectId>`
    - `<ObjectName>` - weird chars are removed - includes prefix and suffix
    - `<ObjectNameShort>`
* `CRS.FileNamePatternExtensions`: The pattern of the filename for extension objects.  These vars can be used: 
    - `<Prefix>` - just the prefix separately
    - `<Suffix>` - just the suffix separately
    - `<ObjectType>`
    - `<ObjectTypeShort>` - a short notation of the object type.
    - `<ObjectTypeShortPascalCase>` - PascalCased object type
    - `<ObjectTypeShortUpper>` - Same as "ObjectTypeShort" but uppercased
    - `<ObjectId>`
    - `<ObjectName>` - weird chars are removed - includes prefix and suffix
    - `<ObjectNameShort>`    
    - `<BaseName>` - weird chars are removed - does NOT include prefix nor suffix
    - `<BaseNameShort>` - does NOT include prefix nor suffix
    - `<BaseId>` - If you want this to work, you need to put the Id in comment after the base name, like this example: 
```al
tableextension 50100 "Just Some Table Extension" extends Customer //18
{
    fields
    {
        // Add changes to table fields here
        field(50100;"Just Some field";Code[10]){
            TableRelation="Just Some Table"."No.";
        }
    }
    
}
```
* `CRS.FileNamePatternPageCustomizations`: The pattern of the filename for page customizations.  These vars can be used:
    - `<Prefix>` - just the prefix separately
    - `<Suffix>` - just the suffix separately
    - `<ObjectType>`
    - `<ObjectTypeShort>` - a short notation of the object type.
    - `<ObjectTypeShortPascalCase>` - PascalCased object type
    - `<ObjectTypeShortUpper>` - Same as "ObjectTypeShort" but uppercased
    - `<ObjectName>` - weird chars are removed - includes prefix and suffix
    - `<ObjectNameShort>` - includes prefix and suffix
    - `<BaseName>` - weird chars are removed - does NOT include prefix nor suffix
    - `<BaseNameShort>` - does NOT include prefix nor suffix
    - `<BaseId>` - same remarks as above!
* `CRS.ObjectNamePrefix`: When using the Reorganize/Rename-commands, this setting will make sure the object name (and filename) will have a Prefix.  
    - Tip 1: use as a workspace-setting.
    - Tip 2: use an ending-space if you want the prefix to be separated with a space.
* `CRS.ObjectNameSuffix`: When using the Reorganize/Rename-commands, this setting will make sure the object name (and filename) will have a Suffix.  
    - Tip 1: use as a workspace-setting.
    - Tip 2: use an start-space if you want the suffix to be separated with a space.
* `CRS.RemovePrefixFromFilename`: When using the Reorganize/Rename-commands, this setting will remove any prefix from the filename (but keep it in object name).  Tip: use as a workspace-setting
* `CRS.RemoveSuffixFromFilename`: When using the Reorganize/Rename-commands, this setting will remove any suffix from the filename (but keep it in object name).  Tip: use as a workspace-setting
* `CRS.RemoveUnderscoreFromFilename`: When using the Reorganize/Rename-commands, this setting will remove any underscore from the filename (but keep it in object name).  Tip: use as a workspace-setting
* `CRS.AlSubFolderName`: Variable subfoldername.  "None" means you want to disable the command to move files to a subfolder.  
* `CRS.OnSaveAlFileAction`: Automatically will Rename/Reorganize the file you are editing.  Takes into account the prefix/suffix as well.
* `DisableDefaultAlSnippets`: Disables the default snippets that come with the Microsoft.al-language extension.  When you change the setting, you need to restart VSCode twice.  Once for disabling the snippets on activation (at that time, the snippets are still loaded).  And the second time to actually not load the snippets anymore.
* `DisableWaldoSnippets`: Disables the CRS snippets that come with this extension.  When you change the setting, you need to restart VSCode twice.  Once for disabling the snippets on activation (at that time, the snippets are still loaded).  And the second time to actually not load the snippets anymore.
* `SkipWarningMessageOnRenameAll`: Skips the Warning when renaming all files which can disturb custom VS tasks.
* `RenameWithGit`: Use 'git mv' to rename a file.  This keeps history of the file, but stages the rename, which you should commit separately.  **The feature is still in preview-mode, therefore the default value is 'false'**

## Skip String manipulation

You can skip string manipulation by adding comments to your code:

```AL
  //crs-al disable
  ...
  //crs-al enable
```

## Known Issues

I try to keep a list with issues here: https://github.com/CloudReadySoftware/crs-al-language-extension/issues

## License

Copyright (c) Eric Wauters (waldo). All rights reserved.

Licensed under the [MIT](LICENSE.md) license.
