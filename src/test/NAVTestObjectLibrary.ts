
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
export function getPageExtensionWrongFileName(): NAVTestObject {
    let object = new NAVTestObject;

    object.ObjectFileName = 'SomeFile.al'
    object.ObjectText = `pageextension 50100 SomePageExt extends "Customer List" //22
{
    layout
    {
        addfirst(Content)
        {
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
    }
    
}
    `
    return object;
}

export function getObjectWithPrefixWrongName(): NAVTestObject {
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

export function getObjectNoPrefixCorrectNameWithActions(): NAVTestObject {
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
