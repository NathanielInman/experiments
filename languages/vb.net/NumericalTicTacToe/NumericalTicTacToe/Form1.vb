Public Class Form1
    Class lastMouse
        Public x As Integer = 0
        Public y As Integer = 0
        Public row As Byte = 0
        Public column As Byte = 0
        Public used As Boolean = False
        Public value As Byte = 0
    End Class
    Private mouse As New lastMouse
    Private GameOver As Boolean = False
    Private PAD As New Bitmap(1200, 1200)
    Private CANVAS As Graphics = Graphics.FromImage(PAD)
    Private CANVASFONT As New Font("Arial", 18)
    Private CANVASFONT2 As New Font("Arial", 32)
    Private CANVASFONT3 As New Font("Arial", 128)
    Private player As Boolean = False
    Private availableNumbers(8) As Boolean
    Private board(2, 2) As Byte
    Function testWin() As Boolean
        If board(0, 0) + board(0, 1) + board(0, 2) = 15 Then
            Return True
        ElseIf board(0, 0) + board(1, 0) + board(2, 0) = 15 Then
            Return True
        ElseIf board(0, 2) + board(1, 2) + board(2, 2) = 15 Then
            Return True
        ElseIf board(2, 2) + board(2, 1) + board(2, 0) = 15 Then
            Return True
        ElseIf board(0, 1) + board(1, 1) + board(2, 1) = 15 Then
            Return True
        ElseIf board(1, 0) + board(1, 1) + board(1, 2) = 15 Then
            Return True
        ElseIf board(0, 0) + board(1, 1) + board(2, 2) = 15 Then
            Return True
        ElseIf board(2, 1) + board(1, 1) + board(0, 2) = 15 Then
            Return True
        End If
    End Function
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load
        drawBoard()
    End Sub
    Private Sub drawBoard()
        Dim barWidth As Integer = 200
        Dim recPos As Integer = 595
        If GameOver = False Then Me.Text = "Numerical Tic Tac Toe - " & If(Not player, "Odd Players Turn", "Even Players Turn")
        CANVAS.Clear(Color.Black)
        CANVAS.FillRectangle(Brushes.DarkGray, 185, 0, 10, Me.Height) 'vertical
        CANVAS.FillRectangle(Brushes.DarkGray, 385, 0, 10, Me.Height) 'vertical
        CANVAS.FillRectangle(Brushes.DarkGray, 0, -18 + CInt(Me.Height / 3), 590, 10) 'horizontal
        CANVAS.FillRectangle(Brushes.DarkGray, 0, -21 + CInt(Me.Height / 3) * 2, 590, 10) 'horizontal
        'top left
        If board(0, 0) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, 0, -10 + CInt(barWidth / 3), barWidth - 15, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, 0, -10 + CInt(barWidth / 3) * 2, barWidth - 15, 3) 'horiontal 2
            CANVAS.FillRectangle(Brushes.Teal, -10 + CInt(barWidth / 3), 0, 3, barWidth - 15) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, -10 + CInt(barWidth / 3) * 2, 0, 3, barWidth - 15) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), 9, 5)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), 5)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, 5)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), 9, CInt(barWidth / 3))
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), CInt(barWidth / 3))
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, CInt(barWidth / 3))
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), 9, CInt(barWidth / 3) * 2)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), CInt(barWidth / 3) * 2)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, CInt(barWidth / 3) * 2)
        Else
            CANVAS.DrawString(CStr(board(0, 0)), CANVASFONT3, Brushes.Gray, 15, 0)
        End If
        'center left
        If board(0, 1) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, 0, barWidth - 10 + CInt(barWidth / 3), barWidth - 15, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, 0, barWidth - 10 + CInt(barWidth / 3) * 2, barWidth - 15, 3) 'horizontal 2
            CANVAS.FillRectangle(Brushes.Teal, -10 + CInt(barWidth / 3), barWidth - 5, 3, barWidth - 10) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, -10 + CInt(barWidth / 3) * 2, barWidth - 5, 3, barWidth - 10) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), 9, barWidth + 5)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), barWidth + 5)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, barWidth + 5)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), 9, barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), 9, barWidth + CInt(barWidth / 3) * 2)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3) * 2)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3) * 2)
        Else
            CANVAS.DrawString(CStr(board(0, 1)), CANVASFONT3, Brushes.Gray, 15, barWidth)
        End If
        'bottom left
        If board(0, 2) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, 0, barWidth * 2 - 14 + CInt(barWidth / 3), barWidth - 15, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, 0, barWidth * 2 - 19 + CInt(barWidth / 3) * 2, barWidth - 15, 3) 'horizontal 2
            CANVAS.FillRectangle(Brushes.Teal, -10 + CInt(barWidth / 3), barWidth * 2 - 5, 3, barWidth - 10) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, -10 + CInt(barWidth / 3) * 2, barWidth * 2 - 5, 3, barWidth - 10) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), 9, barWidth * 2)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), barWidth * 2)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, barWidth * 2)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), 9, barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), 9, barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
        Else
            CANVAS.DrawString(CStr(board(0, 2)), CANVASFONT3, Brushes.Gray, 15, barWidth * 2)
        End If
        'top center
        If board(1, 0) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5, -10 + CInt(barWidth / 3), barWidth - 10, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5, -10 + CInt(barWidth / 3) * 2, barWidth - 10, 3) 'horiontal 2
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5 - 10 + CInt(barWidth / 3), 0, 3, barWidth - 15) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5 - 10 + CInt(barWidth / 3) * 2, 0, 3, barWidth - 15) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), barWidth + 5, 5)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), barWidth + 2 + CInt(barWidth / 3), 5)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), barWidth + CInt(barWidth / 3) * 2, 5)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), barWidth + 5, CInt(barWidth / 3))
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), barWidth + 2 + CInt(barWidth / 3), CInt(barWidth / 3))
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), barWidth + CInt(barWidth / 3) * 2, CInt(barWidth / 3))
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), barWidth + 4, CInt(barWidth / 3) * 2)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), barWidth + 1 + CInt(barWidth / 3), CInt(barWidth / 3) * 2)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), barWidth + CInt(barWidth / 3) * 2, CInt(barWidth / 3) * 2)
        Else
            CANVAS.DrawString(CStr(board(1, 0)), CANVASFONT3, Brushes.Gray, barWidth + 15, 0)
        End If
        'center center
        If board(1, 1) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5, barWidth - 10 + CInt(barWidth / 3), barWidth - 10, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5, barWidth - 10 + CInt(barWidth / 3) * 2, barWidth - 10, 3) 'horizontal 2
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5 - 10 + CInt(barWidth / 3), barWidth - 5, 3, barWidth - 10) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5 - 10 + CInt(barWidth / 3) * 2, barWidth - 5, 3, barWidth - 10) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), barWidth + 9, barWidth + 5)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), barWidth + 9 + CInt(barWidth / 3), barWidth + 5)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth + 5)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), barWidth + 9, barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), barWidth + 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), barWidth + 9, barWidth + CInt(barWidth / 3) * 2)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), barWidth + 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3) * 2)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3) * 2)
        Else
            CANVAS.DrawString(CStr(board(1, 1)), CANVASFONT3, Brushes.Gray, barWidth + 15, barWidth)
        End If
        'bottom center
        If board(1, 2) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5, barWidth * 2 - 14 + CInt(barWidth / 3), barWidth - 10, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5, barWidth * 2 - 19 + CInt(barWidth / 3) * 2, barWidth - 10, 3) 'horizontal 2
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5 - 10 + CInt(barWidth / 3), barWidth * 2 - 5, 3, barWidth - 10) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, barWidth - 5 - 10 + CInt(barWidth / 3) * 2, barWidth * 2 - 5, 3, barWidth - 10) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), barWidth + 9, barWidth * 2)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), barWidth + 9 + CInt(barWidth / 3), barWidth * 2)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth * 2)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), barWidth + 9, barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), barWidth + 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), barWidth + 9, barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), barWidth + 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
        Else
            CANVAS.DrawString(CStr(board(1, 2)), CANVASFONT3, Brushes.Gray, barWidth + 15, barWidth * 2)
        End If
        'top right
        If board(2, 0) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5, -10 + CInt(barWidth / 3), barWidth - 10, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5, -10 + CInt(barWidth / 3) * 2, barWidth - 10, 3) 'horiontal 2
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5 - 10 + CInt(barWidth / 3), 0, 3, barWidth - 15) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5 - 10 + CInt(barWidth / 3) * 2, 0, 3, barWidth - 15) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, 5)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), 5)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, 5)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, CInt(barWidth / 3))
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), CInt(barWidth / 3))
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, CInt(barWidth / 3))
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, CInt(barWidth / 3) * 2)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), CInt(barWidth / 3) * 2)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, CInt(barWidth / 3) * 2)
        Else
            CANVAS.DrawString(CStr(board(2, 0)), CANVASFONT3, Brushes.Gray, barWidth * 2 + 15, 0)
        End If
        'center right
        If board(2, 1) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5, barWidth - 10 + CInt(barWidth / 3), barWidth - 10, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5, barWidth - 10 + CInt(barWidth / 3) * 2, barWidth - 10, 3) 'horizontal 2
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5 - 10 + CInt(barWidth / 3), barWidth - 5, 3, barWidth - 10) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5 - 10 + CInt(barWidth / 3) * 2, barWidth - 5, 3, barWidth - 10) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, barWidth + 5)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth + 5)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth + 5)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3))
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, barWidth + CInt(barWidth / 3) * 2)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3) * 2)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3) * 2)
        Else
            CANVAS.DrawString(CStr(board(2, 1)), CANVASFONT3, Brushes.Gray, barWidth * 2 + 15, barWidth)
        End If
        'bottom right
        If board(2, 2) = 0 Then
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5, barWidth * 2 - 14 + CInt(barWidth / 3), barWidth - 10, 3) 'horizontal
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5, barWidth * 2 - 19 + CInt(barWidth / 3) * 2, barWidth - 10, 3) 'horizontal 2
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5 - 10 + CInt(barWidth / 3), barWidth * 2 - 5, 3, barWidth - 10) 'vertical 
            CANVAS.FillRectangle(Brushes.Teal, barWidth * 2 - 5 - 10 + CInt(barWidth / 3) * 2, barWidth * 2 - 5, 3, barWidth - 10) 'vertical 2
            CANVAS.DrawString("1", CANVASFONT2, If(Not player And Not availableNumbers(0), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, barWidth * 2)
            CANVAS.DrawString("2", CANVASFONT2, If(player And Not availableNumbers(1), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth * 2)
            CANVAS.DrawString("3", CANVASFONT2, If(Not player And Not availableNumbers(2), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth * 2)
            CANVAS.DrawString("4", CANVASFONT2, If(player And Not availableNumbers(3), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("5", CANVASFONT2, If(Not player And Not availableNumbers(4), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("6", CANVASFONT2, If(player And Not availableNumbers(5), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) - 5)
            CANVAS.DrawString("7", CANVASFONT2, If(Not player And Not availableNumbers(6), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9, barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
            CANVAS.DrawString("8", CANVASFONT2, If(player And Not availableNumbers(7), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
            CANVAS.DrawString("9", CANVASFONT2, If(Not player And Not availableNumbers(8), Brushes.Aqua, Brushes.Gray), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) * 2 - 10)
        Else
            CANVAS.DrawString(CStr(board(2, 2)), CANVASFONT3, Brushes.Gray, barWidth * 2 + 15, barWidth * 2)
        End If
        If GameOver = True Then
            Dim c As Color = Color.FromArgb(110, 0, 0, 0)  ' ALPHA = 125 transparency
            Dim b As New SolidBrush(c)
            CANVAS.FillRectangle(b, 0, 0, Me.Width, Me.Height)
            CANVAS.DrawString(If(Not player, "Odd", "Even"), CANVASFONT3, Brushes.Aqua, 85, 0)
            CANVAS.DrawString("Player", CANVASFONT3, Brushes.Aqua, 15, 200)
            CANVAS.DrawString("Wins", CANVASFONT3, Brushes.Aqua, 80, 400)
        End If
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
    Private Sub drawBox(ByVal x, ByVal y)
        Dim barWidth As Integer = 200
        Dim recPos As Integer = 595
        CANVAS.FillRectangle(Brushes.BlanchedAlmond, -15 + CInt(barWidth / 3), -15 + CInt(barWidth / 3), barWidth, 3)
    End Sub
    Private Sub Redraw(sender As Object, e As PaintEventArgs) Handles MyBase.Paint
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
    Private Sub highlightCell(ByRef x As Integer, ByRef y As Integer, ByRef row As Byte, ByRef column As Byte, ByRef value As Byte, ByRef found As Boolean, Optional ByVal dimCell As Boolean = False)
        Dim barWidth As Integer = 200
        If board(0, 0) = 0 And x >= 0 And x <= 57 And y >= 0 And y <= 55 And Not player And Not availableNumbers(0) Then 'r1c1
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, 5) : row = 1 : column = 1 : found = True : value = 1
        ElseIf board(0, 0) = 0 And x >= 60 And x <= 124 And y >= 0 And y <= 55 And player And Not availableNumbers(1) Then 'r1c2
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), 5) : row = 1 : column = 2 : found = True : value = 2
        ElseIf board(0, 0) = 0 And x >= 129 And x <= 183 And y >= 0 And y <= 55 And Not player And Not availableNumbers(2) Then 'r1c3
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, 5) : row = 1 : column = 3 : found = True : value = 3
        ElseIf board(1, 0) = 0 And x >= 194 And x <= 251 And y >= 0 And y <= 55 And Not player And Not availableNumbers(0) Then 'r1c4
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 5, 5) : row = 1 : column = 3 : found = True : value = 1
        ElseIf board(1, 0) = 0 And x >= 254 And x <= 317 And y >= 0 And y <= 55 And player And Not availableNumbers(1) Then 'r1c5
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 2 + CInt(barWidth / 3), 5) : row = 1 : column = 5 : found = True : value = 2
        ElseIf board(1, 0) = 0 And x >= 321 And x <= 382 And y >= 0 And y <= 55 And Not player And Not availableNumbers(2) Then 'r1c6
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + CInt(barWidth / 3) * 2, 5) : row = 1 : column = 6 : found = True : value = 3
        ElseIf board(2, 0) = 0 And x >= 395 And x <= 450 And y >= 0 And y <= 55 And Not player And Not availableNumbers(0) Then 'r1c7
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, 5) : row = 1 : column = 7 : found = True : value = 1
        ElseIf board(2, 0) = 0 And x >= 456 And x <= 518 And y >= 0 And y <= 55 And player And Not availableNumbers(1) Then 'r1c8
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), 5) : row = 1 : column = 8 : found = True : value = 2
        ElseIf board(2, 0) = 0 And x >= 522 And x <= 583 And y >= 0 And y <= 55 And Not player And Not availableNumbers(2) Then 'r1c9
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, 5) : row = 1 : column = 9 : found = True : value = 3
        ElseIf board(0, 0) = 0 And x >= 0 And x <= 57 And y >= 60 And y <= 123 And player And Not availableNumbers(3) Then 'r2c1
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, CInt(barWidth / 3)) : row = 2 : column = 1 : found = True : value = 4
        ElseIf board(0, 0) = 0 And x >= 60 And x <= 124 And y >= 60 And y <= 123 And Not player And Not availableNumbers(4) Then 'r2c2
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), CInt(barWidth / 3)) : row = 2 : column = 2 : found = True : value = 5
        ElseIf board(0, 0) = 0 And x >= 129 And x <= 183 And y >= 60 And y <= 123 And player And Not availableNumbers(5) Then 'r2c3
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, CInt(barWidth / 3)) : row = 2 : column = 3 : found = True : value = 6
        ElseIf board(1, 0) = 0 And x >= 194 And x <= 251 And y >= 60 And y <= 123 And player And Not availableNumbers(3) Then 'r2c4
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 5, CInt(barWidth / 3)) : row = 2 : column = 4 : found = True : value = 4
        ElseIf board(1, 0) = 0 And x >= 254 And x <= 317 And y >= 60 And y <= 123 And Not player And Not availableNumbers(4) Then 'r2c5
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 2 + CInt(barWidth / 3), CInt(barWidth / 3)) : row = 2 : column = 5 : found = True : value = 5
        ElseIf board(1, 0) = 0 And x >= 321 And x <= 382 And y >= 60 And y <= 123 And player And Not availableNumbers(5) Then 'r2c6
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + CInt(barWidth / 3) * 2, CInt(barWidth / 3)) : row = 2 : column = 6 : found = True : value = 6
        ElseIf board(2, 0) = 0 And x >= 395 And x <= 450 And y >= 60 And y <= 123 And player And Not availableNumbers(3) Then 'r2c7
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, CInt(barWidth / 3)) : row = 2 : column = 7 : found = True : value = 4
        ElseIf board(2, 0) = 0 And x >= 456 And x <= 518 And y >= 60 And y <= 123 And Not player And Not availableNumbers(4) Then 'r2c8
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), CInt(barWidth / 3)) : row = 2 : column = 8 : found = True : value = 5
        ElseIf board(2, 0) = 0 And x >= 522 And x <= 583 And y >= 60 And y <= 123 And player And Not availableNumbers(5) Then 'r2c9
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, CInt(barWidth / 3)) : row = 2 : column = 9 : found = True : value = 6
        ElseIf board(0, 0) = 0 And x >= 0 And x <= 57 And y >= 127 And y <= 183 And Not player And Not availableNumbers(6) Then 'r3c1
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, CInt(barWidth / 3) * 2) : row = 3 : column = 1 : found = True : value = 7
        ElseIf board(0, 0) = 0 And x >= 60 And x <= 124 And y >= 127 And y <= 183 And player And Not availableNumbers(7) Then 'r3c2
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), CInt(barWidth / 3) * 2) : row = 3 : column = 2 : found = True : value = 8
        ElseIf board(0, 0) = 0 And x >= 129 And x <= 183 And y >= 127 And y <= 183 And Not player And Not availableNumbers(8) Then 'r3c3
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, CInt(barWidth / 3) * 2) : row = 3 : column = 3 : found = True : value = 9
        ElseIf board(1, 0) = 0 And x >= 194 And x <= 251 And y >= 127 And y <= 183 And Not player And Not availableNumbers(6) Then 'r3c4
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 4, CInt(barWidth / 3) * 2) : row = 3 : column = 4 : found = True : value = 7
        ElseIf board(1, 0) = 0 And x >= 254 And x <= 317 And y >= 127 And y <= 183 And player And Not availableNumbers(7) Then 'r3c5
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 1 + CInt(barWidth / 3), CInt(barWidth / 3) * 2) : row = 3 : column = 5 : found = True : value = 8
        ElseIf board(1, 0) = 0 And x >= 321 And x <= 382 And y >= 127 And y <= 183 And Not player And Not availableNumbers(8) Then 'r3c6
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + CInt(barWidth / 3) * 2, CInt(barWidth / 3) * 2) : row = 3 : column = 6 : found = True : value = 9
        ElseIf board(2, 0) = 0 And x >= 395 And x <= 450 And y >= 127 And y <= 183 And Not player And Not availableNumbers(6) Then 'r3c7
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, CInt(barWidth / 3) * 2) : row = 3 : column = 7 : found = True : value = 7
        ElseIf board(2, 0) = 0 And x >= 456 And x <= 518 And y >= 127 And y <= 183 And player And Not availableNumbers(7) Then 'r3c8
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), CInt(barWidth / 3) * 2) : row = 3 : column = 8 : found = True : value = 8
        ElseIf board(2, 0) = 0 And x >= 522 And x <= 583 And y >= 127 And y <= 183 And Not player And Not availableNumbers(8) Then 'r3c9
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, CInt(barWidth / 3) * 2) : row = 3 : column = 9 : found = True : value = 9
        ElseIf board(0, 1) = 0 And x >= 0 And x <= 57 And y >= 195 And y <= 255 And Not player And Not availableNumbers(0) Then 'r4c1
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, barWidth + 5) : row = 4 : column = 1 : found = True : value = 1
        ElseIf board(0, 1) = 0 And x >= 60 And x <= 124 And y >= 195 And y <= 255 And player And Not availableNumbers(1) Then 'r4c2
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), barWidth + 5) : row = 4 : column = 2 : found = True : value = 2
        ElseIf board(0, 1) = 0 And x >= 129 And x <= 183 And y >= 195 And y <= 255 And Not player And Not availableNumbers(2) Then 'r4c3
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, barWidth + 5) : row = 4 : column = 3 : found = True : value = 3
        ElseIf board(1, 1) = 0 And x >= 194 And x <= 251 And y >= 195 And y <= 255 And Not player And Not availableNumbers(0) Then 'r4c4
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9, barWidth + 5) : row = 4 : column = 4 : found = True : value = 1
        ElseIf board(1, 1) = 0 And x >= 254 And x <= 317 And y >= 195 And y <= 255 And player And Not availableNumbers(1) Then 'r4c5
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9 + CInt(barWidth / 3), barWidth + 5) : row = 4 : column = 5 : found = True : value = 2
        ElseIf board(1, 1) = 0 And x >= 321 And x <= 382 And y >= 195 And y <= 255 And Not player And Not availableNumbers(2) Then 'r4c6
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth + 5) : row = 4 : column = 6 : found = True : value = 3
        ElseIf board(2, 1) = 0 And x >= 395 And x <= 450 And y >= 195 And y <= 255 And Not player And Not availableNumbers(0) Then 'r4c7
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, barWidth + 5) : row = 4 : column = 7 : found = True : value = 1
        ElseIf board(2, 1) = 0 And x >= 456 And x <= 518 And y >= 195 And y <= 255 And player And Not availableNumbers(1) Then 'r4c8
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth + 5) : row = 4 : column = 8 : found = True : value = 2
        ElseIf board(2, 1) = 0 And x >= 522 And x <= 583 And y >= 195 And y <= 255 And Not player And Not availableNumbers(2) Then 'r4c9
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth + 5) : row = 4 : column = 9 : found = True : value = 3
        ElseIf board(0, 1) = 0 And x >= 0 And x <= 57 And y >= 260 And y <= 322 And player And Not availableNumbers(3) Then 'r5c1
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, barWidth + CInt(barWidth / 3)) : row = 5 : column = 1 : found = True : value = 4
        ElseIf board(0, 1) = 0 And x >= 60 And x <= 124 And y >= 260 And y <= 322 And Not player And Not availableNumbers(4) Then 'r5c2
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3)) : row = 5 : column = 2 : found = True : value = 5
        ElseIf board(0, 1) = 0 And x >= 129 And x <= 183 And y >= 260 And y <= 322 And player And Not availableNumbers(5) Then 'r5c3
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3)) : row = 5 : column = 3 : found = True : value = 6
        ElseIf board(1, 1) = 0 And x >= 194 And x <= 251 And y >= 260 And y <= 322 And player And Not availableNumbers(3) Then 'r5c4
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9, barWidth + CInt(barWidth / 3)) : row = 5 : column = 4 : found = True : value = 4
        ElseIf board(1, 1) = 0 And x >= 254 And x <= 317 And y >= 260 And y <= 322 And Not player And Not availableNumbers(4) Then 'r5c5
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3)) : row = 5 : column = 5 : found = True : value = 5
        ElseIf board(1, 1) = 0 And x >= 321 And x <= 382 And y >= 260 And y <= 322 And player And Not availableNumbers(5) Then 'r5c6
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3)) : row = 5 : column = 6 : found = True : value = 6
        ElseIf board(2, 1) = 0 And x >= 395 And x <= 450 And y >= 260 And y <= 322 And player And Not availableNumbers(3) Then 'r5c7
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, barWidth + CInt(barWidth / 3)) : row = 6 : column = 7 : found = True : value = 4
        ElseIf board(2, 1) = 0 And x >= 456 And x <= 518 And y >= 260 And y <= 322 And Not player And Not availableNumbers(4) Then 'r5c8
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3)) : row = 5 : column = 8 : found = True : value = 5
        ElseIf board(2, 1) = 0 And x >= 522 And x <= 583 And y >= 260 And y <= 322 And player And Not availableNumbers(5) Then 'r5c9
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3)) : row = 5 : column = 9 : found = True : value = 6
        ElseIf board(0, 1) = 0 And x >= 0 And x <= 57 And y >= 327 And y <= 383 And Not player And Not availableNumbers(6) Then 'r6c1
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, barWidth + CInt(barWidth / 3) * 2) : row = 6 : column = 1 : found = True : value = 7
        ElseIf board(0, 1) = 0 And x >= 60 And x <= 124 And y >= 327 And y <= 383 And player And Not availableNumbers(7) Then 'r6c2
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3) * 2) : row = 6 : column = 2 : found = True : value = 8
        ElseIf board(0, 1) = 0 And x >= 129 And x <= 183 And y >= 327 And y <= 383 And Not player And Not availableNumbers(8) Then 'r6c3
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3) * 2) : row = 7 : column = 3 : found = True : value = 9
        ElseIf board(1, 1) = 0 And x >= 194 And x <= 251 And y >= 327 And y <= 383 And Not player And Not availableNumbers(6) Then 'r6c4
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9, barWidth + CInt(barWidth / 3) * 2) : row = 6 : column = 4 : found = True : value = 7
        ElseIf board(1, 1) = 0 And x >= 254 And x <= 317 And y >= 327 And y <= 383 And player And Not availableNumbers(7) Then 'r6c5
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3) * 2) : row = 6 : column = 5 : found = True : value = 8
        ElseIf board(1, 1) = 0 And x >= 321 And x <= 382 And y >= 327 And y <= 383 And Not player And Not availableNumbers(8) Then 'r6c6
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3) * 2) : row = 6 : column = 6 : found = True : value = 9
        ElseIf board(2, 1) = 0 And x >= 395 And x <= 450 And y >= 327 And y <= 383 And Not player And Not availableNumbers(6) Then 'r6c7
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, barWidth + CInt(barWidth / 3) * 2) : row = 6 : column = 7 : found = True : value = 7
        ElseIf board(2, 1) = 0 And x >= 456 And x <= 518 And y >= 327 And y <= 383 And player And Not availableNumbers(7) Then 'r6c8
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth + CInt(barWidth / 3) * 2) : row = 7 : column = 8 : found = True : value = 8
        ElseIf board(2, 1) = 0 And x >= 522 And x <= 583 And y >= 327 And y <= 383 And Not player And Not availableNumbers(8) Then 'r6c9
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth + CInt(barWidth / 3) * 2) : row = 6 : column = 9 : found = True : value = 9
        ElseIf board(0, 2) = 0 And x >= 0 And x <= 57 And y >= 396 And y <= 451 And Not player And Not availableNumbers(0) Then 'r7c1
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, barWidth * 2) : row = 7 : column = 1 : found = True : value = 1
        ElseIf board(0, 2) = 0 And x >= 60 And x <= 124 And y >= 396 And y <= 451 And player And Not availableNumbers(1) Then 'r7c2
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), barWidth * 2) : row = 7 : column = 2 : found = True : value = 2
        ElseIf board(0, 2) = 0 And x >= 129 And x <= 183 And y >= 396 And y <= 451 And Not player And Not availableNumbers(2) Then 'r7c3
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, barWidth * 2) : row = 7 : column = 3 : found = True : value = 3
        ElseIf board(1, 2) = 0 And x >= 194 And x <= 251 And y >= 396 And y <= 451 And Not player And Not availableNumbers(0) Then 'r7c4
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9, barWidth * 2) : row = 7 : column = 4 : found = True : value = 1
        ElseIf board(1, 2) = 0 And x >= 254 And x <= 317 And y >= 396 And y <= 451 And player And Not availableNumbers(1) Then 'r7c5
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9 + CInt(barWidth / 3), barWidth * 2) : row = 7 : column = 5 : found = True : value = 2
        ElseIf board(1, 2) = 0 And x >= 321 And x <= 382 And y >= 396 And y <= 451 And Not player And Not availableNumbers(2) Then 'r7c6
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth * 2) : row = 7 : column = 6 : found = True : value = 3
        ElseIf board(2, 2) = 0 And x >= 395 And x <= 450 And y >= 396 And y <= 451 And Not player And Not availableNumbers(0) Then 'r7c7
            CANVAS.DrawString("1", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, barWidth * 2) : row = 7 : column = 7 : found = True : value = 1
        ElseIf board(2, 2) = 0 And x >= 456 And x <= 518 And y >= 396 And y <= 451 And player And Not availableNumbers(1) Then 'r7c8
            CANVAS.DrawString("2", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth * 2) : row = 7 : column = 8 : found = True : value = 2
        ElseIf board(2, 2) = 0 And x >= 522 And x <= 583 And y >= 396 And y <= 451 And Not player And Not availableNumbers(2) Then 'r7c9
            CANVAS.DrawString("3", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth * 2) : row = 7 : column = 9 : found = True : value = 3
        ElseIf board(0, 2) = 0 And x >= 0 And x <= 57 And y >= 457 And y <= 514 And player And Not availableNumbers(3) Then 'r8c1
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 1 : found = True : value = 4
        ElseIf board(0, 2) = 0 And x >= 60 And x <= 124 And y >= 457 And y <= 514 And Not player And Not availableNumbers(4) Then 'r8c2
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 2 : found = True : value = 5
        ElseIf board(0, 2) = 0 And x >= 129 And x <= 183 And y >= 457 And y <= 514 And player And Not availableNumbers(5) Then 'r8c3
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 3 : found = True : value = 6
        ElseIf board(1, 2) = 0 And x >= 194 And x <= 251 And y >= 457 And y <= 514 And player And Not availableNumbers(3) Then 'r8c4
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9, barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 4 : found = True : value = 4
        ElseIf board(1, 2) = 0 And x >= 254 And x <= 317 And y >= 457 And y <= 514 And Not player And Not availableNumbers(4) Then 'r8c5
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 5 : found = True : value = 4
        ElseIf board(1, 2) = 0 And x >= 321 And x <= 382 And y >= 457 And y <= 514 And player And Not availableNumbers(5) Then 'r8c6
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 6 : found = True : value = 6
        ElseIf board(2, 2) = 0 And x >= 395 And x <= 450 And y >= 457 And y <= 514 And player And Not availableNumbers(3) Then 'r8c7
            CANVAS.DrawString("4", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 7 : found = True : value = 4
        ElseIf board(2, 2) = 0 And x >= 456 And x <= 518 And y >= 457 And y <= 514 And Not player And Not availableNumbers(4) Then 'r8c8
            CANVAS.DrawString("5", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 8 : found = True : value = 5
        ElseIf board(2, 2) = 0 And x >= 522 And x <= 583 And y >= 457 And y <= 514 And player And Not availableNumbers(5) Then 'r8c9
            CANVAS.DrawString("6", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) - 5) : row = 8 : column = 9 : found = True : value = 6
        ElseIf board(0, 2) = 0 And x >= 0 And x <= 57 And y >= 518 And y <= 573 And Not player And Not availableNumbers(6) Then 'r9c1
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9, barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 1 : found = True : value = 7
        ElseIf board(0, 2) = 0 And x >= 60 And x <= 124 And y >= 518 And y <= 573 And player And Not availableNumbers(7) Then 'r9c2
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 2 : found = True : value = 8
        ElseIf board(0, 2) = 0 And x >= 129 And x <= 183 And y >= 518 And y <= 573 And Not player And Not availableNumbers(8) Then 'r9c3
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 3 : found = True : value = 9
        ElseIf board(1, 2) = 0 And x >= 194 And x <= 251 And y >= 518 And y <= 573 And Not player And Not availableNumbers(6) Then 'r9c4
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9, barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 4 : found = True : value = 7
        ElseIf board(1, 2) = 0 And x >= 254 And x <= 317 And y >= 518 And y <= 573 And player And Not availableNumbers(7) Then 'r9c5
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 5 : found = True : value = 8
        ElseIf board(1, 2) = 0 And x >= 321 And x <= 382 And y >= 518 And y <= 573 And Not player And Not availableNumbers(8) Then 'r9c6
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth + 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 6 : found = True : value = 9
        ElseIf board(2, 2) = 0 And x >= 395 And x <= 450 And y >= 518 And y <= 573 And Not player And Not availableNumbers(6) Then 'r9c7
            CANVAS.DrawString("7", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9, barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 7 : found = True : value = 7
        ElseIf board(2, 2) = 0 And x >= 456 And x <= 518 And y >= 518 And y <= 573 And player And Not availableNumbers(7) Then 'r9c8
            CANVAS.DrawString("8", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 9 + CInt(barWidth / 3), barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 8 : found = True : value = 8
        ElseIf board(2, 2) = 0 And x >= 522 And x <= 583 And y >= 518 And y <= 573 And Not player And Not availableNumbers(8) Then 'r9c9
            CANVAS.DrawString("9", CANVASFONT2, If(dimCell, Brushes.Aqua, Brushes.White), barWidth * 2 + 4 + CInt(barWidth / 3) * 2, barWidth * 2 + CInt(barWidth / 3) * 2 - 10) : row = 9 : column = 9 : found = True : value = 9
        Else
            found = False
        End If
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
    Private Sub MouseMoved(sender As Object, e As MouseEventArgs) Handles MyBase.MouseMove
        If GameOver = False Then
            Dim x As Integer = e.X, y As Integer = e.Y
            Dim row, column, value As Byte
            Dim found As Boolean = False
            highlightCell(x, y, row, column, value, found)
            If row <> mouse.row And mouse.used = True Or column <> mouse.column And mouse.used = True Or found = False And mouse.used = True Then
                highlightCell(mouse.x, mouse.y, mouse.row, mouse.column, value, found, True)
                found = False : mouse.used = False
            End If
            If found = True Then
                mouse.used = True
                mouse.row = row : mouse.column = column : mouse.x = x : mouse.y = y : mouse.value = value
            End If
        End If
    End Sub
    Private Sub MouseClicked(sender As Object, e As MouseEventArgs) Handles MyBase.MouseDown
        If GameOver = False Then
            If mouse.used = True Then
                If mouse.column >= 1 And mouse.column <= 3 And mouse.row >= 1 And mouse.row <= 3 Then 'r1c1
                    board(0, 0) = mouse.value : availableNumbers(mouse.value - 1) = True
                ElseIf mouse.column >= 1 And mouse.column <= 3 And mouse.row >= 4 And mouse.row <= 6 Then 'r2c1
                    board(0, 1) = mouse.value : availableNumbers(mouse.value - 1) = True
                ElseIf mouse.column >= 1 And mouse.column <= 3 And mouse.row >= 7 And mouse.row <= 9 Then 'r3c1
                    board(0, 2) = mouse.value : availableNumbers(mouse.value - 1) = True
                ElseIf mouse.column >= 4 And mouse.column <= 6 And mouse.row >= 1 And mouse.row <= 3 Then 'r1c2
                    board(1, 0) = mouse.value : availableNumbers(mouse.value - 1) = True
                ElseIf mouse.column >= 4 And mouse.column <= 6 And mouse.row >= 4 And mouse.row <= 6 Then 'r2c2
                    board(1, 1) = mouse.value : availableNumbers(mouse.value - 1) = True
                ElseIf mouse.column >= 4 And mouse.column <= 6 And mouse.row >= 7 And mouse.row <= 9 Then 'r3c2
                    board(1, 2) = mouse.value : availableNumbers(mouse.value - 1) = True
                ElseIf mouse.column >= 7 And mouse.column <= 9 And mouse.row >= 1 And mouse.row <= 3 Then 'r1c3
                    board(2, 0) = mouse.value : availableNumbers(mouse.value - 1) = True
                ElseIf mouse.column >= 7 And mouse.column <= 9 And mouse.row >= 4 And mouse.row <= 6 Then 'r2c3
                    board(2, 1) = mouse.value : availableNumbers(mouse.value - 1) = True
                ElseIf mouse.column >= 7 And mouse.column <= 9 And mouse.row >= 7 And mouse.row <= 9 Then 'r3c3
                    board(2, 2) = mouse.value : availableNumbers(mouse.value - 1) = True
                End If
                If testWin() = True Then
                    GameOver = True
                    Me.Text = "Numerical Tic Tac Toe - " & If(Not player, "Odd Player Wins", "Even Player Wins")
                End If
                If player And GameOver = False Then
                    player = False
                ElseIf GameOver = False Then
                    player = True
                End If
                drawBoard()
            End If
        End If
    End Sub
End Class
