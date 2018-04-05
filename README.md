# crs-al-language-extension README
This extension is going to have a lot of useful functions to enhance the way to work al (originally Microsoft Dynamics NAV).

## Features
These features are concluded at this moment:

### Install waldo's modules: 
Download all PowerShell modules of author "waldo" from the PowerShellGallery.  Basically resulting in:
* Cloud.Ready.Software.NAV
* Cloud.Ready.Software.SQL
* Cloud.Ready.Software.Windows
* Cloud.Ready.Software.PowerShell

### Run Object
The idea is to be able to run an object straight from the development environment.  There are four functions in the Command Palette:
* CRS: Run Object (Web Client)
* CRS: Run Object (Tablet Client)
* CRS: Run Object (Phone Client)
* CRS: Run Object (Windows Client)
Depending on which client, you will be asked for object type and object id.  The functionality looks at the settings (launch.json and configuration settings).

### Reorganize Files
The commands can rename your file, and move the file to the folder, corresponding to the object type. There are four functions in the Command Palette:
* CRS: Rename - Current File
* CRS: Rename - All Files
* CRS: Reorganize - Current File
* CRS: CRS: Reorganize - All Files

### Snippets
al Snippets:
* tpagewizard (CRS: 3 steps)
    * creates a wizard with 3 steps
    * includes placeholders
* tcodeunit (CRS: Method - No UI)
    * creates a codeunit, conform on the "Event Based Software Architecture"
    * no functions for UI
    * includes placeholders
* ttableextension (CRS)
    * Quite the same as the default snippet, but with the comment to include an TargetTableId to be able to properly rename the file (which might need that ID).
* tpageextension (CRS)
    * Quite the same as the default snippet, but with the comment to include an TargetPageId to be able to properly rename the file (which might need that ID).
* tpagecustomization (CRS)
    * Quite the same as the default snippet, but with the comment to include an TargetPageId to be able to properly rename the file (which might need that ID).

Snippets for building metadata (used in an xml-file):
* twebservice.. - 2 snippets
* tpermission.. - 3 snippets

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
* `CRS.WinServerInstancePort`:Portnumber of the serverinstance where the windows client is connecting to
* `CRS.FileNamePattern`: The pattern of the filename for non-extension objects..  These vars can be used: 
    - \<ObjectType\>
    - \<ObjectTypeShort\> - a short notation of the object type.
    - \<ObjectId\>
    - \<ObjectName\> - might result into errors when you have "weird" chars in your name
    - \<ObjectNameShort\>
* `CRS.FileNamePatternExtensions`: The pattern of the filename for extension objects.  These vars can be used: 
    - \<ObjectType\>
    - \<ObjectTypeShort\> - a short notation of the object type.
    - \<ObjectId\>
    - \<ObjectName\> - might result into errors when you have "weird" chars in your name
    - \<ObjectNameShort\>
    - \<BaseName\>
    - \<BaseId\> - If you want this to work, you need to put the Id in comment after the base name, like this example: 
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
    - \<ObjectType\>
    - \<ObjectTypeShort\> - a short notation of the object type.
    - \<ObjectName\> - might result into errors when you have "weird" chars in your name
    - \<ObjectNameShort\>
    - \<BaseName\>
    - \<BaseId\> - same remarks as above!
* `CRS.AlSubFolderName`: Variable subfoldername.  "None" means you want to disable the command to move files to a subfolder.  Two choices: "Objects" and "Al".

## Known Issues
The extension doesn't work well with multi-folder workspaces.  The issue was mentioned [here](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/7).  Working on it!

Please report issues hier: https://github.com/CloudReadySoftware/crs-al-language-extension/issues 

