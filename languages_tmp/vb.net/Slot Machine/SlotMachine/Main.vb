'************************************************************
'************************************************************
'****
'****    Slot machine was made by Nathaniel Inman on 2-10-2013
'****
'************************************************************
'************************************************************
Public Class Main
    '###########################
    '### initialization of constants
    '###########################
    Const Seven = 1
    Const Watermelon = 2
    Const Lemon = 3
    Const Orange = 4
    Const Cherry = 5
    Const Grape = 6
    Const Bell = 7
    Const Apple = 8
    Const Bar = 9
    '###########################
    '### initialization public variables
    '###########################
    Dim digitalFont As New Font("Courier New", 42)
    Public PAD As New Bitmap(1200, 1200) 'used to draw objects onto
    Public CANVAS As Graphics = Graphics.FromImage(PAD) 'used to import pad and throw onto form
    Public Money As Integer = 38200
    Public Winnings As Integer = 0
    Public MaxBet As Boolean = True
    Public MaxBetAmount As Short = 90
    Public MinBetAmount As Short = 50
#Region "Buttons"
    Private Sub spinOver(sender As Object, e As EventArgs) Handles RollBtn.MouseEnter, RollBtn.MouseUp
        RollBtn.BackgroundImage = My.Resources.SpinBtnOver
    End Sub
    Private Sub spinOut(sender As Object, e As EventArgs) Handles RollBtn.MouseLeave, Me.MouseLeave
        RollBtn.BackgroundImage = My.Resources.SpinBtn
    End Sub
    Private Sub spinDown(sender As Object, e As MouseEventArgs) Handles RollBtn.MouseDown
        rollTheMachine()
        RollBtn.BackgroundImage = My.Resources.SpinBtnDown
    End Sub
    Private Sub betOneOver(sender As Object, e As EventArgs) Handles BetOneBtn.MouseEnter, BetOneBtn.MouseUp
        BetOneBtn.BackgroundImage = My.Resources.BetOneBtnOver
    End Sub
    Private Sub betOneOut(sender As Object, e As EventArgs) Handles BetOneBtn.MouseLeave, Me.MouseLeave
        BetOneBtn.BackgroundImage = My.Resources.BetOneBtn
    End Sub
    Private Sub betOneDown(sender As Object, e As EventArgs) Handles BetOneBtn.MouseDown
        MaxBet = False
        updateBetText()
    End Sub
    Private Sub betMaxOver(sender As Object, e As EventArgs) Handles BetMaxBtn.MouseEnter, BetMaxBtn.MouseUp
        BetMaxBtn.BackgroundImage = My.Resources.BetMaxBtnOver
    End Sub
    Private Sub betMaxOut(sender As Object, e As EventArgs) Handles BetMaxBtn.MouseLeave, Me.MouseLeave
        BetMaxBtn.BackgroundImage = My.Resources.BetMaxBtn
    End Sub
    Private Sub betMaxDown(sender As Object, e As EventArgs) Handles BetMaxBtn.MouseDown
        MaxBet = True
        updateBetText()
    End Sub
#End Region
    Function getReelNumber(ByVal reelNum As Short, ByVal reelPos As Short) As Integer
        If reelNum = 1 Then
            If reelPos = 1 Then : Return Seven
            ElseIf reelPos = 2 Then : Return Watermelon
            ElseIf reelPos = 3 Then : Return Bell
            ElseIf reelPos = 4 Then : Return Apple
            ElseIf reelPos = 5 Then : Return Bar
            ElseIf reelPos = 6 Then : Return Orange
            ElseIf reelPos = 7 Then : Return Cherry
            ElseIf reelPos = 8 Then : Return Grape
            ElseIf reelPos = 9 Then : Return Lemon
            ElseIf reelPos = 10 Then : Return Watermelon
            ElseIf reelPos = 11 Then : Return Watermelon
            ElseIf reelPos = 12 Then : Return Orange
            ElseIf reelPos = 13 Then : Return Grape
            ElseIf reelPos = 14 Then : Return Cherry
            ElseIf reelPos = 15 Then : Return Watermelon
            ElseIf reelPos = 16 Then : Return Bell
            ElseIf reelPos = 17 Then : Return Orange
            ElseIf reelPos = 18 Then : Return Watermelon
            End If
        ElseIf reelNum = 2 Then
            If reelPos = 1 Then : Return Seven
            ElseIf reelPos = 2 Then : Return Lemon
            ElseIf reelPos = 3 Then : Return Lemon
            ElseIf reelPos = 4 Then : Return Watermelon
            ElseIf reelPos = 5 Then : Return Orange
            ElseIf reelPos = 6 Then : Return Bar
            ElseIf reelPos = 7 Then : Return Bell
            ElseIf reelPos = 8 Then : Return Cherry
            ElseIf reelPos = 9 Then : Return Apple
            ElseIf reelPos = 10 Then : Return Bell
            ElseIf reelPos = 11 Then : Return Grape
            ElseIf reelPos = 12 Then : Return Bar
            ElseIf reelPos = 13 Then : Return Bell
            ElseIf reelPos = 14 Then : Return Watermelon
            ElseIf reelPos = 15 Then : Return Lemon
            ElseIf reelPos = 16 Then : Return Cherry
            ElseIf reelPos = 17 Then : Return Cherry
            ElseIf reelPos = 18 Then : Return Orange
            End If
        ElseIf reelNum = 3 Then
            If reelPos = 1 Then : Return Seven
            ElseIf reelPos = 2 Then : Return Cherry
            ElseIf reelPos = 3 Then : Return Cherry
            ElseIf reelPos = 4 Then : Return Grape
            ElseIf reelPos = 5 Then : Return Bar
            ElseIf reelPos = 6 Then : Return Orange
            ElseIf reelPos = 7 Then : Return Watermelon
            ElseIf reelPos = 8 Then : Return Grape
            ElseIf reelPos = 9 Then : Return Bell
            ElseIf reelPos = 10 Then : Return Orange
            ElseIf reelPos = 11 Then : Return Cherry
            ElseIf reelPos = 12 Then : Return Watermelon
            ElseIf reelPos = 13 Then : Return Cherry
            ElseIf reelPos = 14 Then : Return Apple
            ElseIf reelPos = 15 Then : Return Bell
            ElseIf reelPos = 16 Then : Return Apple
            ElseIf reelPos = 17 Then : Return Grape
            ElseIf reelPos = 18 Then : Return Orange
            End If
        End If
        Return 20
    End Function
    Private Sub rollTheMachine()
        '###########################
        '### initialization of variables
        '###########################
        Dim x1 As Short = 38, y1 As Short = 49, w As Short = 160, h As Short = 76
        Dim r1b, r2b, r3b As Integer
        Dim srcRect, plaRect, ReeRect As Rectangle
        Dim reelNumber As Short
        '###########################
        '### Reel 1
        '###########################
        '# make sure to spin reel 1 and use the subsequent sections of reel one for the next 2 parts
        reelNumber = CInt(Math.Ceiling(Rnd() * 18))
        plaRect = New Rectangle(x1, y1, w, h)
        srcRect = New Rectangle(1, 1, 395, 179)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel1, plaRect, ReeRect, GraphicsUnit.Pixel)
        reelNumber += 1 : If reelNumber > 18 Then reelNumber = 1
        r1b = getReelNumber(1, reelNumber)
        plaRect = New Rectangle(x1, y1 + h + 2, w, h)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel1, plaRect, ReeRect, GraphicsUnit.Pixel)
        reelNumber += 1 : If reelNumber > 18 Then reelNumber = 1
        plaRect = New Rectangle(x1, y1 + 2 * h + 4, w, h)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel1, plaRect, ReeRect, GraphicsUnit.Pixel)
        '###########################
        '### Reel 2
        '###########################
        '# make sure to spin reel 2 and use the subsequent sections of reel two for the next 2 parts
        reelNumber = CInt(Math.Ceiling(Rnd() * 18))
        plaRect = New Rectangle(x1 + 182, y1, w, h)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel2, plaRect, ReeRect, GraphicsUnit.Pixel)
        reelNumber += 1 : If reelNumber > 18 Then reelNumber = 1
        r2b = getReelNumber(2, reelNumber)
        plaRect = New Rectangle(x1 + 182, y1 + h + 2, w, h)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel2, plaRect, ReeRect, GraphicsUnit.Pixel)
        reelNumber += 1 : If reelNumber > 18 Then reelNumber = 1
        plaRect = New Rectangle(x1 + 182, y1 + 2 * h + 4, w, h)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel2, plaRect, ReeRect, GraphicsUnit.Pixel)
        '###########################
        '### Reel 3
        '###########################
        '# make sure to spin reel 3 and use teh subsequent sections of reel three for the next 2 parts
        reelNumber = CInt(Math.Ceiling(Rnd() * 18))
        plaRect = New Rectangle(x1 + 364, y1, w, h)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel3, plaRect, ReeRect, GraphicsUnit.Pixel)
        reelNumber += 1 : If reelNumber > 18 Then reelNumber = 1
        r3b = getReelNumber(3, reelNumber)
        plaRect = New Rectangle(x1 + 364, y1 + h + 2, w, h)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel3, plaRect, ReeRect, GraphicsUnit.Pixel)
        reelNumber += 1 : If reelNumber > 18 Then reelNumber = 1
        plaRect = New Rectangle(x1 + 364, y1 + 2 * h + 4, w, h)
        ReeRect = New Rectangle(1, 179 * reelNumber - 179, 180, 180)
        CANVAS.DrawImage(My.Resources.Reel3, plaRect, ReeRect, GraphicsUnit.Pixel)
        '###########################
        '### Money amounts
        '###########################
        '# make sure to clear the previous amount first
        '##############################################################
        '### PAYOUT RULES
        '##############################################################
        '### Min Bet r2         Max Bet r2
        '### ----------         ----------
        '### 4000               10000   Seven
        '### 1000               1500    Bar
        '### 600                900     All bells
        '### 400                600     All cherries
        '### 300                450     Any 3 other
        '### 60                 90      Any 2 cherries		
        '### 20                 30      Any 2 other
        '### 10                 15      Any bell
        '### 2                  3       Any cherry
        '##############################################################
        If MaxBet = True Then
            If r1b = r2b = r3b Then 'three of a kind row 2
                If r1b = Seven Then : Winnings += 10000
                ElseIf r1b = Bar Then : Winnings += 1500
                ElseIf r1b = Bell Then : Winnings += 900
                ElseIf r1b = Cherry Then : Winnings += 600
                Else : Winnings += 450 : End If
            ElseIf r1b = r2b Or r1b = r3b Or r2b = r3b Then 'two of a kind row 2
                Winnings += 30
            ElseIf r1b = Bell Or r2b = Bell Or r3b = Bell Then
                Winnings += 15
            ElseIf r1b = Cherry Or r2b = Cherry Or r3b = Cherry Then
                Winnings += 3
            End If
        Else
            If r1b = r2b = r3b Then 'three of a kind row 2
                If r1b = Seven Then : Winnings += 4000
                ElseIf r1b = Bar Then : Winnings += 1000
                ElseIf r1b = Bell Then : Winnings += 600
                ElseIf r1b = Cherry Then : Winnings += 400
                Else : Winnings += 300 : End If
            ElseIf r1b = r2b Or r1b = r3b Or r2b = r3b Then 'two of a kind row 2
                Winnings += 20
            ElseIf r1b = Bell Or r2b = Bell Or r3b = Bell Then
                Winnings += 10
            ElseIf r1b = Cherry Or r2b = Cherry Or r3b = Cherry Then
                Winnings = 2
            End If
        End If
        If Winnings = 0 Then
            If MaxBet = True Then
                Money -= MaxBetAmount
            Else
                Money -= MinBetAmount
            End If
        Else
            Money += Winnings
        End If
        CANVAS.FillRectangle(Brushes.Black, 30, 355, 180, 50)
            CANVAS.DrawString(Money.ToString, digitalFont, Brushes.Green, 30, 355)
            If MaxBet = True Then
                CANVAS.DrawString(MaxBetAmount.ToString, digitalFont, Brushes.Green, 250, 355)
            Else
                CANVAS.DrawString(MinBetAmount.ToString, digitalFont, Brushes.Green, 250, 355)
            End If
            CANVAS.FillRectangle(Brushes.Black, 365, 355, 180, 50)
            CANVAS.DrawString(Winnings.ToString, digitalFont, Brushes.Green, 365, 355)
            Winnings = 0
            redraw()
    End Sub
    Private Sub redraw()
        '###########################
        '### Draw the complete canvas
        '###########################
        MachineBox.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
    Private Sub updateBetText()
        CANVAS.FillRectangle(Brushes.Black, 253, 355, 70, 50)
        If MaxBet = True Then
            CANVAS.DrawString(MaxBetAmount.ToString, digitalFont, Brushes.Green, 250, 355)
        Else
            CANVAS.DrawString(MinBetAmount.ToString, digitalFont, Brushes.Green, 250, 355)
        End If
        redraw()
    End Sub
    Private Sub showMachine(sender As Object, e As EventArgs) Handles Timer1.Tick
        If PictureBox1.Visible = True Then
            MachineBox.Image = My.Resources.Machine
            BetMaxBtn.Visible = True
            BetOneBtn.Visible = True
            RollBtn.Visible = True
            PictureBox1.Visible = False
            Timer1.Interval = 30
        Else
            Timer1.Enabled = False
            rollTheMachine()
            redraw()
        End If
    End Sub
End Class
