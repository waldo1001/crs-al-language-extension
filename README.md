# crs-al-language-extension README
This extension is going to have a lot of useful functions to enhance the way to work al (originally Microsoft Dynamics NAV).

## Features
These features are concluded at this moment:

###Waldo Says Hi
A classic Hello-World example

###Install waldo's modules: 
Download all PowerShell modules of author "waldo" from the PowerShellGallery.  Basically resulting in:
* Cloud.Ready.Software.NAV
* Cloud.Ready.Software.SQL
* Cloud.Ready.Software.Windows
* Cloud.Ready.Software.PowerShell

###Run Object
The idea is to be able to run an object straight from the development environment.  There are four functions in the Command Palette:
* CRS: Run Object (Web Client)
* CRS: Run Object (Tablet Client)
* CRS: Run Object (Phone Client)
* CRS: Run Object (Windows Client)
Depending on which client, you will be asked for object type and object id.  The functionality looks at the settings (launch.json and configuration settings).

###Snippets
At a certain point, new snippets will be included here
####tpagewizard
TODO

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
                
## Known Issues
Please report issues hier: https://github.com/CloudReadySoftware/crs-al-language-extension/issues 

## Release Notes

### 0.0.2
Bugfixing - getting everything decently published on the Marketplace

### 0.0.1
Initial release 
