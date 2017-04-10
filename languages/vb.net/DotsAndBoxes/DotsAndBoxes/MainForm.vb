Public Class MainForm
    '#################################################
    '### Dots and Boxes by Nathaniel Inman         ###
    '### ----------------------------------------- ###
    '### Made completely using GDI+                ###
    '### Assignment 5                              ###
    '#################################################
#Region "Declarations"
    '###########################
    '### Public Declarations ###
    '###########################
    Public PAD As New Bitmap(1200, 1200) 'used to draw objects onto
    Public CANVAS As Graphics = Graphics.FromImage(PAD) 'used to import pad and throw onto form
    '############################
    '### Private Declarations ###
    '############################
    Private baseFont As New Font("Arial", 24)
    Private redScore As Integer = 0
    Private blueScore As Integer = 0
    Private dotsNum As Integer = 5
    Private player As Byte = 0
    Private dotsSize As Byte = 20
    Private dotsHalf As Byte = CByte(dotsSize / 2)
    Private dotsLastXpos As Integer = 0, dotsLastX As Integer = 0, dotsLastXpos2 As Integer = 0, dotsLastX2 As Integer = 0
    Private dotsLastYpos As Integer = 0, dotsLastY As Integer = 0, dotsLastYpos2 As Integer = 0, dotsLastY2 As Integer = 0
    Private linesHorizontal(dotsNum, dotsNum) As Byte
    Private linesVertical(dotsNum, dotsNum) As Byte
    Private boxes(dotsNum - 1, dotsNum - 1) As Byte
    Private myFont As New Font("Courier New", 18)
#End Region
#Region "Subroutines"
    Private Sub MainForm_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        'display the image
        Me.CANVAS.Clear(Color.Black) 'clear the form color
        Dim tmpX, tmpY As Integer
        For yCounter As Byte = 1 To dotsNum Step 1
            For xCounter As Byte = 1 To dotsNum Step 1
                tmpX = CInt(Me.Width / (dotsNum + 1) * xCounter) - 20
                tmpY = CInt((Me.Height - 35) / (dotsNum + 1) * yCounter) - 5
                Me.CANVAS.FillRectangle(Brushes.Gray, tmpX, tmpY, dotsSize, dotsSize)
                Me.CANVAS.FillEllipse(Brushes.Black, tmpX + CInt((dotsSize - dotsHalf) / 2), tmpY + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
            Next xCounter
        Next yCounter
        drawRound()
    End Sub
    Private Sub drawRound()
        Dim drawFormat As New StringFormat
        drawFormat.Alignment = StringAlignment.Center
        Me.CANVAS.FillRectangle(Brushes.Black, 0, 0, Me.Width, 35)
        Me.CANVAS.DrawString("Red: " & CStr(redScore), myFont, Brushes.White, 25, 0)
        Me.CANVAS.DrawString("Blue: " & CStr(blueScore), myFont, Brushes.White, Me.Width - 18 * 9, 0)
        If redScore + blueScore = (dotsNum - 1) * (dotsNum - 1) Then
            Me.CANVAS.DrawString("-GAME OVER-", myFont, Brushes.Yellow, Me.Width / 2, 0, drawFormat)
        Else
            If player = 0 Then
                Me.CANVAS.DrawString("RED TURN", myFont, Brushes.Red, Me.Width / 2, 0, drawFormat)
            Else
                Me.CANVAS.DrawString("BLUE TURN", myFont, Brushes.Blue, Me.Width / 2, 0, drawFormat)
            End If
        End If
    End Sub
    Private Sub Repaint(sender As Object, e As PaintEventArgs) Handles MyBase.Paint
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
    Private Sub moveMouse(sender As Object, e As MouseEventArgs) Handles MyBase.MouseMove
        Dim tmpX, tmpY, tmpX2, tmpY2 As Integer
        'now draw the next
        For ycounter As Byte = 1 To dotsNum Step 1
            For xcounter As Byte = 1 To dotsNum Step 1
                tmpX = CInt(Me.Width / (dotsNum + 1) * xcounter) - 20
                tmpY = CInt((Me.Height - 35) / (dotsNum + 1) * ycounter) - 5
                tmpX2 = CInt(Me.Width / (dotsNum + 1) * (xcounter + 1)) - 20
                tmpY2 = CInt((Me.Height - 35) / (dotsNum + 1) * (ycounter + 1)) - 5
                If e.X > tmpX And e.X < tmpX + dotsSize And e.Y > tmpY And e.Y < tmpY2 + dotsSize And ycounter <> dotsNum And linesVertical(xcounter, ycounter) = 0 Then 'vertical line
                    'clear the last position first
                    If dotsLastXpos <> 0 And dotsLastYpos <> 0 Then
                        If dotsLastX <> dotsLastX2 And linesHorizontal(dotsLastX, dotsLastY) = 0 Then
                            Me.CANVAS.FillRectangle(Brushes.Black, dotsLastXpos + dotsSize, dotsLastYpos, dotsLastXpos2 - dotsLastXpos - dotsSize, dotsSize)
                        ElseIf dotsLastX <> dotsLastX2 And linesHorizontal(dotsLastX, dotsLastY) = 1 Then
                            Me.CANVAS.FillRectangle(Brushes.Red, dotsLastXpos + dotsSize, dotsLastYpos, dotsLastXpos2 - dotsLastXpos - dotsSize, dotsSize)
                        ElseIf dotsLastX <> dotsLastX2 And linesHorizontal(dotsLastX, dotsLastY) = 2 Then
                            Me.CANVAS.FillRectangle(Brushes.Blue, dotsLastXpos + dotsSize, dotsLastYpos, dotsLastXpos2 - dotsLastXpos - dotsSize, dotsSize)
                        End If
                        If dotsLastY <> dotsLastY2 And linesVertical(dotsLastX, dotsLastY) = 0 Then
                            Me.CANVAS.FillRectangle(Brushes.Black, dotsLastXpos, dotsLastYpos + dotsSize, dotsSize, dotsLastYpos2 - dotsLastYpos - dotsSize)
                        ElseIf dotsLastY <> dotsLastY2 And linesVertical(dotsLastX, dotsLastY) = 1 Then
                            Me.CANVAS.FillRectangle(Brushes.Red, dotsLastXpos, dotsLastYpos + dotsSize, dotsSize, dotsLastYpos2 - dotsLastYpos - dotsSize)
                        ElseIf dotsLastY <> dotsLastY2 And linesVertical(dotsLastX, dotsLastY) = 2 Then
                            Me.CANVAS.FillRectangle(Brushes.Blue, dotsLastXpos, dotsLastYpos + dotsSize, dotsSize, dotsLastYpos2 - dotsLastYpos - dotsSize)
                        End If
                        Me.CANVAS.FillRectangle(Brushes.Gray, dotsLastXpos, dotsLastYpos, dotsSize, dotsSize)
                        Me.CANVAS.FillEllipse(Brushes.Black, dotsLastXpos + CInt((dotsSize - dotsHalf) / 2), dotsLastYpos + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
                        If dotsLastY2 <= dotsNum Then
                            Me.CANVAS.FillRectangle(Brushes.Gray, dotsLastXpos, dotsLastYpos2, dotsSize, dotsSize)
                            Me.CANVAS.FillEllipse(Brushes.Black, dotsLastXpos + CInt((dotsSize - dotsHalf) / 2), dotsLastYpos2 + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
                        End If
                        If dotsLastX2 <= dotsNum Then
                            Me.CANVAS.FillRectangle(Brushes.Gray, dotsLastXpos2, dotsLastYpos, dotsSize, dotsSize)
                            Me.CANVAS.FillEllipse(Brushes.Black, dotsLastXpos2 + CInt((dotsSize - dotsHalf) / 2), dotsLastYpos + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
                        End If
                        If dotsLastX2 <= dotsNum And dotsLastY2 <= dotsNum Then
                            Me.CANVAS.FillRectangle(Brushes.Gray, dotsLastXpos2, dotsLastYpos2, dotsSize, dotsSize)
                            Me.CANVAS.FillEllipse(Brushes.Black, dotsLastXpos2 + CInt((dotsSize - dotsHalf) / 2), dotsLastYpos2 + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
                        End If
                        Me.CANVAS.FillRectangle(Brushes.Black, Me.Width - 30, 0, 30, Me.Height)
                        Me.CANVAS.FillRectangle(Brushes.Black, 0, Me.Height - 50, Me.Width, 50)
                    End If
                    'now draw the new
                    Me.CANVAS.FillRectangle(Brushes.Yellow, tmpX, tmpY + dotsSize, dotsSize, tmpY2 - tmpY - dotsSize)
                    Me.CreateGraphics.DrawImage(PAD, 0, 0)
                    dotsLastXpos = tmpX : dotsLastYpos = tmpY : dotsLastX = xcounter : dotsLastY = ycounter
                    dotsLastXpos2 = tmpX2 : dotsLastYpos2 = tmpY2 : dotsLastX2 = xcounter : dotsLastY2 = ycounter + 1
                    Exit Sub
                ElseIf e.X > tmpX And e.X < tmpX2 + dotsSize And e.Y > tmpY And e.Y < tmpY + dotsSize And xcounter <> dotsNum And linesHorizontal(xcounter, ycounter) = 0 Then 'horizontal line
                    'clear the last position first
                    If dotsLastXpos <> 0 And dotsLastYpos <> 0 Then
                        If dotsLastX <> dotsLastX2 And linesHorizontal(dotsLastX, dotsLastY) = 0 Then
                            Me.CANVAS.FillRectangle(Brushes.Black, dotsLastXpos + CInt(dotsSize / 2), dotsLastYpos, dotsLastXpos2 - dotsLastXpos, dotsSize)
                        ElseIf dotsLastX <> dotsLastX2 And linesHorizontal(dotsLastX, dotsLastY) = 1 Then
                            Me.CANVAS.FillRectangle(Brushes.Red, dotsLastXpos + CInt(dotsSize / 2), dotsLastYpos, dotsLastXpos2 - dotsLastXpos, dotsSize)
                        ElseIf dotsLastX <> dotsLastX2 And linesHorizontal(dotsLastX, dotsLastY) = 2 Then
                            Me.CANVAS.FillRectangle(Brushes.Blue, dotsLastXpos + CInt(dotsSize / 2), dotsLastYpos, dotsLastXpos2 - dotsLastXpos, dotsSize)
                        End If
                        If dotsLastY <> dotsLastY2 And linesVertical(dotsLastX, dotsLastY) = 0 Then
                            Me.CANVAS.FillRectangle(Brushes.Black, dotsLastXpos, dotsLastYpos + CInt(dotsSize / 2), dotsSize, dotsLastYpos2 - dotsLastYpos)
                        ElseIf dotsLastY <> dotsLastY2 And linesVertical(dotsLastX, dotsLastY) = 1 Then
                            Me.CANVAS.FillRectangle(Brushes.Red, dotsLastXpos, dotsLastYpos + CInt(dotsSize / 2), dotsSize, dotsLastYpos2 - dotsLastYpos)
                        ElseIf dotsLastY <> dotsLastY2 And linesVertical(dotsLastX, dotsLastY) = 2 Then
                            Me.CANVAS.FillRectangle(Brushes.Blue, dotsLastXpos, dotsLastYpos + CInt(dotsSize / 2), dotsSize, dotsLastYpos2 - dotsLastYpos)
                        End If
                        Me.CANVAS.FillRectangle(Brushes.Gray, dotsLastXpos, dotsLastYpos, dotsSize, dotsSize)
                        Me.CANVAS.FillEllipse(Brushes.Black, dotsLastXpos + CInt((dotsSize - dotsHalf) / 2), dotsLastYpos + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
                        If dotsLastY2 <= dotsNum Then
                            Me.CANVAS.FillRectangle(Brushes.Gray, dotsLastXpos, dotsLastYpos2, dotsSize, dotsSize)
                            Me.CANVAS.FillEllipse(Brushes.Black, dotsLastXpos + CInt((dotsSize - dotsHalf) / 2), dotsLastYpos2 + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
                        End If
                        If dotsLastX2 <= dotsNum Then
                            Me.CANVAS.FillRectangle(Brushes.Gray, dotsLastXpos2, dotsLastYpos, dotsSize, dotsSize)
                            Me.CANVAS.FillEllipse(Brushes.Black, dotsLastXpos2 + CInt((dotsSize - dotsHalf) / 2), dotsLastYpos + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
                        End If
                        If dotsLastX2 <= dotsNum And dotsLastY2 <= dotsNum Then
                            Me.CANVAS.FillRectangle(Brushes.Gray, dotsLastXpos2, dotsLastYpos2, dotsSize, dotsSize)
                            Me.CANVAS.FillEllipse(Brushes.Black, dotsLastXpos2 + CInt((dotsSize - dotsHalf) / 2), dotsLastYpos2 + CInt((dotsSize - dotsHalf) / 2), dotsHalf, dotsHalf)
                        End If
                        Me.CANVAS.FillRectangle(Brushes.Black, Me.Width - 30, 0, 30, Me.Height)
                        Me.CANVAS.FillRectangle(Brushes.Black, 0, Me.Height - 50, Me.Width, 50)
                    End If
                    'now draw the new
                    Me.CANVAS.FillRectangle(Brushes.Yellow, tmpX + dotsSize, tmpY, tmpX2 - tmpX - dotsSize, dotsSize)
                    Me.CreateGraphics.DrawImage(PAD, 0, 0)
                    dotsLastXpos = tmpX : dotsLastYpos = tmpY : dotsLastX = xcounter : dotsLastY = ycounter
                    dotsLastXpos2 = tmpX2 : dotsLastYpos2 = tmpY2 : dotsLastX2 = xcounter + 1 : dotsLastY2 = ycounter
                    Exit Sub
                End If
            Next xcounter
        Next ycounter
    End Sub
    Private Sub moveClick(sender As Object, e As MouseEventArgs) Handles MyBase.MouseDown
        Dim tmpXm, tmpXr, tmpXp, tmpYm, tmpYr, tmpYp As Integer
        Dim success As Boolean = False
        Dim scored As Boolean = False
        tmpXm = CInt(Me.Width / (dotsNum + 1) * (dotsLastX - 1)) - 20
        tmpXr = CInt(Me.Width / (dotsNum + 1) * dotsLastX) - 20
        tmpXp = CInt(Me.Width / (dotsNum + 1) * (dotsLastX + 1)) - 20
        tmpYm = CInt((Me.Height - 35) / (dotsNum + 1) * (dotsLastY - 1)) - 5
        tmpYr = CInt((Me.Height - 35) / (dotsNum + 1) * dotsLastY) - 5
        tmpYp = CInt((Me.Height - 35) / (dotsNum + 1) * (dotsLastY + 1)) - 5
        'fill the position clicked
        If dotsLastXpos <> 0 And dotsLastYpos <> 0 Then
            If player = 0 Then
                If dotsLastY <> dotsLastY2 Then
                    linesVertical(dotsLastX, dotsLastY) = 1
                    Me.CANVAS.FillRectangle(Brushes.Red, dotsLastXpos, dotsLastYpos + dotsSize, dotsSize, dotsLastYpos2 - dotsLastYpos - dotsSize)
                End If
                If dotsLastX <> dotsLastX2 Then
                    linesHorizontal(dotsLastX, dotsLastY) = 1
                    Me.CANVAS.FillRectangle(Brushes.Red, dotsLastXpos + dotsSize, dotsLastYpos, dotsLastXpos2 - dotsLastXpos - dotsSize, dotsSize)
                End If
                success = True
            Else
                If dotsLastY <> dotsLastY2 Then
                    linesVertical(dotsLastX, dotsLastY) = 2
                    Me.CANVAS.FillRectangle(Brushes.Blue, dotsLastXpos, dotsLastYpos + dotsSize, dotsSize, dotsLastYpos2 - dotsLastYpos - dotsSize)
                End If
                If dotsLastX <> dotsLastX2 Then
                    linesHorizontal(dotsLastX, dotsLastY) = 2
                    Me.CANVAS.FillRectangle(Brushes.Blue, dotsLastXpos + dotsSize, dotsLastYpos, dotsLastXpos2 - dotsLastXpos - dotsSize, dotsSize)
                End If
                success = True
            End If
        End If
        If success = True Then
            'compute any scores or filled squares after filled before redrawing
            If dotsLastY > 0 And dotsLastX < dotsNum And dotsLastX <> dotsLastX2 Then
                'top right
                If linesHorizontal(dotsLastX, dotsLastY) <> 0 And linesHorizontal(dotsLastX, dotsLastY - 1) <> 0 And linesVertical(dotsLastX, dotsLastY - 1) <> 0 And linesVertical(dotsLastX + 1, dotsLastY - 1) <> 0 Then
                    If player = 0 Then redScore += 1 Else blueScore += 1
                    scored = True
                    Me.CANVAS.FillRectangle(If(player = 0, Brushes.Red, Brushes.Blue), tmpXr + dotsSize, tmpYm + dotsSize, tmpXp - tmpXr - dotsSize, tmpYr - tmpYm - dotsSize)
                End If
            End If
            If dotsLastY < dotsNum And dotsLastX < dotsNum Then
                'bottom right
                If linesHorizontal(dotsLastX, dotsLastY) <> 0 And linesHorizontal(dotsLastX, dotsLastY + 1) <> 0 And linesVertical(dotsLastX, dotsLastY) <> 0 And linesVertical(dotsLastX + 1, dotsLastY) <> 0 Then
                    If player = 0 Then redScore += 1 Else blueScore += 1
                    scored = True
                    Me.CANVAS.FillRectangle(If(player = 0, Brushes.Red, Brushes.Blue), tmpXr + dotsSize, tmpYr + dotsSize, tmpXp - tmpXr - dotsSize, tmpYp - tmpYr - dotsSize)
                End If
            End If
            If dotsLastX > 0 And dotsLastY < dotsNum And dotsLastY <> dotsLastY2 Then
                'bottom left
                If linesHorizontal(dotsLastX - 1, dotsLastY) <> 0 And linesHorizontal(dotsLastX - 1, dotsLastY + 1) <> 0 And linesVertical(dotsLastX, dotsLastY) <> 0 And linesVertical(dotsLastX - 1, dotsLastY) <> 0 Then
                    If player = 0 Then redScore += 1 Else blueScore += 1
                    scored = True
                    Me.CANVAS.FillRectangle(If(player = 0, Brushes.Red, Brushes.Blue), tmpXm + dotsSize, tmpYr + dotsSize, tmpXr - tmpXm - dotsSize, tmpYp - tmpYr - dotsSize)
                End If
            End If
            'only change player if player didn't score on this round
            If scored = False Then
                If player = 0 Then player += 1 Else player = 0
            End If
            'now draw the scores and round
            drawRound()
            dotsLastY = 0 : dotsLastX = 0 : dotsLastXpos = 0 : dotsLastYpos = 0
        End If
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
#End Region
End Class
