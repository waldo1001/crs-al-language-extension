param(
    [String] $ObjectType,
    [Int] $ObjectId,
    [string] $WebServerInstance
)

Import-NAVModules

Start-NAVApplicationObjectInWebClient `
    -WebServerInstance $WebServerInstance `
    -WebClientType Web `
    -ObjectType $ObjectType `
    -ObjectID $ObjectId     