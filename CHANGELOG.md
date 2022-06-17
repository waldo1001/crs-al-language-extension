# Change Log
All notable changes to the "crs-al-language-extension" extension:

## [1.5.9] - ...
Once again many changes by [Christian Bräunlich](https://github.com/christianbraeunlich) - Big thanks again! 
- Fixed snippets
- Added snippets
- Improved the README

[pri-kise](https://github.com/pri-kise) Added support for more special chars on pages.  Big thanks!

## [1.5.8] - 2022-05-16
- Fixed issue "[Prefix missing for Names containing % or brackets ( )](https://github.com/waldo1001/crs-al-language-extension/issues/210)" by [Christian Bräunlich](https://github.com/christianbraeunlich) - Big thanks again! 

## [1.5.7] - 2022-05-10
- Updated snippets by [Christian Bräunlich](https://github.com/christianbraeunlich) - Big thanks!

## [1.5.6] - 2022-05-05
- Added `Event` keyword - thanks [Frédéric Vercaemst](https://github.com/fvet)!

## [1.5.5] - 2022-04-28
- Snippet updated by [Arthur](https://github.com/Arthurvdv).  Thanks so much!

## [1.5.4] - 2022-03-17
- Added setting `SkipWarningMessageOnRenameAll` that does just that ;-).  Thanks [Mustafa Kilic](https://github.com/mkilic1337) for [the pull request](https://github.com/waldo1001/crs-al-language-extension/pull/224)!
- Updated snippets tcodeunitMethodWithoutUIwaldo & tcodeunitMethodWithUIwaldo (renamed "Handled" to "IsHandled") (thanks [IceOnly](https://github.com/IceOnly))

## [1.5.2] - 2022-02-22
- Fixed snippet tinstallcodeunitwaldo (thanks [Alexander Henkel](https://github.com/ahenkel))

## [1.5.1] - 2022-02-11
- Fix about loading setting from multiple levels.  (Thanks [dannoe](https://github.com/dannoe))
- Fix regarding runobject with certain browsers. (Thanks [geschwint](https://github.com/geschwint))
- Fix regarding naming convention of PermissionSet(Extension) (Thanks [Tomas Kapitan](https://github.com/TKapitan))
- Added functionality: use comments to disable crs-string-manipulation (Thanks [askotnica](https://github.com/askotnica))
```AL
  //crs-al disable
  ...
  //crs-al enable
```


## [1.4.12] - 2022-02-09
Improved snippets (also thank you [Christian Bräunlich](https://github.com/christianbraeunlich))

## [1.4.11] - 2021-09-13
Updated snippets (including v19)

## [1.4.10] - 2021-08-03
PR: [Reuse crs terminal if one already exists](https://github.com/waldo1001/crs-al-language-extension/pull/206) by [James Pearson](https://github.com/jimmymcp) - Thanks so much, James!

## [1.4.9] - 2021-05-10
New command `CRS: Compile DGML`, which enables the new capabilities of the compiler to generate a DGML document that can be opened by a DGML reader (usually Visual Studio).

## [1.4.4] - 2021-04-20
Renamed "Run AL Test Tool" command.
New objects: `PermissionSet` and `PermissionSetExtension` in rename process
Added snippets: 
  - `tinstallcodeunitwaldo` - A template install codeunit. (thank you [Waldemar](https://github.com/wbrakowski) and [AJ](https://github.com/ajkauffmann))
  - `tUpgradeCodeunitwaldo` - A template upgrade codeunit.
  - `tUpgradeTableProcedurewaldo` - A template procedure to move all data from one table to the next.
  - `tUpgradeFieldProcedurewaldo` - A template procedure to move field data from one table to the other.

Improved snippets (thank you [Daniel](https://github.com/TheDenSter))

## [1.4.2] - 2021-02-08
Added command `CRS: Configure Best-practice File Naming`, it will set up your user settings or workspace settings with some settings that are considered to be best practice (Thank you, [Vjeko](https://github.com/vjekob)).

## [1.4.1] - 2021-02-04
Added: 
- Support for Report Extensions
- New snippets regarding `GetRecordOnce` in setup tables.
- Warning when using Chrome in combination with RunObject commands
- Take comments into account - it might have confused the object parsing ([Bug 167](https://github.com/waldo1001/crs-al-language-extension/issues/167))

## [1.3.8] - 2021-01-28
Fix a very rare case where a rename could overwrite a file.

## [1.3.7] - 2021-01-11
Added new command: `CRS: Publish and Run Current Object`.  Now you don't have to compile/publish first, to run object afterwards - it's all one command now!

## [1.3.5] - 2020-11-26
Added "internal" to the method-snippet. [Thanks Stefan](https://github.com/waldo1001/crs-al-language-extension/pull/183)!

## [1.3.3] - 2020-11-19
Added 2 snippets for Notification Codeunit Patterns (described by [Luc van Vugt](https://dynamicsuser.net/nav/b/vanvugt)): 
- `tnotificationcodeunitwaldo`: (Notification Codeunit with a bunch of needed mechanics)
- `tmynotificationscodeunitwaldo`: (same is above, but now with added subscriber to add the notification to the "My Notifications" page)

More information on Luc's blog: 
- [How-to: Create Notifications – Steps to Take](https://dynamicsuser.net/nav/b/vanvugt/posts/how-to-create-notifications-steps-to-take)
- [How-to: Add your notification to My Notifications](https://dynamicsuser.net/nav/b/vanvugt/posts/how-to-add-your-notification-to-my-notifications)

## [1.3.2] - 2020-11-06
Fix - run `CRS: Create GraphViz Dependency Graph` on "just" a folder with lots of apps.  Open the folder in VSCode, run the command.

## [1.3.1] - 2020-11-05
New Command: `CRS: Create GraphViz Dependency Graph`

This command will read all app.json files in your workspace (so this function is really useful in a Multi-root workspace) and create a .dot dependency file from it.  To display this file graphically, I recommend to also install the extension [Graphviz Interactive Preview](https://marketplace.visualstudio.com/items?itemName=tintinweb.graphviz-interactive-preview).  If you have, this command will automatically open the preview after generating the graph.

This functionality  will take these settings into account:
* `CRS.DependencyGraph.IncludeTestApps`: Whether to include all dependencies to test apps in the Dependency Graph.
* `CRS.DependencyGraph.ExcludeAppNames`: List of apps you don't want in the dependency graph.
* `CRS.DependencyGraph.ExcludePublishers`: List of publishers you don't want in the dependency graph.
* `CRS.DependencyGraph.RemovePrefix`: Remove this prefix from the appname in the graph.  Remark: this has no influence on the 'Exluce AppNames' setting.

## [1.2.5] - 2020-10-05
[Fix](https://github.com/waldo1001/crs-al-language-extension/pull/181) from [Márton Sági](https://github.com/martonsagi) about focusing webview and performance loss.
Fixed a few snippets to comply with CodeCops

## [1.2.4] - 2020-04-29
Fixed: [action indentation after rename](https://github.com/waldo1001/crs-al-language-extension/issues/170)

## [1.2.3] - 2020-04-28
New setting:
- `CRS.RemoveUnderscoreFromFilename`: When using the Reorganize/Rename-commands, this setting will remove any underscore from the filename (but keep it in object name).  Tip: use as a workspace-setting

Fixed:
- [Prefix/Suffix with underscores fails to be removed from filename](https://github.com/waldo1001/crs-al-language-extension/issues/169)
- [Prefix/Suffix in procedures to objects parameters if procedure name ends with "action"](https://github.com/waldo1001/crs-al-language-extension/issues/168)

## [1.2.2] - 2020-04-27
Finally found a solution for the annoying snippets that popped up in IntelliSense when not wanted.

Added:
- [New snippet - interface enhancement](https://github.com/waldo1001/crs-al-language-extension/issues/165)

Fixed:
- [if/then statement runs tcodeunit snippet](https://github.com/waldo1001/crs-al-language-extension/issues/166)
- [Remove the '.' in assistedsetup snippets](https://github.com/waldo1001/crs-al-language-extension/issues/162)
- [Renaming doesn't remove underscore](https://github.com/waldo1001/crs-al-language-extension/issues/161)
- [Renaming files fails on codeunits that implement interfaces](https://github.com/waldo1001/crs-al-language-extension/issues/159)
- [Intellisense on EventSubscriber Procedure](https://github.com/waldo1001/crs-al-language-extension/issues/86)

## [1.2.1] - 2020-04-06
Added support for "Interface" object of Business Central v16

## [1.1.26] - 2020-04-02
Fixed a small issue with renaming extension objects with long name (and auto object naming)

## [1.1.25] - 2020-03-26
Fixed issue when autorenaming resulted in a table-/pageextension that was too long.

## [1.1.24] - 2020-03-25
New Command: "CRS: Search Object Names"
- It will search the selected object name in all your files.  
- The regex can be set up with the setting `CRS.SearchObjectNamesRegexPattern`.
- This idea comes from [this blog](https://jackmallender.com/2020/03/24/searching-the-business-central-base-app/) by [Jack Mallender](https://twitter.com/Jack_Mallender).  Thank you so much - this is extremely useful :-).


## [1.1.23] - 2020-03-16
Changed - [Allow renaming to result in too big object names](https://github.com/waldo1001/crs-al-language-extension/issues/157)

## [1.1.22] - 2020-01-03
Added and updated snippets, like:
- tassistedsetup - for version >=15
- tProcedureFromClipboard - to convert a piece of code into a function, just cut the code and use this snippet - pretty cool ;-).
- tTestHandler.. - [multiple snippets](https://github.com/waldo1001/crs-al-language-extension/commit/e58b72dddda3007b982b31e85a3b9caa351adcd4) for easily adding handlers in test-codeunits
- added "caption" to snippets with also "UsageCategory" (to enable translation).
- Improved "Option" snippet.  [Reported](https://github.com/waldo1001/crs-al-language-extension/issues/135) by [SirBETE](https://github.com/SirBETE)

Solved:
- Updated naming convention for Control Addin (Thanks to [this pullrequest](https://github.com/waldo1001/crs-al-language-extension/issues/141).)
- Wrong behaviour when using "Trigger" as a new of a control (don't remember who gave the feedback, my apologies.  [here](https://github.com/waldo1001/crs-al-language-extension/commit/6c91c8023aff5a87f9fc8245493ffe4be6fa0fe2) is the commit)
- Run Object for **named** online sandbox.
- Use al browser settings (if any).  Reported by [mjmatthiesen](https://github.com/mjmatthiesen) [here](https://github.com/waldo1001/crs-al-language-extension/issues/152).

## [1.1.21] - 2019-11-05
Added keywords as suggested [here](https://github.com/waldo1001/crs-al-language-extension/issues/143) by [Frédéric Vercaemst](https://github.com/fvet).

Added `<ObjectTypeShortPascalCase>` as an extra FilePattern option because Microsoft is going to include this as a Best Practice.  Thanks [ernestasjuska](https://github.com/ernestasjuska) and [hmerbouche](https://github.com/hmerbouche) for [the heads up](https://github.com/waldo1001/crs-al-language-extension/issues/141)!

An example of the new "best practice" settings looks like:
```json
    "CRS.OnSaveAlFileAction": "Rename",
    "CRS.FileNamePattern": "<ObjectNameShort>.<ObjectTypeShortPascalCase>.al",
    "CRS.FileNamePatternExtensions": "<ObjectNameShort>.<ObjectTypeShortPascalCase>.al",
    "CRS.FileNamePatternPageCustomizations": "<ObjectNameShort>.<ObjectTypeShortPascalCase>.al",
    "CRS.ObjectNamePrefix": "ALDA ",
    "CRS.RemovePrefixFromFilename": true,
```

## [1.1.19] - 2019-10-29
- Improved: 
  - Prevent deleting files because of Multiroot Issue (Issue [RenameWithGit icw MultiRoot workspace removes files](https://github.com/waldo1001/crs-al-language-extension/issues/140))
  - All snippets
- Renamed to "waldo's al language extension".  Initially, it was intended to be built by the team members of CRS.  But it turned out to be a purely community project by waldo only - so renaming it was inevitable ;-).  I expect to rename the commands at some point as well.. .

## [1.1.17] - 2019-10-09
Fixed: Test Snippets - it included a "." in the names, but seemed to break the "AL Test Runner". Changed to "_"?

## [1.1.16] - 2019-07-06
Fixed: [Remove spaces in ControlAddIn names and paths](https://github.com/waldo1001/crs-al-language-extension/issues/131). 

## [1.1.15] - 2019-07-04
Fixed:
- When using keywords as fieldnames, you really NEED the surrounding quotes.  Issue on github: [Surround Keywords with doublequotes](https://github.com/waldo1001/crs-al-language-extension/issues/129).
- [Make rename/reorganize work for controladdins](https://github.com/waldo1001/crs-al-language-extension/issues/103).
Improved:
- Show output when there is a git-warning.

## [1.1.11] - 2019-06-27
Fixed:
- [ExtensionObjectNamePattern could create too big object names](https://github.com/waldo1001/crs-al-language-extension/issues/127)
- [Update tpagewizard to avoid missing paranthesis warning](https://github.com/waldo1001/crs-al-language-extension/pull/125) - Thanks [Chris](https://github.com/ChrisBlankDe)!

## [1.1.9] - 2019-06-07
- Fixed [issue with special chars in field names](https://github.com/waldo1001/crs-al-language-extension/issues/122), mentioned by [omurcanates](https://github.com/omurcanates) and fixed by [Kenneth Fuglsang](https://github.com/kfuglsang).
- [Removed spaces from snippet prefixes](https://github.com/waldo1001/crs-al-language-extension/issues/121), which makes it behave much better in IntelliSense.

## [1.1.7] - 2019-06-06
- [Kenneth Fuglsang](https://github.com/kfuglsang) changed the field-handling: [only add quotes when necessary](https://github.com/waldo1001/crs-al-language-extension/pull/120).  Thanks so much!
- [New and improved Method Snippets](https://github.com/waldo1001/crs-al-language-extension/commit/62d417fce7c1daf2b5cec94a49b5401e308784e7)

## [1.1.6] - 2019-05-28
Fixed:
- [Rename command adds quotes around all object + control names](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/114) by [rvanbekkum](https://github.com/rvanbekkum) - thanks so much!
- Improved stability for "rename with Git" (remember the setting `crs.RenameWithGit`)
- snippet - [tfield does not show DateTime as you time](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/116) - reported by [GreatScott000](https://github.com/GreatScott000)
- vulnerability issue with typescript

## [1.1.3] - 2019-04-12
Improved snippets, including a contribution of [Rasmus Aaen](https://github.com/RasmusTidselbak) with a snippet for test cases by [this pullrequest](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/113).

## [1.1.2] - 2019-03-28
Fixed:
- [CRS: Reorganize - All Files error](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/110)

## [1.1.0] - 2019-03-26
New: 
- [Run Current object from Status Bar / Right click](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/107)
- New Output channel for this extension: all actions are logged there!

Improved:
- Renaming/Reorganizing using `git mv`, as requested by [Chris Blank](https://github.com/ChrisBlankDe) [here](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/100).  Enable by setting this setting:
    * `RenameWithGit`: Use 'git mv' to rename a file.  This keeps history of the file, but stages the rename, which you should commit separately.  **The feature is still in preview-mode, therefore the default value is 'false'**
- [Add Prefix/Suffix to pageextension Groups and Fields](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/93)
- Significantly less [Debug Console Messages](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/106)
- Snippets thanks to [Chris Blank](https://github.com/ChrisBlankDe)!

Fixed: "case insensitivity" for file extensions - [Rename/Reorganize AL File in extension of file is in caps](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/105)

## [1.0.15] - 2019-02-25
- Added Extension API.  By [Pullrequest](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/104) of [Andrzej Zwierzchowski](https://github.com/anzwdev). Thanks so much! :-)

## [1.0.13] - 2019-02-19
- Fixed small security issues
- slightly improved the table-snippet
- Merged Pull Request of [Rasmus Aaen](https://github.com/RasmusTidselbak) - [Fixed casing and parenthesis](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/101)

## [1.0.12] - 2019-01-29
- Fixed - Issue with situations when many comments are in a file, which could cause (by exception) taking the wrong text for determining the object properties.  Filed by [Luc van Vugt](https://github.com/lvanvugt) in [this issue](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/99).
- Fixed - Issue with leading comments in a file, which could cause the regex to end up taking wrong conclusions.  [Issue](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/94) by [Laura Nicolas](https://github.com/LauraNicolas).
- Small improvement on snippet(s)

## [1.0.11] - 2019-01-21
- Fixed - Snippet "tFieldOption" by [this Pull Request](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/96).  Thanks [ThePsionic](https://github.com/ThePsionic)!

## [1.0.10] - 2019-01-13
- Fixed - [CRS.WinServerInstance Expected String](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/90)
- Fixed - Removed vulnerable dependencies "flatmap-stream" and "event-stream"
- Improved tooltips for settings

## [1.0.8] - 2018-11-04
- Improved - [Reopen files when renaming, reorganizing all files](https://github.com/CloudReadySoftware/crs-al-language-extension/pull/89 ) - by PR from [Martin Kuhn](https://github.com/makuhn). Thank you!
- Updated dependent modules & Changed/Reset compile-tasks to default behaviour
- Disabled command "Install Waldo's Modules" as this was never used, and not working like I would like it to.  There is a better way to run powershell, and I'll implement that first.

## [1.0.6] - 2018-10-15
- Added - [Run page "Event Subscribers" from the command palette](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/83)
- Added - [Run page "Database Locks" from the command palette](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/83)
- Improved - [Close all files first when renaming / reorganizing all files](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/84)

## [1.0.5] - 2018-10-10
- Fixed - [When auto renaming file, previous file stays open](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/82)
- Fixed - other minor issues
- Added - When renaming a file, the cursor is positioned on the same place as it was before the rename

## [1.0.4] - 2018-09-25
Fixed snippets

## [1.0.3] - 2018-09-19
- Fixed - [Reorganize doesn't work for enums](https://github.com/CloudReadySoftware/crs-al-language-extension/issues/78)
- Synched and improved snippets from the 2.0-version of the Microsoft-al extension.

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
- DisableWaldoSnippets
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

