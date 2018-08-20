# Change Log
All notable changes to the "crs-al-language-extension" extension.
## [1.0.1] - 2018-08-20
- Fixed - [Bug with not-lowercased object types](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/74)
- Fixed - [Using Rename/organize on file with unsaved changes creates duplicate files](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/72) - by [PR](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/73) from [Johannes Wikman](https://github.com/jwikman).  Thank you!

## [1.0.0] - 2018-08-03
After 10k downloads, I guess we can speak of a version 1.0 ;-).

Changes:
- Added Snippets:
  - flowfields: tflowfield, tflowfieldcount, tflowfieldexist, tflowfieldsum, tflowfieldlookup ([Idea from "GreatScott000"](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/67))
  - Headline: tpageheadline (Pullrequest from [Dmitry](https://github.com/CloudReadySoftware/crs-al-language-extension/commits?author=dkatson). Thanks!)
  - RoleCenter: tpagerolecenter, ttableactivities, tpageactivities (Pullrequest from [Dmitry](https://github.com/CloudReadySoftware/crs-al-language-extension/commits?author=dkatson). Thanks!) 
- Fixed - [Unnecessary error message while disabling snippets](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/65)

## [0.2.24] - 2018-07-13
- Fixed - [ttrigger within field](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/66)
- Fixed - [Default AL Snippets won't disable](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/65)
- Fixed - [issue with Reorganize files (case sensitivity)](https://github.com/CloudReadySoftware/crs-al-language-extension/commit/9adaa8988eec3dd4cde317f5e5e9e117568ee570)

## [0.2.22] - 2018-07-06
Fixed unreadable documentation - basically nothing changed

## [0.2.20] - 2018-07-06
- New Feature: automatic object name for Extension Objects with a new setting:
    * `CRS.ExtensionObjectNamePattern`: The pattern for the object name. If set (it's not set by default), it will perform an automatic object name for extension objects
        - `<Prefix>`
        - `<Suffix>`µ
        - `<ObjectType>`
        - `<ObjectTypeShort>` - a short notation of the object type.
        - `<ObjectTypeShortUpper>` - Same as "ObjectTypeShort" but uppercased
        - `<ObjectId>`
        - `<BaseName>` - weird chars are removed - does NOT include prefix nor suffix
        - `<BaseNameShort>` - does NOT include prefix nor suffix
        - `<BaseId>` - If you want this to work, you need to put the Id in comment after the base name (see below)

## [0.2.19] - 2018-07-03
- Fixed prefix and suffix behaviour:
    * Now also suffixes on fields and actions
    * No suffix/prefix anymore on action of new pages
- Fixed setting "CRS.AlSubFolderName" - changed "Src" to "src", as that is Microsoft's recommendation ([pullrequest](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/63) from [spookymattress](https://github.com/spookymattress) :-)).
- Added functionality: **Search on Google / Microsoft Docs** - these two commands have been added to search for any given search string on Google or Microsoft Docs: 
    * CRS: Search Microsoft Docs
    * CRS: Search Google

    The selected word in the editor will be added by default as a search string and the search string "Business Central" will automatically be added.

## [0.2.18] - 2018-07-02
- No bugfixes (none reported)
- Improved efficiency of many existing snippets
- Added snippets for "fieldgroups" (like Brick and DropDown)

## [0.2.17] - 2018-06-24
Two new settings by [pullrequest](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/56) from [Johannes Wikman](https://github.com/jwikman):
- `CRS.RemovePrefixFromFilename`: When using the Reorganize/Rename-commands, this setting will remove any prefix from the filename (but keep it in object name).  Tip: use as a workspace-setting
- `CRS.RemoveSuffixFromFilename`: When using the Reorganize/Rename-commands, this setting will remove any suffix from the filename (but keep it in object name).  Tip: use as a workspace-setting

## [0.2.16] - 2018-06-21
- This [pullrequest](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/53) that was created by [Johannes Wikman](https://github.com/jwikman) solved a problem with weird characters in the objects names.
- The pullrequest above also also solved this [GitHub Issue](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/54), by [Mohana Yadav](https://github.com/pmohanakrishna).

## [0.2.15] - 2018-06-13
- Solved [Github Issue](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/48) and in the meanwhile, I have been refactoring and extending the "Rename FileName" functionality a bit, resulting in these tags (copy from ReadMe.md):
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
    - `<BaseId>` - If you want this to work, you need to put the Id in comment after the base name

- Solved [Github Issue](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/47) - renaming with prefix messed up the format of the fields
- Solved [Github Issue](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/44) - ability to override the launch.json with a PublicWebBaseUrl

## [0.2.13] - 2018-06-13
- Fix [Issue with slash in base object name](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/45)
- Some small improvements in snippets

## [0.2.12] - 2018-05-29
- Better permission-xml snippet
- Run Current Object for Extension-objects
- Run Object in Cloud Sandbox 

## [0.2.11] - 2018-05-29
"Reorganize" will move a test-codeunit to the test-folder ([github](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/38))

## [0.2.10] - 2018-05-27
- Minor changes to some existing snippets
- Two snippet-contributions from Dmitry Katson ([More info here](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/36)): ttablesetup & tpagesetup - create setup-table with page

## [0.2.9] - 2018-05-23
Configurations:
- `CRS.AlSubFolderName`: Added "Src" and "Source" folder (which Microsoft uses internally).  Remember: 'None' prevents the 'Reorganize' to do anything (if you want to apply your own folder structure)
- `CRS.DisableDefaultAlSnippets` is not by default "true" anymore as I decided that disabling the default AL snippets should be a conscious decision.

## [0.2.8] - 2018-05-16
Added following snippets:
- tmynotifications - apply "discover event subscriber" for adding a "My Notification"
- tassistedsetup - apply "discover event subscriber" for adding an assisted setup
- tserviceconnection - apply "discover event subscriber" for adding a service connection 
- tvar - a somewhat easier way to create a variable

## [0.2.7] - 2018-05-08
Also applies prefix to fields on table extensions (not tables)

## [0.2.6] - 2018-05-04
Now it will also apply the prefix to actions (requirement for Business Central)

Behind the scenes:
- Major redesign of the code
- Implemented testability
- Minor bugfixes

## [0.2.4] - 2018-04-29
New command - Run CAL Test Tool in Web Client
## [0.2.3] - 2018-04-25
Small bugfix - [Github](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/21)
## [0.2.2] - 2018-04-25
Improved some snippets.

Added 2 new settings to control "prefix" and "suffix" of object names and filenames:
* `CRS.ObjectNamePrefix`: When using the Reorganize/Rename-commands, this setting will make sure the object name (and filename) will have a Prefix.
* `CRS.ObjectNameSuffix`: When using the Reorganize/Rename-commands, this setting will make sure the object name (and filename) will have a Suffix.

Added an ability to rename/reorganize when you save a document.  This way, your commit to SCM will always to be correct:
* `CRS.OnSaveAlFileAction`: Automatically will Rename/Reorganize the file you are editing.  Takes into account the prefix/suffix as well.

## [0.2.1] - 2018-04-16
Improved snippets

## [0.2.0] - 2018-04-13
New command:
- CRS: Run Current Object (Web Client) (CTRL+SHIFT+r)
New settings:
- DisableDefaultAlSnippets
- DisableCRSSnippets
Snippets:
- improved snippets from the al language extension

## [0.1.12] - 2018-04-11
Bugfix - Reorganizing/Renaming Files - [Issue On Github](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/10)

## [0.1.11] - 2018-04-05
Changelog activated like it should!

## [0.1.10] - 2018-04-05
- Reorganize File(s) - Variable subfolder
- Support multi-root workspaces

## [0.1.8]
New snippets to create a permission- & Webservice-metadata file.

## [0.1.6]
Quite an important bugfix: ObjectId was swapped into ObjectName (typo :-/)

## [0.1.4]
Added ability to use "ObjectNameShort" or "ObjectName" for renaming files.
Added support for "&" in the name.

## [0.1.2]
Following Changes were added:
- Alligned the file naming to the ones that are documented by microsoft [here](https://docs.microsoft.com/en-us/dynamics-nav/compliance/apptest-bestpracticesforalcode).
- Added tableextension and pageextension as snippets to help users include an BaseObjectId to be able to do the rename
- reopen file when renaming/reorganizing current file.

## [0.1.1]
Added ability to run Table in web client

## [0.0.8]
Minor but important (;-)) bugfix.

## [0.0.7]
Updated Readme.md

## [0.0.6]
The following commands were added:
- Rename Current File
- Rename All Files
- Reorganize Current File
- Reorganize All Files
Rename: reads the file, and renames it to a certain filename, depending on the object.
Reorganize: move the file to a folder, corresponding to the object type.

## [0.0.5]
Added Snippet - Page Wizard

## [0.0.4]
- Added Snippet - Method Codeunit (No UI)
- Bugfixing - for build operation

## [0.0.3]
Bugfixing - for September Release.

## [0.0.2]
Bugfixing - getting everything decently published on the Marketplace

## [0.0.1]
Initial release 

