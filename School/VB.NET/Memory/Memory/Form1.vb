Public Class Form1
    Dim panelnum As Byte = 1 'determines whether we're looking for panel one or two at the moment
    Dim panelreg1 As Byte = 0
    Dim panelreg2 As Byte = 0
    Dim panel1 As String = 0
    Dim panel2 As String = 0
    Dim panel1value As Byte = 0
    Dim roundnum As Byte = 1
    Private Sub clickedPanel(sender As Object, e As EventArgs) Handles p9.Click, p8.Click, p7.Click, p6.Click, p5.Click, p4.Click, p36.Click, p35.Click, p34.Click, p33.Click, p32.Click, p31.Click, p30.Click, p3.Click, p29.Click, p28.Click, p27.Click, p26.Click, p25.Click, p24.Click, p23.Click, p22.Click, p21.Click, p20.Click, p2.Click, p19.Click, p18.Click, p17.Click, p16.Click, p15.Click, p14.Click, p13.Click, p12.Click, p11.Click, p10.Click, p1.Click
        If sender Is p1 Then : i1.Visible = True : If panelnum = 1 Then : panelreg1 = 1 : panel1 = i1.Text : Else : panelreg2 = 1 : panel2 = i1.Text : End If
        End If : If sender Is p2 Then : i2.Visible = True : If panelnum = 1 Then : panelreg1 = 2 : panel1 = i2.Text : Else : panelreg2 = 2 : panel2 = i2.Text : End If
        End If : If sender Is p3 Then : i3.Visible = True : If panelnum = 1 Then : panelreg1 = 3 : panel1 = i3.Text : Else : panelreg2 = 3 : panel2 = i3.Text : End If
        End If : If sender Is p4 Then : i4.Visible = True : If panelnum = 1 Then : panelreg1 = 4 : panel1 = i4.Text : Else : panelreg2 = 4 : panel2 = i4.Text : End If
        End If : If sender Is p5 Then : i5.Visible = True : If panelnum = 1 Then : panelreg1 = 5 : panel1 = i5.Text : Else : panelreg2 = 5 : panel2 = i5.Text : End If
        End If : If sender Is p6 Then : i6.Visible = True : If panelnum = 1 Then : panelreg1 = 6 : panel1 = i6.Text : Else : panelreg2 = 6 : panel2 = i6.Text : End If
        End If : If sender Is p7 Then : i7.Visible = True : If panelnum = 1 Then : panelreg1 = 7 : panel1 = i7.Text : Else : panelreg2 = 7 : panel2 = i7.Text : End If
        End If : If sender Is p8 Then : i8.Visible = True : If panelnum = 1 Then : panelreg1 = 8 : panel1 = i8.Text : Else : panelreg2 = 8 : panel2 = i8.Text : End If
        End If : If sender Is p9 Then : i9.Visible = True : If panelnum = 1 Then : panelreg1 = 9 : panel1 = i9.Text : Else : panelreg2 = 9 : panel2 = i9.Text : End If
        End If : If sender Is p10 Then : i10.Visible = True : If panelnum = 1 Then : panelreg1 = 10 : panel1 = i10.Text : Else : panelreg2 = 10 : panel2 = i10.Text : End If
        End If : If sender Is p11 Then : i11.Visible = True : If panelnum = 1 Then : panelreg1 = 11 : panel1 = i11.Text : Else : panelreg2 = 11 : panel2 = i11.Text : End If
        End If : If sender Is p12 Then : i12.Visible = True : If panelnum = 1 Then : panelreg1 = 12 : panel1 = i12.Text : Else : panelreg2 = 12 : panel2 = i12.Text : End If
        End If : If sender Is p13 Then : i13.Visible = True : If panelnum = 1 Then : panelreg1 = 13 : panel1 = i13.Text : Else : panelreg2 = 13 : panel2 = i13.Text : End If
        End If : If sender Is p14 Then : i14.Visible = True : If panelnum = 1 Then : panelreg1 = 14 : panel1 = i14.Text : Else : panelreg2 = 14 : panel2 = i14.Text : End If
        End If : If sender Is p15 Then : i15.Visible = True : If panelnum = 1 Then : panelreg1 = 15 : panel1 = i15.Text : Else : panelreg2 = 15 : panel2 = i15.Text : End If
        End If : If sender Is p16 Then : i16.Visible = True : If panelnum = 1 Then : panelreg1 = 16 : panel1 = i16.Text : Else : panelreg2 = 16 : panel2 = i16.Text : End If
        End If : If sender Is p17 Then : i17.Visible = True : If panelnum = 1 Then : panelreg1 = 17 : panel1 = i17.Text : Else : panelreg2 = 17 : panel2 = i17.Text : End If
        End If : If sender Is p18 Then : i18.Visible = True : If panelnum = 1 Then : panelreg1 = 18 : panel1 = i18.Text : Else : panelreg2 = 18 : panel2 = i18.Text : End If
        End If : If sender Is p19 Then : i19.Visible = True : If panelnum = 1 Then : panelreg1 = 19 : panel1 = i19.Text : Else : panelreg2 = 19 : panel2 = i19.Text : End If
        End If : If sender Is p20 Then : i20.Visible = True : If panelnum = 1 Then : panelreg1 = 20 : panel1 = i20.Text : Else : panelreg2 = 20 : panel2 = i20.Text : End If
        End If : If sender Is p21 Then : i21.Visible = True : If panelnum = 1 Then : panelreg1 = 21 : panel1 = i21.Text : Else : panelreg2 = 21 : panel2 = i21.Text : End If
        End If : If sender Is p22 Then : i22.Visible = True : If panelnum = 1 Then : panelreg1 = 22 : panel1 = i22.Text : Else : panelreg2 = 22 : panel2 = i22.Text : End If
        End If : If sender Is p23 Then : i23.Visible = True : If panelnum = 1 Then : panelreg1 = 23 : panel1 = i23.Text : Else : panelreg2 = 23 : panel2 = i23.Text : End If
        End If : If sender Is p24 Then : i24.Visible = True : If panelnum = 1 Then : panelreg1 = 24 : panel1 = i24.Text : Else : panelreg2 = 24 : panel2 = i24.Text : End If
        End If : If sender Is p25 Then : i25.Visible = True : If panelnum = 1 Then : panelreg1 = 25 : panel1 = i25.Text : Else : panelreg2 = 25 : panel2 = i25.Text : End If
        End If : If sender Is p26 Then : i26.Visible = True : If panelnum = 1 Then : panelreg1 = 26 : panel1 = i26.Text : Else : panelreg2 = 26 : panel2 = i26.Text : End If
        End If : If sender Is p27 Then : i27.Visible = True : If panelnum = 1 Then : panelreg1 = 27 : panel1 = i27.Text : Else : panelreg2 = 27 : panel2 = i27.Text : End If
        End If : If sender Is p28 Then : i28.Visible = True : If panelnum = 1 Then : panelreg1 = 28 : panel1 = i28.Text : Else : panelreg2 = 28 : panel2 = i28.Text : End If
        End If : If sender Is p29 Then : i29.Visible = True : If panelnum = 1 Then : panelreg1 = 29 : panel1 = i29.Text : Else : panelreg2 = 29 : panel2 = i29.Text : End If
        End If : If sender Is p30 Then : i30.Visible = True : If panelnum = 1 Then : panelreg1 = 30 : panel1 = i30.Text : Else : panelreg2 = 30 : panel2 = i30.Text : End If
        End If : If sender Is p31 Then : i31.Visible = True : If panelnum = 1 Then : panelreg1 = 31 : panel1 = i31.Text : Else : panelreg2 = 31 : panel2 = i31.Text : End If
        End If : If sender Is p32 Then : i32.Visible = True : If panelnum = 1 Then : panelreg1 = 32 : panel1 = i32.Text : Else : panelreg2 = 32 : panel2 = i32.Text : End If
        End If : If sender Is p33 Then : i33.Visible = True : If panelnum = 1 Then : panelreg1 = 33 : panel1 = i33.Text : Else : panelreg2 = 33 : panel2 = i33.Text : End If
        End If : If sender Is p34 Then : i34.Visible = True : If panelnum = 1 Then : panelreg1 = 34 : panel1 = i34.Text : Else : panelreg2 = 34 : panel2 = i34.Text : End If
        End If : If sender Is p35 Then : i35.Visible = True : If panelnum = 1 Then : panelreg1 = 35 : panel1 = i35.Text : Else : panelreg2 = 35 : panel2 = i35.Text : End If
        End If : If sender Is p36 Then : i36.Visible = True : If panelnum = 1 Then : panelreg1 = 36 : panel1 = i36.Text : Else : panelreg2 = 36 : panel2 = i36.Text : End If
        End If
        If panelnum = 1 Then
            panelnum = 2
        ElseIf panelnum = 2 And panel1 <> panel2 Then
            resetVisible(panelreg1) : resetVisible(panelreg2)
            roundnum += 1
            panelnum = 1 : Label36.Text = "Round: " & CStr(roundnum)
        ElseIf panelnum = 2 Then
            panelnum = 1 : roundnum += 1 : Label36.Text = "Round: " & CStr(roundnum)
        End If
    End Sub
    Sub resetVisible(ByVal num As Byte)
        If num = 1 Then
            i1.Visible = False
        ElseIf num = 2 Then
            i2.Visible = False
        ElseIf num = 3 Then
            i3.Visible = False
        ElseIf num = 4 Then
            i4.Visible = False
        ElseIf num = 5 Then
            i5.Visible = False
        ElseIf num = 6 Then
            i6.Visible = False
        ElseIf num = 7 Then
            i7.Visible = False
        ElseIf num = 8 Then
            i8.Visible = False
        ElseIf num = 9 Then
            i9.Visible = False
        ElseIf num = 10 Then
            i10.Visible = False
        ElseIf num = 11 Then
            i11.Visible = False
        ElseIf num = 12 Then
            i12.Visible = False
        ElseIf num = 13 Then
            i13.Visible = False
        ElseIf num = 14 Then
            i14.Visible = False
        ElseIf num = 15 Then
            i15.Visible = False
        ElseIf num = 16 Then
            i16.Visible = False
        ElseIf num = 17 Then
            i17.Visible = False
        ElseIf num = 18 Then
            i18.Visible = False
        ElseIf num = 19 Then
            i19.Visible = False
        ElseIf num = 20 Then
            i20.Visible = False
        ElseIf num = 21 Then
            i21.Visible = False
        ElseIf num = 22 Then
            i22.Visible = False
        ElseIf num = 23 Then
            i23.Visible = False
        ElseIf num = 24 Then
            i24.Visible = False
        ElseIf num = 25 Then
            i25.Visible = False
        ElseIf num = 26 Then
            i26.Visible = False
        ElseIf num = 27 Then
            i27.Visible = False
        ElseIf num = 28 Then
            i28.Visible = False
        ElseIf num = 29 Then
            i29.Visible = False
        ElseIf num = 30 Then
            i30.Visible = False
        ElseIf num = 31 Then
            i31.Visible = False
        ElseIf num = 32 Then
            i32.Visible = False
        ElseIf num = 33 Then
            i33.Visible = False
        ElseIf num = 34 Then
            i34.Visible = False
        ElseIf num = 35 Then
            i35.Visible = False
        ElseIf num = 36 Then
            i36.Visible = False
        End If
    End Sub

    Private Sub initializeVariables(sender As Object, e As EventArgs) Handles MyBase.Load
        Randomize() : Dim items As Array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18}
        RandomizeArray(items)
        i1.Text = CStr(items(0)) : i2.Text = CStr(items(1)) : i3.Text = CStr(items(2)) : i4.Text = CStr(items(3)) : i5.Text = CStr(items(4)) : i6.Text = CStr(items(5))
        i7.Text = CStr(items(6)) : i8.Text = CStr(items(7)) : i9.Text = CStr(items(8)) : i10.Text = CStr(items(9)) : i11.Text = CStr(items(10)) : i12.Text = CStr(items(11))
        i13.Text = CStr(items(12)) : i14.Text = CStr(items(13)) : i15.Text = CStr(items(14)) : i16.Text = CStr(items(15)) : i17.Text = CStr(items(16)) : i18.Text = CStr(items(17))
        i19.Text = CStr(items(18)) : i20.Text = CStr(items(19)) : i21.Text = CStr(items(20)) : i22.Text = CStr(items(21)) : i23.Text = CStr(items(22)) : i24.Text = CStr(items(23))
        i25.Text = CStr(items(24)) : i26.Text = CStr(items(25)) : i27.Text = CStr(items(26)) : i28.Text = CStr(items(27)) : i29.Text = CStr(items(28)) : i30.Text = CStr(items(29))
        i31.Text = CStr(items(30)) : i32.Text = CStr(items(31)) : i33.Text = CStr(items(32)) : i34.Text = CStr(items(33)) : i35.Text = CStr(items(34)) : i36.Text = CStr(items(35))
    End Sub
    Private Sub RandomizeArray(ByVal items() As Integer)
        Dim max_index As Integer = items.Length - 1
        Dim rnd As New Random
        For i As Integer = 0 To max_index - 1
            ' Pick an item for position i.
            Dim j As Integer = rnd.Next(i, max_index + 1)
            ' Swap them.
            Dim temp As Integer = items(i)
            items(i) = items(j)
            items(j) = temp
        Next i
    End Sub
End Class
