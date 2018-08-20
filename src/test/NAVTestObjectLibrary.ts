
class NAVTestObject {
    public ObjectFileName: string;
    public ObjectText: string;

}

export function getTemplateObject(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50100.justAName.al'
    object.ObjectText = `
    `
    return object;
}

export function getPascalCasedObjectType_Report(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50100.justAName.al'
    object.ObjectText = `
        Report 5319465 "SUP Supplier Rating Batch"
        {

        }
    `
    return object;
}

export function getNormalCodeunitWithLongName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Cod50100.justAName.al'
    object.ObjectText = `
        codeunit 50100 "Test Overload"
        {
            [EventSubscriber(ObjectType::Codeunit, Codeunit::LogInManagement, 'OnAfterLogInStart', '', false, false)]
            local procedure TestOverLoad()
            var
                Item: Record Item;
            begin
                item.CalculateClassification(true, 'waldo');
            end;
        }
    `
    return object;
}

export function getTestCodeunit(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Cod50100.justAName.al'
    object.ObjectText = `
        codeunit 50101 TestOverload
        {
            Subtype = Test;

            [Test]
            [HandlerFunctions('HandleMessageFromB')]
            procedure TestOverloadedCalculateClassification()
            var
                Item: Record Item;
            begin
                item.CalculateClassification(false, 'waldo');
            end;

            [MessageHandler]
            procedure HandleMessageFromB(Message: Text[1024])
            begin
                if not Message.Contains('Extension B') then error('wrong message');
            end;
        }
    `
    return object;
}

export function getTableWithWrongFileName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'JustSomeTable.al'
    object.ObjectText = `table 50101 JustATestTable
    {
        DataClassification = ToBeClassified;
    
        fields
        {
            field(1; MyField; Integer)
            {
    
                DataClassification = ToBeClassified;
            }
            field(10;MyField2; Integer)
            {
    
                DataClassification = ToBeClassified;
            }
            field(200;"My Field with a weird / Name"; Integer)
            {
    
                DataClassification = ToBeClassified;
            }
    
        }
        //TODO: Define Keys
        keys
        {
            key(PK; MyField)
            {
                Clustered = true;
            }
        }
    
    }
    `
    return object;
}

export function getAlFileWithoutCode(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'AlFileWithoutCode.al'
    object.ObjectText = `//Only some comments
    `
    return object;
}

export function getPageExtensionWrongFileNameWithActions(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomeFile.al'
    object.ObjectText = `pageextension 50100 "Some Page Ext" extends "Customer List" //22
{
    layout
    {
        addfirst(Content)
        {
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
        }
    }

    actions
    {
        addfirst("&Customer")
        {
            action(SomeAction)
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
            action(SomeAction2)
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
            action("Some Action 3")
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
        }
    }
}
    `
    return object;
}

export function getPageExtensionWithWaldoPrefixWithActions(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomeFile.al'
    object.ObjectText = `pageextension 50100 "waldoSome Page Ext" extends "Customer List" //22
{
    layout
    {
        addfirst(Content)
        {
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
            field("Telex No."; "Telex No.")
            {
                ApplicationArea = All;
            }
        }
    }

    actions
    {
        addfirst("&Customer")
        {
            action(waldoSomeAction)
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
            action(waldoSomeAction2)
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
            action("waldoSome Action 3")
            {
                RunObject = page "_Empl. Absences by Cat. Matrix";
            }
        }
    }
}
    `
    return object;
}

export function getPageExtensionWithSlashInFileName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50102.justAName.al'
    object.ObjectText = `pageextension 50102 "Salesperson/Ext" extends "Salespersons/Purchasers" //14
    {
        layout
        {
            ////
        }
        
        actions
        {
        }
    }
    `
    return object;
}
export function getPageExtensionWithWeirdChars(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50102.justAName.al'
    object.ObjectText = `pageextension 50102 "S<a>l:es/p\\e|rµ?s*oåäön/Ext" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `
    return object;
}


export function getPageExtensionWithQuotesInObjectName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50102.justANameWithQuotes.al'
    object.ObjectText = `pageextension 50102 "S<a>l:es/p\\e"|rµ?s"*oåäön/Ext" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `
    return object;
}
export function getPageWithQuotesInObjectName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50103.justANameWithQuotes.al'
    object.ObjectText = `page 50103 "S<a>l:es/p\\e"|rµ?s"*oåäön/"
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `
    return object;
}
export function getPageExtensionWithAmpersandInFileName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50102.justAName.al'
    object.ObjectText = `pageextension 50102 "Sales & Purch" extends "Salespersons&Purchasers" //14
    {
        layout
        {
            ////
        }
        
        actions
        {
        }
    }
    `
    return object;
}
export function getPageCustomizationWrongFileName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomePageCustomization.al'
    object.ObjectText = `pagecustomization "SomeCustomizationtherewhere" customizes "Customer Card"
{
    layout
    {
        // Add changes to page layout here
    }
    
    actions
    {
        // Add changes to page actions here
    }
    
    //Variables, procedures and triggers are not allowed on Page Customizations
}
    `
    return object;
}
export function getTableExtensionWrongFileName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomeTableExt.al'
    object.ObjectText = `tableextension 50100 "Just Some Table Extension" extends Customer //18
{
    fields
    {
        // Add changes to table fields here
        field(50100;"Just Some field";Code[10]){
            TableRelation="Just Some Table"."No.";
        }
        field(10;MyField2;     Integer)
        {
            DataClassification = ToBeClassified;
        }
        field(200;"My Field with a weird / Name";Integer)
        {

            DataClassification = ToBeClassified;
        }
    }
    
}
    `
    return object;
}

export function getPageWithWaldoPrefixWrongName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomeName.al'
    object.ObjectText = `page 50100 "waldo weird name with/slash"
    {
        PageType = Card;
        SourceTable = test;

        layout
        {
            area(content)
            {
                group(GroupName)
                {
                    field(Name; NameSource)
                    {
                        ApplicationArea = All;

                    }
                }
            }
        }

        actions
        {
            area(processing)
            {
                action(waldoActionName)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
                action(waldoActionName2)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
                action("waldoAction Name 3")
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
            }
        }

        var
            myInt: Integer;
    }
    `
    return object;
}

export function getPageNoPrefixCorrectNameWithActions(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50100.justAName.al'
    object.ObjectText = `page 50100 justAName
    {
        PageType = Card;
        SourceTable = test;

        layout
        {
            area(content)
            {
                group(GroupName)
                {
                    field(Name; NameSource)
                    {
                        ApplicationArea = All;

                    }
                }
            }
        }

        actions
        {
            area(processing)
            {
                action(ActionName)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
                action(ActionName2)
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
                action("Action Name 3")
                {
                    ApplicationArea = All;

                    trigger OnAction()
                    begin

                    end;
                }
            }
        }

        var
            myInt: Integer;
    }`
    return object;
}

export function getObjectWithBracketsInName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Cod50177.SomeNameWithBrackets.al'
    object.ObjectText = `codeunit 50117 "Some Name (with brackets)"
{
    
}
    `
    return object;
}

export function getPageExtensionWithPrefix(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50102.CRSSalesperson.al'
    object.ObjectText = `pageextension 50102 "CRS Salespersons/Purchasers" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `
    return object;
}

export function getPageExtensionWithSuffix(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50102.CRSSalesperson.al'
    object.ObjectText = `pageextension 50102 "Salespersons/Purchasers CRS" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `
    return object;
}

export function getPageExtensionWithPrefixAndSuffix(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50102.CRSSalesperson.al'
    object.ObjectText = `pageextension 50102 "PCRS Salespersons/Purchasers SCRS" extends "Salespersons/Purchasers" //14
{
    layout
    {
        ////
    }

    actions
    {
    }
}
    `
    return object;
}
