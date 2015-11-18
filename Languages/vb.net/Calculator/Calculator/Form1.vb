Public Class Form1
    Private result As Boolean
    Private nextNum As Boolean
    Private evalType As Short
    Private prevValue As Double
#Region "std button click"
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        insertNumber(7)
    End Sub
    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        insertNumber(8)
    End Sub
    Private Sub Button3_Click(sender As Object, e As EventArgs) Handles Button3.Click
        insertNumber(9)
    End Sub
    Private Sub Button4_Click(sender As Object, e As EventArgs) Handles Button4.Click
        insertNumber(4)
    End Sub
    Private Sub Button5_Click(sender As Object, e As EventArgs) Handles Button5.Click
        insertNumber(5)
    End Sub
    Private Sub Button6_Click(sender As Object, e As EventArgs) Handles Button6.Click
        insertNumber(6)
    End Sub
    Private Sub Button7_Click(sender As Object, e As EventArgs) Handles Button7.Click
        insertNumber(1)
    End Sub
    Private Sub Button8_Click(sender As Object, e As EventArgs) Handles Button8.Click
        insertNumber(2)
    End Sub
    Private Sub Button9_Click(sender As Object, e As EventArgs) Handles Button9.Click
        insertNumber(3)
    End Sub
    Private Sub Button10_Click(sender As Object, e As EventArgs) Handles Button10.Click
        insertNumber(0)
    End Sub
    Private Sub Button11_Click(sender As Object, e As EventArgs) Handles Button11.Click
        insertNumber(0, 1)
    End Sub
    Private Sub Button12_Click(sender As Object, e As EventArgs) Handles Button12.Click
        insertNumber(0, 2)
    End Sub
#End Region
#Region "eval button click"
    Private Sub Button13_Click(sender As Object, e As EventArgs) Handles Button13.Click
        evalNumber(0)
    End Sub
    Private Sub Button14_Click(sender As Object, e As EventArgs) Handles Button14.Click
        evalNumber(1)
    End Sub
    Private Sub Button15_Click(sender As Object, e As EventArgs) Handles Button15.Click
        evalNumber(2)
    End Sub
    Private Sub Button17_Click(sender As Object, e As EventArgs) Handles Button17.Click
        evalnumber(3)
    End Sub
    Private Sub Button16_Click(sender As Object, e As EventArgs) Handles Button16.Click
        evalnumber(4)
    End Sub
#End Region
    Private Sub insertNumber(ByVal num As Integer, Optional ByVal type As Short = 0)
        If nextNum = True Then
            resultBox.Text = ""
            nextNum = False
        End If
        If type = 0 Then
            resultBox.Text = Val(resultBox.Text + num.ToString).ToString
        ElseIf type = 1 Then 'decimal point
            resultBox.Text += "."
        ElseIf type = 2 Then 'positive/negative value
            resultBox.Text = (Val(resultBox.Text) * -1).ToString
        End If
    End Sub
    Private Sub evalnumber(ByVal type As Short)
        If type = 0 Then 'divide
            prevValue = Val(resultBox.Text)
            evalType = 0
            nextNum = True
        ElseIf type = 1 Then 'multiply
            prevValue = Val(resultBox.Text)
            evalType = 1
            nextNum = True
        ElseIf type = 2 Then 'addition
            prevValue = Val(resultBox.Text)
            evalType = 2
            nextNum = True
        ElseIf type = 3 Then 'subtraction
            prevValue = Val(resultBox.Text)
            evalType = 3
            nextNum = True
        ElseIf type = 4 Then 'equals
            testResult()
        End If
    End Sub
    Private Sub testResult()
        If evalType = 0 And Val(resultBox.Text) <> 0 Then
            resultBox.Text = (prevValue / Val(resultBox.Text)).ToString
        ElseIf evalType = 1 Then
            resultBox.Text = (prevValue * Val(resultBox.Text)).ToString
        ElseIf evalType = 2 Then
            resultBox.Text = (prevValue + Val(resultBox.Text)).ToString
        ElseIf evalType = 3 Then
            resultBox.Text = (prevValue - Val(resultBox.Text)).ToString
        Else
            resultBox.Text = "Undefined"
        End If
    End Sub
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        result = True 'result changeable
    End Sub

    Private Sub Button18_Click(sender As Object, e As EventArgs) Handles Button18.Click
        nextNum = False
        resultBox.Text = "0"
    End Sub
End Class
