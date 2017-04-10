Public Class Form1
    Private CurWeapon = 0
    Private PlayerScore = 0
    Private CPUScore = 0
    Private TieScore = 0

    Private Sub testPosition(sender As Object, e As MouseEventArgs) Handles PictureBox1.MouseMove
        If e.Location.X > 203 And e.Location.X < 390 And e.Location.Y > 84 And e.Location.Y < 266 Then
            PictureBox1.Image = My.Resources.RASLP_Orig_S
        ElseIf e.Location.X > 16 And e.Location.X < 203 And e.Location.Y > 223 And e.Location.Y < 405 Then
            PictureBox1.Image = My.Resources.RASLP_Orig_P
        ElseIf e.Location.X > 91 And e.Location.X < 278 And e.Location.Y > 453 And e.Location.Y < 635 Then
            PictureBox1.Image = My.Resources.RASLP_Orig_L
        ElseIf e.Location.X > 332 And e.Location.X < 519 And e.Location.Y > 448 And e.Location.Y < 630 Then
            PictureBox1.Image = My.Resources.RASLP_Orig_R
        ElseIf e.Location.X > 395 And e.Location.X < 582 And e.Location.Y > 218 And e.Location.Y < 400 Then
            PictureBox1.Image = My.Resources.RASLP_Orig_A
        Else
            PictureBox1.Image = My.Resources.RPSLP_Orig
        End If
    End Sub

    Private Sub processClick(sender As Object, e As MouseEventArgs) Handles PictureBox1.MouseClick
        If e.Location.X > 203 And e.Location.X < 390 And e.Location.Y > 84 And e.Location.Y < 266 Then
            CurWeapon = 1
        ElseIf e.Location.X > 16 And e.Location.X < 203 And e.Location.Y > 223 And e.Location.Y < 405 Then
            CurWeapon = 2
        ElseIf e.Location.X > 91 And e.Location.X < 278 And e.Location.Y > 453 And e.Location.Y < 635 Then
            CurWeapon = 3
        ElseIf e.Location.X > 332 And e.Location.X < 519 And e.Location.Y > 448 And e.Location.Y < 630 Then
            CurWeapon = 4
        ElseIf e.Location.X > 395 And e.Location.X < 582 And e.Location.Y > 218 And e.Location.Y < 400 Then
            CurWeapon = 5
        Else
            Exit Sub
        End If
        If CurWeapon <> 0 Then 'make sure that something is actually picked
            Dim computer As Short = CInt(Math.Ceiling(Rnd() * 5))
            If CurWeapon = 1 And computer <> 1 Then 'scissors
                If computer = 2 Then 'computer was spock
                    PictureBox2.Image = My.Resources.RPSLP_Vs_SvP : CPUScore += 1
                ElseIf computer = 3 Then 'computer was lizard
                    PictureBox2.Image = My.Resources.RPSLP_Vs_SvL : PlayerScore += 1
                ElseIf computer = 4 Then 'computer was rock
                    PictureBox2.Image = My.Resources.RPSLP_Vs_SvR : CPUScore += 1
                ElseIf computer = 5 Then 'computer was paper
                    PictureBox2.Image = My.Resources.RPSLP_Vs_SvA : PlayerScore += 1
                End If
            ElseIf CurWeapon = 2 And computer <> 2 Then 'spock
                If computer = 1 Then 'computer was scissors
                    PictureBox2.Image = My.Resources.RPSLP_Vs_PvS : PlayerScore += 1
                ElseIf computer = 3 Then 'computer was lizard
                    PictureBox2.Image = My.Resources.RPSLP_Vs_PvL : CPUScore += 1
                ElseIf computer = 4 Then 'computer was rock
                    PictureBox2.Image = My.Resources.RPSLP_Vs_PvR : PlayerScore += 1
                ElseIf computer = 5 Then 'computer was paper
                    PictureBox2.Image = My.Resources.RPSLP_Vs_PvA : CPUScore += 1
                End If
            ElseIf CurWeapon = 3 And computer <> 3 Then 'lizard
                If computer = 1 Then 'computer was scissors
                    PictureBox2.Image = My.Resources.RPSLP_Vs_LvS : CPUScore += 1
                ElseIf computer = 2 Then 'computer was spock
                    PictureBox2.Image = My.Resources.RPSLP_Vs_LvP : PlayerScore += 1
                ElseIf computer = 4 Then 'computer was rock
                    PictureBox2.Image = My.Resources.RPSLP_Vs_LvR : CPUScore += 1
                ElseIf computer = 5 Then 'computer was paper
                    PictureBox2.Image = My.Resources.RPSLP_Vs_LvA : PlayerScore += 1
                End If
            ElseIf CurWeapon = 4 And computer <> 4 Then 'rock
                If computer = 1 Then 'computer was scissors
                    PictureBox2.Image = My.Resources.RPSLP_Vs_RvS : PlayerScore += 1
                ElseIf computer = 2 Then 'computer was spock
                    PictureBox2.Image = My.Resources.RPSLP_Vs_RvP : CPUScore += 1
                ElseIf computer = 3 Then 'computer was lizard
                    PictureBox2.Image = My.Resources.RPSLP_Vs_RvL : PlayerScore += 1
                ElseIf computer = 5 Then 'computer was paper
                    PictureBox2.Image = My.Resources.RPSLP_Vs_RvA : CPUScore += 1
                End If
            ElseIf CurWeapon = 5 And computer <> 5 Then 'paper
                If computer = 1 Then 'computer was scissors
                    PictureBox2.Image = My.Resources.RPSLP_Vs_AvS : CPUScore += 1
                ElseIf computer = 2 Then 'computer was spock
                    PictureBox2.Image = My.Resources.RPSLP_Vs_AvP : PlayerScore += 1
                ElseIf computer = 3 Then 'computer was lizard
                    PictureBox2.Image = My.Resources.RPSLP_Vs_AvL : CPUScore += 1
                ElseIf computer = 4 Then 'computer was rock
                    PictureBox2.Image = My.Resources.RPSLP_Vs_AvR : PlayerScore += 1
                End If
            Else
                PictureBox2.Image = My.Resources.RPSLP_Vs_Tie : TieScore += 1
            End If
        End If
        Label1.Text = "You: " & PlayerScore
        Label2.Text = "CPU: " & CPUScore
        Label3.Text = "Tie: " & TieScore
        Timer1.Enabled = True
        PictureBox2.Visible = True
    End Sub

    Private Sub resetLayout(sender As Object, e As EventArgs) Handles Timer1.Tick
        PictureBox2.Visible = False
        Timer1.Enabled = False
    End Sub
End Class
