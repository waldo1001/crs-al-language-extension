# crs-al-language-extension
A bunch of useful commands, settings and snippets to improve your life as an al developer for Microsoft Dynamics 365 Business Central (or "Microsoft Dynamics NAV").

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
* CRS: Run Current Object (Web Client) (CTRL+SHIFT+r) - runs the object from the open file (the extension needs to be published first).
* CRS: Run CAL Test Tool in Web Client
Depending on which client, you will be asked for object type and object id.  The functionality looks at the settings (launch.json and configuration settings).
### Reorganize Files
The commands can rename your file, and move the file to the folder, corresponding to the object type. There are four functions in the Command Palette:
* CRS: Rename - Current File
* CRS: Rename - All Files
* CRS: Reorganize - Current File
* CRS: CRS: Reorganize - All Files
Note - "Reorganize" will move a test-codeunit to the test-folder
### Search on Google / Microsoft Docs
Two commands have been added to search for any given search string on Google or Microsoft Docs.  The search string "Business Central" will automatically be added.
* CRS: Search Microsoft Docs
* CRS: Search Google

The selected word in the editor will be added by default as a search string.

![Search on Google / Microsoft Docs](images/SearchGoogleDocs.gif)

### Snippets
al Snippets:
* tpagewizard (CRS: 3 steps)
    * creates a wizard with 3 steps
    * includes placeholders
* ttableextension (CRS)
    * Quite the same as the default snippet, but with the comment to include an TargetTableId to be able to properly rename the file (which might need that ID).
* tpageextension (CRS)
    * Quite the same as the default snippet, but with the comment to include an TargetPageId to be able to properly rename the file (which might need that ID).
* tpagecustomization (CRS)
    * Quite the same as the default snippet, but with the comment to include an TargetPageId to be able to properly rename the file (which might need that ID).
* tvar (CRS)
    * Some easier way to greate a variable
* tfieldgroup(s) (CRS)
    * To work with fieldgroups (Like "Brick" & "DropDown")
Apply some design patterns:
* tcodeunit (CRS: Method - No UI)
    * creates a codeunit, conform on the "Event Based Software Architecture"
    * no functions for UI
    * includes placeholders
* tmynotifications (CRS)
    * apply "discover event subscriber" for adding a "My Notification"
* tassistedsetup (CRS)
    * apply "discover event subscriber" for adding an assisted setup
* tserviceconnection (CRS)
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
    - `<ObjectTypeShortUpper>` - Same as "ObjectTypeShort" but uppercased
    - `<ObjectId>`
    - `<ObjectName>` - weird chars are removed - includes prefix and suffix
    - `<ObjectNameShort>`
* `CRS.FileNamePatternExtensions`: The pattern of the filename for extension objects.  These vars can be used: 
    - `<Prefix>` - just the prefix separately
    - `<Suffix>` - just the suffix separately
    - `<ObjectType>`
    - `<ObjectTypeShort>` - a short notation of the object type.
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
* `CRS.AlSubFolderName`: Variable subfoldername.  "None" means you want to disable the command to move files to a subfolder.  
* `CRS.OnSaveAlFileAction`: Automatically will Rename/Reorganize the file you are editing.  Takes into account the prefix/suffix as well.
* `DisableDefaultAlSnippets`: Disables the default snippets that come with the Microsoft.al-language extension.  When you change the setting, you need to restart VSCode twice.  Once for disabling the snippets on activation (at that time, the snippets are still loaded).  And the second time to actually not load the snippets anymore.
* `DisableCRSSnippets`: Disables the CRS snippets that come with this extension.  When you change the setting, you need to restart VSCode twice.  Once for disabling the snippets on activation (at that time, the snippets are still loaded).  And the second time to actually not load the snippets anymore.
## Known Issues
None .. but if you have any, please report here: https://github.com/CloudReadySoftware/crs-al-language-extension/issues 

