Public Class MainForm
#Region "Declarations"
    '#################
    '### CONSTANTS ###
    '#################
    Const d1x As Short = 100 'used for dice 1 x position
    Const d1y As Short = 58  'used for dice 1 y position
    Const d2x As Short = 250 'used for dice 2 x position
    Const d2y As Short = 58  'used for dice 2 y position
    '###########################
    '### Public Declarations ###
    '###########################
    Public round As Short             'keep track of the current round
    Public point As Short             'keep track of the current point
    Public gameNumber As Short = 0       'keep track of the number of games played
    Public gameOver As Boolean = True 'make sure the game is reset appropriately
    Public PAD As New Bitmap(1200, 1200) 'used to draw objects onto
    Public CANVAS As Graphics = Graphics.FromImage(PAD) 'used to import pad and throw onto form
#End Region
#Region "Subroutines"
    '###############################
    '### First Roll Button Click ###
    '###############################
    Private Sub firstRollBtn_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles firstRollBtn.Click
        'dimension the variables
        Dim i1 As Image = My.Resources.d1, i2 As Image = My.Resources.d1 'initialize the dice with snake eyes in case of error
        Dim diceOneRoll As Integer = 1 + CInt(Math.Ceiling(Rnd() * 6))
        Dim diceTwoRoll As Integer = 1 + CInt(Math.Ceiling(Rnd() * 6))
        Dim curRoll As Integer = diceOneRoll + diceTwoRoll
        'reset the appropriate values if it's a new game
        If gameOver = True Then
            gameNumber += 1
            firstRollBtn.Text = "Next Roll"
            round = 1
            roundLabel.Text = 1
            gameOver = False
        Else
            round += 1
            roundLabel.Text = round
        End If
        'rolled the dice, use the variables
        'set the correct image for die 1
        If diceOneRoll = 1 Then : i1 = My.Resources.d1 : ElseIf diceOneRoll = 2 Then : i1 = My.Resources.d2
        ElseIf diceOneRoll = 3 Then : i1 = My.Resources.d3 : ElseIf diceOneRoll = 4 Then : i1 = My.Resources.d4
        ElseIf diceOneRoll = 5 Then : i1 = My.Resources.d5 : ElseIf diceOneRoll = 6 Then : i1 = My.Resources.d6 : End If
        'set the correct image for die 2
        If diceTwoRoll = 1 Then : i2 = My.Resources.d1 : ElseIf diceTwoRoll = 2 Then : i2 = My.Resources.d2
        ElseIf diceTwoRoll = 3 Then : i2 = My.Resources.d3 : ElseIf diceTwoRoll = 4 Then : i2 = My.Resources.d4
        ElseIf diceTwoRoll = 5 Then : i2 = My.Resources.d5 : ElseIf diceTwoRoll = 6 Then : i2 = My.Resources.d6 : End If
        'display the image
        Me.CANVAS.Clear(Color.FromKnownColor(KnownColor.Control))
        Me.CANVAS.DrawImage(i1, 10, 10, 250, 250)
        Me.CANVAS.DrawImage(i2, 275, 10, 250, 250)
        'adjust the point as it's set
        If round = 1 Then
            If curRoll = 2 Or curRoll = 3 Or curRoll = 12 Then
                ColorOutput.SND("/ROpening drop was " & CStr(curRoll) & ", You lose!")
                pointLabel.Text = "None" : endGame()
            ElseIf curRoll = 7 Then
                ColorOutput.SND("/YOpened with Natural, /Gyou win!")
                pointLabel.Text = "None" : endGame()
            ElseIf curRoll = 11 Then
                ColorOutput.SND("/YRolled a Yo to open, /Gyou win!")
                pointLabel.Text = "None" : endGame()
            Else
                pointLabel.Text = curRoll
                point = curRoll
                ColorOutput.SND("Point is set, click on next roll")
            End If
        Else
            If curRoll = point Then
                If curRoll = 2 Then
                    ColorOutput.SND("/ZHit Point, /CSnake Eyes/Z, /Gyou win!") : endGame()
                ElseIf curRoll = 3 Then
                    ColorOutput.SND("/ZHit Point, /YAce Deuce/Z, /Gyou win!") : endGame()
                ElseIf diceOneRoll = 2 And diceTwoRoll = 2 Then
                    ColorOutput.SND("/ZHit Point, /MHard Four/Z, /Gyou win!") : endGame()
                ElseIf curRoll = 4 Then
                    ColorOutput.SND("/ZHit Point, /YEasy Four/Z, /Gyou win!") : endGame()
                ElseIf curRoll = 5 Then
                    ColorOutput.SND("/ZHit Point, /YFever Five/Z, /Gyou win!") : endGame()
                ElseIf diceOneRoll = 3 And diceTwoRoll = 3 Then
                    ColorOutput.SND("/ZHit Point, /MHard Six/Z, /Gyou win!") : endGame()
                ElseIf curRoll = 6 Then
                    ColorOutput.SND("/ZHit Point, /YEasy Six/Z, /Gyou win!") : endGame()
                ElseIf diceOneRoll = 4 And diceTwoRoll = 4 Then
                    ColorOutput.SND("/ZHit Point, /MHard Eight/Z, /Gyou win!") : endGame()
                ElseIf curRoll = 8 Then
                    ColorOutput.SND("/ZHit Point, /YEasy Eight/Z, /Gyou win!") : endGame()
                ElseIf curRoll = 9 Then
                    ColorOutput.SND("/ZHit Point, /YNina/Z, /Gyou win!") : endGame()
                ElseIf diceOneRoll = 5 And diceTwoRoll = 5 Then
                    ColorOutput.SND("/ZHit Point, /MHard Ten/Z, /Gyou win!") : endGame()
                ElseIf curRoll = 10 Then
                    ColorOutput.SND("/ZHit Point, /YEasy Ten/Z, /Gyou win!") : endGame()
                ElseIf curRoll = 12 Then
                    ColorOutput.SND("/ZHit Point, /CBoxcars/Z, /Gyou win!") : endGame()
                Else
                    ColorOutput.SND("/GYou win!") : endGame()
                End If
            ElseIf curRoll = 7 Then
                ColorOutput.SND("/RDropped a Natural before point, you lose!") : endGame()
            Else
                ColorOutput.SND("Nothing interesting, click on next roll")
            End If
        End If
        'refresh the graphics
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub

    Private Sub endGame()
        firstRollBtn.Text = "New Game"
        gameOver = True
    End Sub

    Private Sub MainForm_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        Me.CANVAS.DrawImage(My.Resources.craps_pass_line, 10, 10) 'title screen
        SND("/ZWelcome to Craps : Pass Line, written by /GNathaniel Inman/Z. This window will assist " & _
            "in directing you on your next options. To the left of each output in this window will " & _
            "be an indicator for /C[/Wgame number/C, /Wround number/C]/Z. This game simulates putting chips on " & _
            "only the pass line of a craps table. Enjoy!", False)
    End Sub

    Private Sub Repaint(sender As Object, e As PaintEventArgs) Handles MyBase.Paint
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
#End Region
End Class
