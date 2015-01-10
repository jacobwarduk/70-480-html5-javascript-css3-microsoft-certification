Public Class Login
    Inherits Page

    Protected Sub Page_PreInit(sender As Object, e As EventArgs) Handles Me.PreInit
        If Not String.IsNullOrEmpty(Request.QueryString("content")) Then
            Response.Redirect("~/Account/LoginAjax.aspx")
        End If
    End Sub

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
        RegisterHyperLink.NavigateUrl = "Register.aspx?ReturnUrl=" + HttpUtility.UrlEncode(Request.QueryString("ReturnUrl"))
    End Sub
End Class