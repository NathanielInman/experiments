Public Class Main
    Private BoardWidth As Byte = 10
    Private BoardHeight As Byte = 10
    Private BoardValues(10, 10) As Byte '0 for off, 1 for red, 2 for blue
    Private Player As Byte = 1
    Private numberPlaced As Short = 0
    Public PAD As New Bitmap(1200, 1200) 'used to draw objects onto
    Public CANVAS As Graphics = Graphics.FromImage(PAD) 'used to import pad and throw onto form
    Private Function checkForWin(ByVal x As Byte, y As Byte) As Short
        'horizontal
        Try : If BoardValues(x - 3, y) = BoardValues(x, y) And BoardValues(x - 2, y) = BoardValues(x, y) And BoardValues(x - 1, y) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x - 2, y) = BoardValues(x, y) And BoardValues(x - 1, y) = BoardValues(x, y) And BoardValues(x + 1, y) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x - 1, y) = BoardValues(x, y) And BoardValues(x + 1, y) = BoardValues(x, y) And BoardValues(x + 2, y) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x, y) = BoardValues(x + 1, y) And BoardValues(x + 2, y) = BoardValues(x, y) And BoardValues(x + 3, y) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        'vertical
        Try : If BoardValues(x, y - 3) = BoardValues(x, y) And BoardValues(x, y - 2) = BoardValues(x, y) And BoardValues(x, y - 1) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x, y - 2) = BoardValues(x, y) And BoardValues(x, y - 1) = BoardValues(x, y) And BoardValues(x, y + 1) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x, y - 1) = BoardValues(x, y) And BoardValues(x, y + 1) = BoardValues(x, y) And BoardValues(x, y + 2) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x, y) = BoardValues(x, y + 1) And BoardValues(x, y + 2) = BoardValues(x, y) And BoardValues(x, y + 3) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        'Orthogonally bottomleft to top right
        Try : If BoardValues(x - 3, y - 3) = BoardValues(x, y) And BoardValues(x - 2, y - 2) = BoardValues(x, y) And BoardValues(x - 1, y - 1) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x - 2, y - 2) = BoardValues(x, y) And BoardValues(x - 1, y - 1) = BoardValues(x, y) And BoardValues(x + 1, y + 1) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x - 1, y - 1) = BoardValues(x, y) And BoardValues(x + 1, y + 1) = BoardValues(x, y) And BoardValues(x + 2, y + 2) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x, y) = BoardValues(x + 1, y + 1) And BoardValues(x + 2, y + 2) = BoardValues(x, y) And BoardValues(x + 3, y + 3) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        'Orthogonally bottomright to top left
        Try : If BoardValues(x - 3, y + 3) = BoardValues(x, y) And BoardValues(x - 2, y + 2) = BoardValues(x, y) And BoardValues(x - 1, y + 1) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x - 2, y + 2) = BoardValues(x, y) And BoardValues(x - 1, y + 1) = BoardValues(x, y) And BoardValues(x + 1, y - 1) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x - 1, y + 1) = BoardValues(x, y) And BoardValues(x + 1, y - 1) = BoardValues(x, y) And BoardValues(x + 2, y - 2) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
        Try : If BoardValues(x, y) = BoardValues(x + 1, y - 1) And BoardValues(x + 2, y - 2) = BoardValues(x, y) And BoardValues(x + 3, y - 3) = BoardValues(x, y) And BoardValues(x, y) <> 0 Then
                Return True
            End If : Catch ex As Exception : End Try
                                Return False
    End Function
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        If Val(m.Text) >= 2 Then btn2.Visible = True Else btn2.Visible = False
        If Val(m.Text) >= 3 Then btn3.Visible = True Else btn3.Visible = False
        If Val(m.Text) >= 4 Then btn4.Visible = True Else btn4.Visible = False
        If Val(m.Text) >= 5 Then btn5.Visible = True Else btn5.Visible = False
        If Val(m.Text) >= 6 Then btn6.Visible = True Else btn6.Visible = False
        If Val(m.Text) >= 7 Then btn7.Visible = True Else btn7.Visible = False
        If Val(m.Text) >= 8 Then btn8.Visible = True Else btn8.Visible = False
        If Val(m.Text) >= 9 Then btn9.Visible = True Else btn9.Visible = False
        If Val(m.Text) >= 10 Then btn10.Visible = True Else btn10.Visible = False
        'set the width
        If Val(m.Text) >= 1 And Val(m.Text) <= 10 Then
            BoardWidth = Val(m.Text)
        End If
        'set the heigth
        If Val(n.Text) >= 1 And Val(n.Text) <= 10 Then
            BoardHeight = Val(n.Text)
        End If
        CANVAS.Clear(SystemColors.Control)
        addNew(0, True)
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
    Private Sub Main_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        addNew(0, True) ' initialize the board
    End Sub
    Private Sub addNew(ByVal pos As Byte, Optional ByVal initialize As Boolean = False)
        Dim placed As Boolean = False
        If initialize = False Then
            If Player = 2 Then INFO.Text = "C U R R E N T     T U R N    :   R E D" Else INFO.Text = "C U R R E N T     T U R N    :   B L U E"
            For y = 0 To 9 Step 1
                If BoardValues(pos - 1, y) = 0 Then
                    BoardValues(pos - 1, y) = Player
                    placed = True
                    numberPlaced += 1
                    If Player = 1 Then
                        If checkForWin(pos - 1, y) Then
                            MessageBox.Show("Red Player Wins! Reset/Start a new game or continue as desired.")
                        End If
                        Player = 2
                    Else
                        If checkForWin(pos - 1, y) Then
                            MessageBox.Show("Blue Player Wins! Reset/Start a new game or continue as desired.")
                        End If
                        Player = 1
                    End If
                    Exit For
                End If
            Next
        Else
            placed = True ' not necessaryily true, this is just to avoid the messagebox
        End If
        If placed = False Then
            MessageBox.Show("Cannot place that here.")
        Else
            Dim ty As Integer
            'draw the board
            For x = 0 To BoardWidth - 1 Step 1
                For y = 0 To BoardHeight - 1 Step 1
                    If BoardValues(x, y) = 1 Then ' red
                        ty = (y * -1) + BoardWidth - 1
                        CANVAS.FillRectangle(Brushes.Red, 13 + x * 74, 120 + ty * 57, 65, 48)
                    ElseIf BoardValues(x, y) = 2 Then 'blue
                        ty = (y * -1) + BoardWidth - 1
                        CANVAS.FillRectangle(Brushes.Blue, 13 + x * 74, 120 + ty * 57, 65, 48)
                    Else 'clear
                        ty = (y * -1) + BoardWidth - 1
                        CANVAS.FillRectangle(Brushes.Black, 13 + x * 74, 120 + ty * 57, 65, 48)
                    End If
                Next
            Next
        End If
        If numberPlaced = BoardWidth * BoardHeight Then
            MessageBox.Show("Game over.")
        End If
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub

    Private Sub Repaint(sender As Object, e As PaintEventArgs) Handles MyBase.Paint
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
#Region "Button Clicks"
    Private Sub btn1_Click(sender As Object, e As EventArgs) Handles btn1.Click
        addNew(1)
    End Sub
    Private Sub btn2_Click(sender As Object, e As EventArgs) Handles btn2.Click
        addNew(2)
    End Sub
    Private Sub btn3_Click(sender As Object, e As EventArgs) Handles btn3.Click
        addNew(3)
    End Sub
    Private Sub btn4_Click(sender As Object, e As EventArgs) Handles btn4.Click
        addNew(4)
    End Sub
    Private Sub btn5_Click(sender As Object, e As EventArgs) Handles btn5.Click
        addNew(5)
    End Sub
    Private Sub btn6_Click(sender As Object, e As EventArgs) Handles btn6.Click
        addNew(6)
    End Sub
    Private Sub btn7_Click(sender As Object, e As EventArgs) Handles btn7.Click
        addNew(7)
    End Sub
    Private Sub btn8_Click(sender As Object, e As EventArgs) Handles btn8.Click
        addNew(8)
    End Sub
    Private Sub btn9_Click(sender As Object, e As EventArgs) Handles btn9.Click
        addNew(9)
    End Sub
    Private Sub btn10_Click(sender As Object, e As EventArgs) Handles btn10.Click
        addNew(10)
    End Sub
#End Region
End Class
