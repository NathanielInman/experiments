Public Class Main
    Const maxSize As Byte = 10
    Private Structure piece
        Public x As Byte
        Public y As Byte
        Public cx As Byte
        Public cy As Byte
    End Structure
    Private Structure point
        Public x As Byte
        Public y As Byte
    End Structure
    Public PAD As New Bitmap(1200, 1200) 'used to draw objects onto
    Public CANVAS As Graphics = Graphics.FromImage(PAD) 'used to import pad and throw onto form
    Public boardSize As Byte
    Public cellSize As Integer
    Private board(maxSize, maxSize) As piece 'stores the location of each piece
    Private current As point
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click
        resizeBoard()
    End Sub
    Private Sub Button2_Click(sender As Object, e As EventArgs) Handles Button2.Click
        scramble()
    End Sub
    Private Sub Initialize(sender As Object, e As EventArgs) Handles MyBase.Load
        current.x = 0 : current.x = 0 'always starts at the top left
        resizeBoard()
    End Sub
    'RESIZE THE BOARD
    Private Sub resizeBoard()
        boardSize = Val(ComboBox1.Text)
        For x = 0 To boardSize - 1 Step 1
            For y = 0 To boardSize - 1 Step 1
                board(x, y).x = x
                board(x, y).y = y
                board(x, y).cx = x
                board(x, y).cy = y
            Next
        Next
        cellSize = 455 / boardSize
        scramble()
    End Sub
    'SCRAMBLE THE BOARD
    Private Sub scramble()
        Randomize()
        Dim tBoard(maxSize, maxSize) As Boolean
        Dim cx As Byte = 0, cy As Byte = 0, tx As Byte = 0, ty As Byte = 0
        Do
            tx = CInt(Math.Floor(Rnd() * boardSize))
            ty = CInt(Math.Floor(Rnd() * boardSize))
            If tBoard(tx, ty) = False Then
                tBoard(tx, ty) = True
                board(tx, ty).cx = cx
                board(tx, ty).cy = cy
                cx += 1
                If cx = boardSize Then
                    cx = 0
                    cy += 1
                End If
            End If
        Loop Until cy = boardSize
        redraw()
    End Sub
    'REPAINT THE BOARD
    Private Sub redraw()
        CANVAS.Clear(Me.BackColor) 'resets the backcolor
        For x = 0 To boardSize - 1 Step 1
            For y = 0 To boardSize - 1 Step 1
                If x = current.x And y = current.y Then
                    CANVAS.FillRectangle(Brushes.DarkSlateGray, 15 + board(x, y).x * cellSize, 15 + board(x, y).y * cellSize, cellSize, cellSize)
                Else
                    Dim fRect As New Rectangle(15 + board(x, y).x * cellSize, 15 + board(x, y).y * cellSize, cellSize, cellSize)
                    Dim tRect As New Rectangle(15 + board(x, y).cx * cellSize, 15 + board(x, y).cy * cellSize, cellSize, cellSize)
                    CANVAS.DrawImage(My.Resources.bg, fRect, tRect, GraphicsUnit.Pixel)
                End If
            Next
        Next
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
    Private Sub Repaint(sender As Object, e As PaintEventArgs) Handles MyBase.Paint
        Me.CreateGraphics.DrawImage(PAD, 0, 0)
    End Sub
    Private Sub mouseDownMove(sender As Object, e As MouseEventArgs) Handles MyBase.MouseDown
        If e.X > current.x * cellSize + cellSize + 15 And current.x < boardSize - 1 Then
            board(current.x, current.y).cx = board(current.x + 1, current.y).cx
            board(current.x, current.y).cy = board(current.x + 1, current.y).cy
            current.x += 1
        ElseIf e.X < current.x * cellSize + 15 And current.x > 0 Then
            board(current.x, current.y).cx = board(current.x - 1, current.y).cx
            board(current.x, current.y).cy = board(current.x - 1, current.y).cy
            current.x -= 1
        ElseIf e.Y > current.y * cellSize + cellSize + 15 And current.y < boardSize - 1 Then
            board(current.x, current.y).cx = board(current.x, current.y + 1).cx
            board(current.x, current.y).cy = board(current.x, current.y + 1).cy
            current.y += 1
        ElseIf e.Y < current.y * cellSize + 15 And current.y > 0 Then
            board(current.x, current.y).cx = board(current.x, current.y - 1).cx
            board(current.x, current.y).cy = board(current.x, current.y - 1).cy
            current.y -= 1
        End If
        redraw()
    End Sub
End Class
