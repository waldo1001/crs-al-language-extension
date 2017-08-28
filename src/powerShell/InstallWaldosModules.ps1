

$ModulesInstalled = Get-Module -ListAvailable | Where name -like 'Cloud.Ready.Software.*'

if (!($ModulesInstalled)){
    find-module | where author -eq 'waldo' | install-module
}
else
{
    Write-Warning 'Modules already installed!'
}
