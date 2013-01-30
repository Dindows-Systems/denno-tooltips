Public Class WebForm4
    Inherits System.Web.UI.Page

#Region " Web Form Designer Generated Code "

    'This call is required by the Web Form Designer.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()

    End Sub
    Protected WithEvents TextBox1 As System.Web.UI.WebControls.TextBox
    Protected WithEvents DropDownList1 As System.Web.UI.WebControls.DropDownList
    Protected WithEvents TextBox3 As System.Web.UI.WebControls.TextBox
    Protected WithEvents ListBox1 As System.Web.UI.WebControls.ListBox
    Protected WithEvents CheckBox1 As System.Web.UI.WebControls.CheckBox
    Protected WithEvents Button1 As System.Web.UI.WebControls.Button
    Protected WithEvents Hidden1 As System.Web.UI.HtmlControls.HtmlInputHidden
    Protected WithEvents Label1 As System.Web.UI.WebControls.Label

    Protected WithEvents L3 As System.Web.UI.WebControls.Label
    Protected WithEvents L4 As System.Web.UI.WebControls.Label
    Protected WithEvents L5 As System.Web.UI.WebControls.Label
    Protected WithEvents L6 As System.Web.UI.WebControls.Label
    Protected WithEvents L0 As System.Web.UI.WebControls.Label
    Protected WithEvents L1 As System.Web.UI.WebControls.Label
    Protected WithEvents L2 As System.Web.UI.WebControls.Label
    Protected WithEvents TextBox2 As System.Web.UI.WebControls.TextBox
    Protected WithEvents TextBox4 As System.Web.UI.WebControls.TextBox

    'NOTE: The following placeholder declaration is required by the Web Form Designer.
    'Do not delete or move it.
    Private designerPlaceholderDeclaration As System.Object

    Private Sub Page_Init(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Init
        'CODEGEN: This method call is required by the Web Form Designer
        'Do not modify it using the code editor.
        InitializeComponent()
    End Sub

#End Region

    Private Sub Page_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        'Put user code to initialize the page here

        'strScript = "<script>"
        'strScript = strScript & "SetColor();"
        'strScript = strScript & "</script>"
        'Page.RegisterStartupScript("ClientScript", strScript)
    End Sub

    Private Sub Button1_Click(ByVal sender As Object, ByVal e As System.EventArgs) Handles Button1.Click
        Hidden1.Value = ""
        ValidatePageData()
        If Hidden1.Value <> "Clean" Then
            Exit Sub
        Else
            Hidden1.Value = "Clean"
            SavePageData()
        End If
    End Sub

    Private Sub ValidatePageData()
        'Message Format:
        'Field Label ID:Error Message:Field ID

        If TextBox1.Text.Trim = "" Then
            Hidden1.Value = Hidden1.Value & "L0:Date Not Found:TextBox1|"
        End If
        If ListBox1.SelectedIndex < 0 Then
            Hidden1.Value = Hidden1.Value & "L4:City Not Selected:ListBox1|"
        End If
        If ListBox1.SelectedIndex > 0 Then
            If ListBox1.SelectedItem.ToString = "Tempa" Then
                Hidden1.Value = Hidden1.Value & "L4:City Not in State List:ListBox1|"
            End If
        End If
        If DropDownList1.SelectedIndex = 0 Then
            Hidden1.Value = Hidden1.Value & "L2:State Not Selected:DropDownList1|"
        End If

        If CheckBox1.Checked = True Then
            If TextBox4.Text.Trim = "" Then
                Hidden1.Value = Hidden1.Value & "L5:$ Amount Not Found:TextBox4|"
            End If
        End If
    End Sub

    Private Sub SavePageData()
        'Please use following link to generate data Save or Retieveal function
        'based on the Stored Procedure in your SQL Server database.

        'http://www.a1vbcode.com/app-3315.asp

    End Sub

End Class
