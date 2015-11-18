<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Main
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        Me.components = New System.ComponentModel.Container()
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(Main))
        Me.BetMaxBtn = New System.Windows.Forms.Button()
        Me.BetOneBtn = New System.Windows.Forms.Button()
        Me.RollBtn = New System.Windows.Forms.Button()
        Me.MachineBox = New System.Windows.Forms.PictureBox()
        Me.Timer1 = New System.Windows.Forms.Timer(Me.components)
        Me.PictureBox1 = New System.Windows.Forms.PictureBox()
        CType(Me.MachineBox, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'BetMaxBtn
        '
        Me.BetMaxBtn.BackgroundImage = Global.SlotMachine.My.Resources.Resources.BetMaxBtn
        Me.BetMaxBtn.Location = New System.Drawing.Point(155, 470)
        Me.BetMaxBtn.Name = "BetMaxBtn"
        Me.BetMaxBtn.Size = New System.Drawing.Size(127, 120)
        Me.BetMaxBtn.TabIndex = 3
        Me.BetMaxBtn.UseVisualStyleBackColor = True
        Me.BetMaxBtn.Visible = False
        '
        'BetOneBtn
        '
        Me.BetOneBtn.BackgroundImage = Global.SlotMachine.My.Resources.Resources.BetOneBtn
        Me.BetOneBtn.Location = New System.Drawing.Point(22, 470)
        Me.BetOneBtn.Name = "BetOneBtn"
        Me.BetOneBtn.Size = New System.Drawing.Size(127, 120)
        Me.BetOneBtn.TabIndex = 2
        Me.BetOneBtn.UseVisualStyleBackColor = True
        Me.BetOneBtn.Visible = False
        '
        'RollBtn
        '
        Me.RollBtn.BackgroundImage = Global.SlotMachine.My.Resources.Resources.SpinBtn
        Me.RollBtn.Location = New System.Drawing.Point(451, 470)
        Me.RollBtn.Name = "RollBtn"
        Me.RollBtn.Size = New System.Drawing.Size(127, 120)
        Me.RollBtn.TabIndex = 1
        Me.RollBtn.UseVisualStyleBackColor = True
        Me.RollBtn.Visible = False
        '
        'MachineBox
        '
        Me.MachineBox.Image = Global.SlotMachine.My.Resources.Resources.Machine
        Me.MachineBox.Location = New System.Drawing.Point(0, -1)
        Me.MachineBox.Name = "MachineBox"
        Me.MachineBox.Size = New System.Drawing.Size(602, 601)
        Me.MachineBox.TabIndex = 0
        Me.MachineBox.TabStop = False
        '
        'Timer1
        '
        Me.Timer1.Enabled = True
        Me.Timer1.Interval = 1600
        '
        'PictureBox1
        '
        Me.PictureBox1.Image = Global.SlotMachine.My.Resources.Resources.MachineIntro
        Me.PictureBox1.Location = New System.Drawing.Point(0, -1)
        Me.PictureBox1.Name = "PictureBox1"
        Me.PictureBox1.Size = New System.Drawing.Size(602, 601)
        Me.PictureBox1.TabIndex = 5
        Me.PictureBox1.TabStop = False
        '
        'Main
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(599, 599)
        Me.Controls.Add(Me.PictureBox1)
        Me.Controls.Add(Me.BetMaxBtn)
        Me.Controls.Add(Me.BetOneBtn)
        Me.Controls.Add(Me.RollBtn)
        Me.Controls.Add(Me.MachineBox)
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.MaximizeBox = False
        Me.Name = "Main"
        Me.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide
        Me.Text = "Slot Machine by Nathaniel Inman"
        CType(Me.MachineBox, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.PictureBox1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub
    Friend WithEvents MachineBox As System.Windows.Forms.PictureBox
    Friend WithEvents RollBtn As System.Windows.Forms.Button
    Friend WithEvents BetOneBtn As System.Windows.Forms.Button
    Friend WithEvents BetMaxBtn As System.Windows.Forms.Button
    Friend WithEvents Timer1 As System.Windows.Forms.Timer
    Friend WithEvents PictureBox1 As System.Windows.Forms.PictureBox

End Class
