<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class MainForm
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
        Dim resources As System.ComponentModel.ComponentResourceManager = New System.ComponentModel.ComponentResourceManager(GetType(MainForm))
        Me.firstRollBtn = New System.Windows.Forms.Button()
        Me.Label4 = New System.Windows.Forms.Label()
        Me.Label5 = New System.Windows.Forms.Label()
        Me.Panel1 = New System.Windows.Forms.Panel()
        Me.roundLabel = New System.Windows.Forms.Label()
        Me.pointLabel = New System.Windows.Forms.Label()
        Me.CMD = New System.Windows.Forms.RichTextBox()
        Me.Panel1.SuspendLayout()
        Me.SuspendLayout()
        '
        'firstRollBtn
        '
        Me.firstRollBtn.Font = New System.Drawing.Font("Microsoft Sans Serif", 18.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.firstRollBtn.Location = New System.Drawing.Point(12, 269)
        Me.firstRollBtn.Name = "firstRollBtn"
        Me.firstRollBtn.Size = New System.Drawing.Size(512, 44)
        Me.firstRollBtn.TabIndex = 2
        Me.firstRollBtn.Text = "Begin Game"
        Me.firstRollBtn.UseVisualStyleBackColor = True
        '
        'Label4
        '
        Me.Label4.Anchor = CType((System.Windows.Forms.AnchorStyles.Top Or System.Windows.Forms.AnchorStyles.Right), System.Windows.Forms.AnchorStyles)
        Me.Label4.AutoSize = True
        Me.Label4.Font = New System.Drawing.Font("Microsoft Sans Serif", 24.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label4.ForeColor = System.Drawing.Color.Silver
        Me.Label4.Location = New System.Drawing.Point(24, 9)
        Me.Label4.Name = "Label4"
        Me.Label4.Size = New System.Drawing.Size(108, 37)
        Me.Label4.TabIndex = 5
        Me.Label4.Text = "Point :"
        Me.Label4.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        '
        'Label5
        '
        Me.Label5.Anchor = CType((System.Windows.Forms.AnchorStyles.Top Or System.Windows.Forms.AnchorStyles.Right), System.Windows.Forms.AnchorStyles)
        Me.Label5.AutoSize = True
        Me.Label5.Font = New System.Drawing.Font("Microsoft Sans Serif", 24.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Label5.ForeColor = System.Drawing.Color.Silver
        Me.Label5.Location = New System.Drawing.Point(3, 59)
        Me.Label5.Name = "Label5"
        Me.Label5.Size = New System.Drawing.Size(129, 37)
        Me.Label5.TabIndex = 6
        Me.Label5.Text = "Round :"
        Me.Label5.TextAlign = System.Drawing.ContentAlignment.MiddleRight
        '
        'Panel1
        '
        Me.Panel1.BackColor = System.Drawing.Color.FromArgb(CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer))
        Me.Panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
        Me.Panel1.Controls.Add(Me.roundLabel)
        Me.Panel1.Controls.Add(Me.pointLabel)
        Me.Panel1.Controls.Add(Me.Label5)
        Me.Panel1.Controls.Add(Me.Label4)
        Me.Panel1.Location = New System.Drawing.Point(12, 319)
        Me.Panel1.Name = "Panel1"
        Me.Panel1.Size = New System.Drawing.Size(512, 102)
        Me.Panel1.TabIndex = 8
        '
        'roundLabel
        '
        Me.roundLabel.AutoSize = True
        Me.roundLabel.Font = New System.Drawing.Font("Microsoft Sans Serif", 24.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.roundLabel.ForeColor = System.Drawing.Color.White
        Me.roundLabel.Location = New System.Drawing.Point(138, 59)
        Me.roundLabel.Name = "roundLabel"
        Me.roundLabel.Size = New System.Drawing.Size(35, 37)
        Me.roundLabel.TabIndex = 9
        Me.roundLabel.Text = "0"
        '
        'pointLabel
        '
        Me.pointLabel.AutoSize = True
        Me.pointLabel.Font = New System.Drawing.Font("Microsoft Sans Serif", 24.0!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.pointLabel.ForeColor = System.Drawing.Color.White
        Me.pointLabel.Location = New System.Drawing.Point(138, 9)
        Me.pointLabel.Name = "pointLabel"
        Me.pointLabel.Size = New System.Drawing.Size(94, 37)
        Me.pointLabel.TabIndex = 8
        Me.pointLabel.Text = "None"
        '
        'CMD
        '
        Me.CMD.BackColor = System.Drawing.Color.FromArgb(CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer), CType(CType(64, Byte), Integer))
        Me.CMD.Location = New System.Drawing.Point(530, 12)
        Me.CMD.Name = "CMD"
        Me.CMD.ReadOnly = True
        Me.CMD.Size = New System.Drawing.Size(270, 409)
        Me.CMD.TabIndex = 10
        Me.CMD.Text = ""
        '
        'MainForm
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(812, 430)
        Me.Controls.Add(Me.CMD)
        Me.Controls.Add(Me.Panel1)
        Me.Controls.Add(Me.firstRollBtn)
        Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle
        Me.Icon = CType(resources.GetObject("$this.Icon"), System.Drawing.Icon)
        Me.MaximizeBox = False
        Me.Name = "MainForm"
        Me.SizeGripStyle = System.Windows.Forms.SizeGripStyle.Hide
        Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
        Me.Text = "Craps (Pass Line) by Nathaniel Inman"
        Me.Panel1.ResumeLayout(False)
        Me.Panel1.PerformLayout()
        Me.ResumeLayout(False)

    End Sub
    Friend WithEvents firstRollBtn As System.Windows.Forms.Button
    Friend WithEvents Label4 As System.Windows.Forms.Label
    Friend WithEvents Label5 As System.Windows.Forms.Label
    Friend WithEvents Panel1 As System.Windows.Forms.Panel
    Friend WithEvents roundLabel As System.Windows.Forms.Label
    Friend WithEvents pointLabel As System.Windows.Forms.Label
    Friend WithEvents CMD As System.Windows.Forms.RichTextBox
End Class
