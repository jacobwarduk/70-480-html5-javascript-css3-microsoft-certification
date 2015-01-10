Imports System.Web.Script.Serialization

Public Module AccountHelpers
    Public Sub Require(errors As IList(Of String), fieldValue As String, err As String)
        If String.IsNullOrEmpty(fieldValue) Then
            errors.Add(err)
        End If
    End Sub

    Public Sub WriteJsonResponse(response As HttpResponse, errors As List(Of String))
        WriteJsonResponse(response, New With {.success = errors.Count = 0, .errors = errors})
    End Sub

    Public Sub WriteJsonResponse(response As HttpResponse, errors As List(Of String), redirect As String)
        WriteJsonResponse(response, New With {.success = errors.Count = 0, .errors = errors, .redirect = redirect})
    End Sub

    Public Sub WriteJsonResponse(response As HttpResponse, model As Object)
        Dim serializer As New JavaScriptSerializer()
        Dim json As String = serializer.Serialize(model)
        response.Write(json)
        response.End()
    End Sub
End Module
