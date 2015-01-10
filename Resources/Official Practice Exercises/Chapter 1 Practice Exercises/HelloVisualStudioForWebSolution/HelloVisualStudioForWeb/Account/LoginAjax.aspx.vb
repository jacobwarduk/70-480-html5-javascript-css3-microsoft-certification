Public Class LoginAjax
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        If String.Equals(Request.HttpMethod, "POST", StringComparison.Ordinal) Then
            HandleAjaxRequest()
        End If
    End Sub

    Protected Function GetRegisterUrl() As String
        Return ResolveUrl("Register.aspx?ReturnUrl=" + GetReturnUrl())
    End Function

    Protected Function GetHandlerUrl() As String
        Return ResolveUrl("LoginAjax.aspx?ReturnUrl=" + GetReturnUrl())
    End Function

    Private Function GetReturnUrl() As String
        Return HttpUtility.UrlEncode(Request.QueryString("ReturnUrl"))
    End Function

    Private Function IsLocalUrl(url As String) As Boolean
        Return (Not String.IsNullOrEmpty(url)) AndAlso
            ((url(0) = "/"c AndAlso (url.Length = 1 OrElse (url(1) <> "/"c AndAlso url(1) <> "\"c))) OrElse
            (url.Length > 1 AndAlso url(0) = "~"c AndAlso url(1) = "/"c))
    End Function

    Private Sub HandleAjaxRequest()
        Dim errors As New List(Of String)
        Dim username As String = Request.Form("UserName")
        Dim password As String = Request.Form("Password")
        Dim rememberMe As String = String.Equals(Request.Form("RememberMe"), "on")
        Dim returnUrl As String = Request.QueryString("ReturnUrl")
        Dim redirect As String = VirtualPathUtility.ToAbsolute("~/")

        Response.ContentType = "application/json"

        AccountHelpers.Require(errors, username, "The User name field is required")
        AccountHelpers.Require(errors, password, "The Password field is required")

        If errors.Count = 0 Then
            If Membership.ValidateUser(username, password) Then
                FormsAuthentication.SetAuthCookie(username, rememberMe)
                If IsLocalUrl(returnUrl) Then
                    redirect = returnUrl
                End If
            Else
                errors.Add("The user name or password provided is incorrect.")
            End If
        End If

        AccountHelpers.WriteJsonResponse(Response, errors, redirect)
    End Sub

End Class