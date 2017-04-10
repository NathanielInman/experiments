Module ColorOutput
    Public DefaultColor As String = "/W"
    Public Sub SND(ByVal Txt As String, Optional ByVal showInfo As Boolean = True)
        'append the game numnber and round number as default, otherwise suppress the information
        If showInfo = True Then
            Txt = "/c[/Z" & CStr(MainForm.gameNumber) & "/c:/Z" & CStr(MainForm.round) & "/c]/W" & " " & Txt & DefaultColor
        Else
            Txt = "/W" & " " & Txt & DefaultColor
        End If
        Dim Switches As Integer = -1
        Dim TempStr As String
        Dim TempStr2 As String
        Dim TempInt As Integer
        Dim TempInt2 As Integer = 0
        For TempInt = 1 To Len(Txt) Step 1
            TempStr = Mid(Txt, TempInt, 1)
            If TempStr = "/" Then
                If Mid(Txt, TempInt, 2) = "/B" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&HFF)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/b" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&H66)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/C" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&HFFFF)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/c" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&H6666)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/M" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&HFF00FF)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/m" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&H660066)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/y" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&H666600)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/Y" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&HFFFF00)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/g" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&H6600)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/G" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&HFF00)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/w" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&H666666)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/W" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&HAAAAAA)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/z" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&H333333)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/Z" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&HFFFFFF)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/R" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&HFF0000)
                    TempInt2 = TempInt
                    Switches += 1
                ElseIf Mid(Txt, TempInt, 2) = "/r" Then
                    If TempInt2 <> 0 Then
                        TempStr2 = Mid(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Replace(Txt, "/b", ""), "/B", ""), "/g", ""), "/G", ""), "/m", ""), "/M", ""), "/w", ""), "/W", ""), "/y", ""), "/Y", ""), "/z", ""), "/Z", ""), "/c", ""), "/C", ""), "/r", ""), "/R", ""), TempInt2 - Switches * 2, TempInt - TempInt2 - 2)
                        MainForm.CMD.SelectedText = TempStr2
                    End If
                    MainForm.CMD.SelectionColor = Color.FromArgb(&H660000)
                    TempInt2 = TempInt
                    Switches += 1
                End If
            End If
        Next
        MainForm.CMD.SelectedText = Chr(13)
        MainForm.CMD.SelectionStart = MainForm.CMD.TextLength
        MainForm.CMD.SelectionLength = 0
        MainForm.CMD.ScrollToCaret()
    End Sub
End Module
