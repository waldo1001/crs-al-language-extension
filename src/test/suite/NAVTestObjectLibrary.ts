
class NAVTestObject {
    public ObjectFileName: string;
    public ObjectText: string;

}

export function getTemplateObject(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'al.al'
    object.ObjectText = `
    `
    return object;
}

export function GetFileNameWithWrongCasing(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'al.Al'
    object.ObjectText = `
    Report 5319465 "SUP Supplier Rating Batch"
    {

    }
    `
    return object;
}

export function getTableWithComments(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'al.al'
    object.ObjectText = `
    /*
D81 001 00000000B81 AAA 2017.12.26 Some text
*/
table 50901 "Customer Risk"
{
    DataClassification = ToBeClassified;

    fields
    {
        field(1; MyField; Integer)
        {
            DataClassification = ToBeClassified;

        }
    }

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
export function getEnumObject(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'al.al'
    object.ObjectText = `enum 50100 MyEnum
{
    Extensible = true;
    
}`
    return object;
}
export function getEnumExtensionObject(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'al.al'
    object.ObjectText = `enumextension 50100 MyEnumextension extends MyEnum
{

}`
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
export function getTestCodeunitWithPrefix(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Cod50100.justAName.al'
    object.ObjectText = `
        codeunit 50101 "Vault Management_EVAS"
        {
        
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
                group(bleh)
                {
                    field("Telex No."; "Telex No.")
                    {
                        ApplicationArea = All;
                    }
                }
                group(two){
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

        trigger OnOpenPage()
        var
            TestCodeunit: Codeunit "Testcodeunit SUFFIX";
        begin
            TestCodeunit.MyProcedureNameEndsWithaction(Rec);
        end;
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

export function getPageExtensionWithLongBaseName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'Pag50102.justAName.al'
    object.ObjectText = `pageextension 50102 "Sales & Purch" extends "VeryLongBaseNameForExtending" //14
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
export function getTableExtensionWrongFileNameAndKeyWord(): NAVTestObject {
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
        field(114; "Grid"; Boolean) // This is a keyword used as a fieldname
        {
            Caption = 'Grid';
            DataClassification = CustomerContent;
        }
        field(115; "page"; Boolean) // This is a keyword used as a fieldname
        {
            Caption = 'page';
            DataClassification = CustomerContent;
        }
    }
    
}
    `
    return object;
}
export function getTableExtensionWithSkippingFieldForRename(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomeTableExt.al'
    object.ObjectText = `tableextension 50100 "Just Some Table Extension" extends Customer //18
{
    fields
    {
        //crs-al disable
        field(50100;"Just Some field";Code[10]){
            TableRelation="Just Some Table"."No.";
        }
        //crs-al enable
        field(10;MyField2;     Integer)
        {
            DataClassification = ToBeClassified;
        }
    }
    
}
    `
    return object;
}

export function getExtensionObjectWithVeryLongObjectName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'bleh.al'
    object.ObjectText = `pageextension 2036789 "BlankPurchOrderSubfrm Ext BASE" extends "Blanket Purchase Order Subform" //510
    {
    
        layout
        {
            addlast(Control1)
            {
                field("VMF Status Icon"; "VMF Status Icon")
                {
                    ApplicationArea = All;
                    Visible = GlobalShowVMFStatusIcon;
                }
            }
        }
    
        actions
        {
            addlast("&Line")
            {
                action(ActionShowVMFMessages)
                {
                    Image = ErrorLog;
                    Caption = 'Show VMF Messages';
                    Visible = GlobalVMFIsEnabled;
                    ApplicationArea = All;
                    trigger OnAction()
                    begin
                        ShowVMFMessages();
                    end;
                }
            }
        }
        var
            GlobalShowVMFStatusIcon: Boolean;
            GlobalVMFIsEnabled: Boolean;
    
        trigger OnOpenPage()
        var
            VMFClass: Codeunit "VMF Class";
        begin
            GlobalShowVMFStatusIcon := VMFClass.IsVMFStatusIconEnabledForPurchase();
            GlobalVMFIsEnabled := VMFClass.IsVMFEnabled();
        end;
    
        trigger OnAfterGetRecord()
        begin
            if GlobalShowVMFStatusIcon then
                VMFUpdateStatusIcon();
        end;
    
        trigger OnModifyRecord(): Boolean
        begin
            if GlobalShowVMFStatusIcon then
                VMFUpdateStatusIcon();
        end;
    }
    `

    return object;

}

export function getTableWrongFileNameAndKeyWord(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomeTableExt.al'
    object.ObjectText = `table 50102 "Sales&Receivables"
    {
        DataClassification = CustomerContent;
    
        fields
        {
            field(1; MyField; Integer)
            {
                ObsoleteState = Pending;
                DataClassification = CustomerContent;
            }
            field(114; "Grid"; Boolean) // This is a keyword used as a fieldname
            {
                Caption = 'Grid';
                DataClassification = CustomerContent;
            }
            field(115; "page"; Boolean) // This is a keyword used as a fieldname
            {
                Caption = 'page';
                DataClassification = CustomerContent;
            }
    
        }
    
        keys
        {
            key(PK; "MyField")
            {
                Clustered = true;
            }
        }
    
    }
    `
    return object;
}

export function getTableFieldNamesWithSpecialCharacters(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'JustATestTable.al';
    object.ObjectText = `table 50102 JustATestTable
    {
        DataClassification = CustomerContent;
    
        fields
        {
            field(1; MyField; Integer)
            {
                DataClassification = CustomerContent;
            }
            field(123; "Unit Cost (LCY)"; Decimal)
            {
                Caption = 'Unit Cost (LCY)';
                DataClassification = CustomerContent;
            }
            field(321; "VAT %"; Decimal)
            {
                Caption = 'VAT %';
                DataClassification = CustomerContent;
            }
            field(402; "Cost is Posted to G/L (Cost is Posted to G/L)"; Boolean)
            {
                Caption = 'Cost is Posted to G/L (Cost is Posted to G/L)';
                DataClassification = CustomerContent;
            }
        }

        keys
        {
            key(PK; "MyField")
            {
                Clustered = true;
            }
        }
    }
    `;
    return object;
}
export function getPageFieldNamesWithSpecialCharacters(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'JustATestPage.al';
    object.ObjectText = `page 50102 JustATestPage
    {
        layout
        {
            area(content)
            {
                repeater(General)
                {
                    field(MyField; Integer)
                    {
                    }
                    field("Unit Cost (LCY)"; Decimal)
                    {
                        Caption = 'Unit Cost (LCY)';
                    }
                    field("VAT %"; Decimal)
                    {
                        Caption = 'VAT %';
                    }
                    field("Cost is Posted to G/L (Cost is Posted to G/L)"; Boolean)
                    {
                        Caption = 'Cost is Posted to G/L (Cost is Posted to G/L)';
                    }
                }
            }
        }
    }
    `;
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

        local procedure ShowSourceDocOrTransaction(pbolShowSourceDocument: Boolean)
        var
            lrecRegisteredTrans: Record "NVT WMS Registered Transaction";
            liCounter: Integer;
            liTypes: Integer;
            liPossibleTypes: array[10] of Integer;
        begin
            ShowSourceDocOrTransaction(false); 
            CheckTransaction(true)
        end;
        
        var
            myInt: Integer;
    }
    `
    return object;
}

export function getPageNoPrefixCorrectNameWithActions(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'justAName.Page.al'
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
export function getSimpleInterface(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomeInterface.al'
    object.ObjectText = `interface "IBallColorIdentifier"
    {
        procedure GetBallColor(): Text;
    }
    `
    return object;
}
export function getSimpleReportExtension(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'getSimpleReportExtension.al'
    object.ObjectText = `reportextension 50100 "Customer Top 10 List Ext" extends "Customer - Top 10 List"
    {
        dataset
        {
            // Add changes to dataitems and columns here
        }
    
        requestpage
        {
            // Add changes to the requestpage here
        }
    }
    `
    return object;
}
export function getSimpleReportExtensionWithSummaryComments(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'getSimpleReportExtension.al'
    object.ObjectText = `
    /// <summary>
    /// Interface "bleh"
    /// </summary>
    reportextension 50100 "Customer Top 10 List Ext" extends "Customer - Top 10 List"
    {
        dataset
        {
            // Add changes to dataitems and columns here
        }
    
        requestpage
        {
            // Add changes to the requestpage here
        }
    }
    `
    return object;
}
