'********Please Update Date and Version if you make any changes to the Sys_Library module*********
'Updated on 4/26/2011 (put functions back in that disappeared from the version updated on 3/2/2011)
'Updated on 3/02/2011
'Updated on 1/27/2011
'Sys_Library Version: 1.00
Option Compare Database
Option Explicit
Global Const SW_HIDE = 0
Global Const SW_SHOWNORMAL = 1
Global Const SW_SHOWMINIMIZED = 2
Global Const SW_SHOWMAXIMIZED = 3
Private Declare Function apiShowWindow Lib "user32" Alias "ShowWindow" (ByVal hwnd As Long, ByVal nCmdShow As Long) As Long
Public Const IDC_APPSTARTING = 32650&
Public Const IDC_HAND = 32649&
Public Const IDC_ARROW = 32512&
Public Const IDC_CROSS = 32515&
Public Const IDC_IBEAM = 32513&
Public Const IDC_ICON = 32641&
Public Const IDC_NO = 32648&
Public Const IDC_SIZE = 32640&
Public Const IDC_SIZEALL = 32646&
Public Const IDC_SIZENESW = 32643&
Public Const IDC_SIZENS = 32645&
Public Const IDC_SIZENWSE = 32642&
Public Const IDC_SIZEWE = 32644&
Public Const IDC_UPARROW = 32516&
Public Const IDC_WAIT = 32514&
Declare Function LoadCursorBynum Lib "user32" Alias "LoadCursorA" (ByVal hInstance As Long, ByVal lpCursorName As Long) As Long
Declare Function LoadCursorFromFile Lib "user32" Alias "LoadCursorFromFileA" (ByVal lpFileName As String) As Long
Declare Function SetCursor Lib "user32" (ByVal hCursor As Long) As Long
Global ws As Workspace, rs As DAO.Recordset, rst As DAO.Recordset, db As DAO.Database, qd As QueryDef
Global strSQL As String, X, n As Integer, vSecurity As String, UName As String, ConfirmActionQueries As Boolean, _
    ConfirmRecordChanges As Boolean
Global UserType As String, LastAction As String '<--<< UserType = Gov or Serco, LastAction used for error tracking
Public Declare Function apiSetForegroundWindow Lib "user32" Alias "SetForegroundWindow" (ByVal hwnd As Long) As Long
Public Declare Function apiShowWin Lib "user32" Alias "ShowWindow" (ByVal hwnd As Long, ByVal nCmdShow As Long) As Long
Public Const SW_MAXIMIZE = 3, SW_NORMAL = 1
'>>----> (below esample) lngRetVal = ShellExecute(0, "open", "<program with path>", "<arguments>", "<run in this folder>", SW_SHOWMAXIMIZED)
'>>----> (below esample) lngRetVal = ShellExecute(,,"notepad.exe")
Public Declare Function ShellExecute Lib "Shell32.dll" Alias "ShellExecuteA" (Optional ByVal hwnd As Long = 0, _
    Optional ByVal lpOperation As String = "open", Optional ByVal lpFile As String = "", Optional ByVal lpParameters As String = "", _
    Optional ByVal lpDirectory As String = "", Optional ByVal nShowCmd As Long = 3) As Long
 
Function fSetAccessWindow(nCmdShow As Long)
    On Error GoTo Err_fSetAccessWindow
    Dim loX As Long
    Dim loForm As Form
    On Error Resume Next
    Set loForm = Screen.ActiveForm
    If Err <> 0 Then
        loX = apiShowWindow(hWndAccessApp, nCmdShow)
        Err.Clear
    End If
    If nCmdShow = SW_SHOWMINIMIZED And loForm.Modal = True Then
        MsgBox "Cannot minimize Access with " & (loForm.Caption + " ") & "form on screen"
    ElseIf nCmdShow = SW_HIDE And loForm.PopUp <> True Then
        MsgBox "Cannot hide Access with " & (loForm.Caption + " ") & "form on screen"
    Else
        loX = apiShowWindow(hWndAccessApp, nCmdShow)
    End If
    fSetAccessWindow = (loX <> 0)
Err_fSetAccessWindow:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function UserName()
    On Error GoTo Err_UserName
    UserName = Environ("Username")
    Exit Function
Err_UserName:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function EvalKey(key As Integer) As Double
    On Error GoTo Err_EvalKey
    Dim rs As DAO.Recordset
    If ObjectExists("Table", "sys_Registry") = False Then
        DoCmd.TransferDatabase acLink, "Microsoft Access", "P:\Database\Public\Public BE\ITRepository.mdb", _
             acTable, "sys_Registry", "sys_Registry"
    End If
    Set rs = GetRS("sys_registry")
    rs.FindFirst "[key]=" & key
    If rs.NoMatch = True Then
        EvalKey = -1
    Else
        EvalKey = rs!Value
    End If
    Exit Function
Err_EvalKey:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function CloseVBEWindow()
    On Error GoTo Err_CloseVBEWindow
    Application.VBE.MainWindow.Visible = False
    Exit Function
Err_CloseVBEWindow:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function Wait(period As String, interval As Long)
    On Error GoTo Err_Wait
    Dim tm As Date
    tm = DateAdd(period, interval, Time())
    Do Until tm <= Time
        DoEvents
    Loop
    Exit Function
Err_Wait:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function CurDB() As String
    On Error GoTo Err_CurDB
    'Returns the name of the current database.
    CurDB = Mid(Application.CurrentDb.Name, InStrRev(Application.CurrentDb.Name, "\") + 1)
    Exit Function
Err_CurDB:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function FindSysInfoKey(key As String) As String
    On Error GoTo Err_FindSysInfoKey
    Dim md As module
    Dim X As Long
    Dim Line As String
    Dim sep As String
    'Old versioning system
    Set md = GetMod("sys_DBINFO")
    X = 1
    Do Until X = md.CountOfLines + 1
        Line = Trim(md.Lines(X, 1))
        If InStr(1, Trim(Line), key) <> 0 Then
            sep = InStr(1, Trim(Line), "=")
            If sep <> 0 Then
                FindSysInfoKey = Mid(Line, sep + 1)
                Exit Function
            End If
        End If
        X = X + 1
    Loop
    Exit Function
Err_FindSysInfoKey:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Function ContractorID()
    On Error GoTo Err_ContractorID
    Dim db As Database
    Dim rs As DAO.Recordset
    'Old usermapping security level check, doesn't work off security levels.
    'Uses a .findfirst which is notoriously slow
    Set db = CurrentDb()
    Set rs = db.OpenRecordset("UserMapping", dbOpenDynaset)
    rs.FindFirst "[WindowsLogin]='" & UserName() & "'"
    If rs.NoMatch Then
        MsgBox "You Do Not Have Access For This Option", vbCritical, "Insufficent Permission"
        Exit Function
    Else
        ContractorID = rs!ContractID
    End If
    Exit Function
Err_ContractorID:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function GetMod(modname As String) As module
    On Error GoTo Err_GetMod
    Dim mod1 As module
    Dim flg As String
    'Opens a module
    'Not sure why, I've never used it. - Alex
    Dim i As Integer
    Dim modOpenModules As Modules
    Set modOpenModules = Application.Modules
     For i = 0 To modOpenModules.Count - 1
        If modOpenModules(i).Name = modname Then
            flg = True
            Set GetMod = modOpenModules(i)
            Exit For
        End If
    Next
    Exit Function
Err_GetMod:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function GetRS(strTableName As String) As DAO.Recordset
    On Error GoTo Err_GetRS
    Dim db As Database
    Dim rs As DAO.Recordset
    'Opens a recordset
    'set rs = GetRS(SQL stuff or query or table name)
    Set db = CurrentDb()
    Set rs = db.OpenRecordset(strTableName, dbOpenDynaset)
    Set GetRS = rs
    Exit Function
Err_GetRS:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function WriteErr(strError As String)
    On Error GoTo Err_WriteErr
    Dim rs As DAO.Recordset
    'Early version of error trap log
    'Doesn't record as much data as the current trap log, but it does create it's own link to the error table
    'Importing the link probably doesn't work anymore because the module wasn't updated to work with the password on the database
    If ObjectExists("Table", "sys_Errors") = False Then
        DoCmd.TransferDatabase acLink, "Microsoft Access", "P:\Database\Public\Public BE\ITRepository.mdb", _
             acTable, "sys_Errors", "sys_Errors"
    End If
    Set rs = GetRS("sys_Errors")
    rs.AddNew
    rs!DatabaseName = CurDB
    rs!User = UserName()
    rs!Date = Date
    rs!Time = Time
    rs!Error = strError
    rs.Update
    Exit Function
Err_WriteErr:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function ToggleTags(strTag As String, isVisible As Boolean, frm As Form)
    On Error GoTo Err_ToggleTags
    Dim cntrl As Control
    'Turns controls on and off
    'ToggleTags(tag of controls to turn, make them visible or invisible, name of form being affected)
    For Each cntrl In frm.Controls
        If cntrl.Tag = strTag Then
            cntrl.Visible = isVisible
            frm.Repaint
        End If
    Next cntrl
    Exit Function
Err_ToggleTags:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function ObjectExists(strObjectType As String, strObjectName As String) As Boolean
    On Error GoTo Err_Exists
    Dim db As Database
    Dim tbl As TableDef
    Dim qry As QueryDef
    Dim i As Integer
    'Determine if the object (table, form, module) you're looking for exists in the current database
    ' if objectexists(table or whatever, name of table) = true then object is here
    Set db = CurrentDb()
    ObjectExists = False
    Select Case strObjectType
        Case "Table"
            For Each tbl In db.TableDefs
                If tbl.Name = strObjectName Then
                    ObjectExists = True
                    Exit For
                End If
            Next tbl
        Case "Query"
            For Each qry In db.QueryDefs
                If qry.Name = strObjectName Then
                    ObjectExists = True
                    Exit For
                End If
            Next qry
        Case "Form", "Report", "Module"
             For i = 0 To db.Containers(strObjectType & "s").Documents.Count - 1
                If db.Containers(strObjectType & "s").Documents(i).Name = strObjectName Then
                    ObjectExists = True
                    Exit For
                End If
            Next i
        Case "Macro"
             For i = 0 To db.Containers("Scripts").Documents.Count - 1
                If db.Containers("Scripts").Documents(i).Name = strObjectName Then
                    ObjectExists = True
                    Exit For
                End If
            Next i
        Case Else
            MsgBox "Invalid Object Type passed, must be Table, Query, Form, Report, Macro, or Module"
    End Select
Err_Exists:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function Phonex(ByVal varSurName As Variant) As Variant
    On Error GoTo Err_Phonex
    Dim intLength As Integer
    Dim intCharCount As Integer
    Dim intPhxCount As Integer
    Dim intSeparator As Integer
    Dim intPhxCode As Integer
    Dim intPrvCode As Integer
    Dim varCurrChar As Variant
    Dim varPhx As Variant
    'If a null or empty string was passed, return a null
    If IsNull(varSurName) Then
        varPhx = ""
        GoTo PhonexDone
    Else
        intLength = Len(varSurName)
        If intLength = 0 Then
            varPhx = ""
            GoTo PhonexDone
        End If
    End If
    'Removes all trailing "L", "R", "S" characters at the end of a name
    varCurrChar = Right(varSurName, 1)
    Select Case varCurrChar
        Case "L", "R", "S"
            varSurName = Left(varSurName, Len(varSurName) - 1)
    End Select
    'Removes "K" character on the leading letter-pair "KN"
    'Removes "W" character on the leading letter-pair "WR"
    'Replaces leading letter pair "PH" with character "F"
    varCurrChar = Left(varSurName, 2)
    Select Case varCurrChar
        Case "KN", "WR"
            varSurName = Right(varSurName, Len(varSurName) - 1)
        Case "PH"
            varCurrChar = "F"
            varSurName = varCurrChar & Right(varSurName, Len(varSurName) - 2)
    End Select
    'Removes "H" character on leading single letter
    'Replaces leading letter "E", "I", "O", "U", "Y" with character "A"
    'Replaces leading letter "K", "Q" with character "C"
    'Replaces leading letter "P" with character "B"
    'Replaces leading letter "J" with character "G"
    'Replaces leading letter "V" with character "F"
    'Replaces leading letter "Z" with character "S"
    varCurrChar = Left(varSurName, 1)
    Select Case varCurrChar
        Case "H"
            varSurName = Right(varSurName, Len(varSurName) - 1)
        Case "E", "I", "O", "U", "Y"
            varCurrChar = "A"
            varSurName = varCurrChar & Right(varSurName, Len(varSurName) - 1)
        Case "K", "Q"
            varCurrChar = "C"
            varSurName = varCurrChar & Right(varSurName, Len(varSurName) - 1)
        Case "P"
            varCurrChar = "B"
            varSurName = varCurrChar & Right(varSurName, Len(varSurName) - 1)
        Case "J"
            varCurrChar = "G"
            varSurName = varCurrChar & Right(varSurName, Len(varSurName) - 1)
        Case "V"
            varCurrChar = "F"
            varSurName = varCurrChar & Right(varSurName, Len(varSurName) - 1)
        Case "Z"
            varCurrChar = "S"
            varSurName = varCurrChar & Right(varSurName, Len(varSurName) - 1)
    End Select
    intSeparator = 0 'Keeps track of vowel separators
    intPrvCode = 0 'The code of the previous char
    intPhxCount = 0 'Counts number of phonex chars
    intCharCount = 0 'Counts number of name chars
    'Replaces "DC" and "TC" with character "C"
    Do Until (intCharCount = intLength - 1)
        intCharCount = intCharCount + 1
        varCurrChar = Mid(Mid(varSurName, 2), intCharCount, 2)
        If varCurrChar = "DC" Then
            varCurrChar = "C"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "DC", _
                 "C")
        End If
        If varCurrChar = "TC" Then
            varCurrChar = "C"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "TC", _
                 "C")
        End If
    Loop
    intLength = Len(varSurName)
    intCharCount = 0
    'Removes "L" if followed by "A, E, I, O, U"
    Do Until (intCharCount = intLength - 1)
        intCharCount = intCharCount + 1
        varCurrChar = Mid(Mid(varSurName, 2), intCharCount, 2)
        If varCurrChar = "LA" Then
            varCurrChar = "A"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "LA", _
                 "A")
        End If
        If varCurrChar = "LE" Then
            varCurrChar = "E"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "LE", _
                 "E")
        End If
        If varCurrChar = "LI" Then
            varCurrChar = "I"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "LI", _
                 "I")
        End If
        If varCurrChar = "LO" Then
            varCurrChar = "O"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "LO", _
                 "O")
        End If
        If varCurrChar = "LU" Then
            varCurrChar = "U"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "LU", _
                 "U")
        End If
    Loop
    intLength = Len(varSurName)
    intCharCount = 0
    'Replaces "MD" and "MG" with character "M" + "ND" and "NG" with character "N"
    Do Until (intCharCount = intLength - 1)
        intCharCount = intCharCount + 1
        varCurrChar = Mid(Mid(varSurName, 2), intCharCount, 2)
        If varCurrChar = "MD" Then
            varCurrChar = "M"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "MD", _
                 "M")
        End If
        If varCurrChar = "MG" Then
            varCurrChar = "M"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "MG", _
                 "M")
        End If
        If varCurrChar = "ND" Then
            varCurrChar = "N"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "ND", _
                 "N")
        End If
        If varCurrChar = "NG" Then
            varCurrChar = "N"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "NG", _
                 "N")
        End If
    Loop
    intLength = Len(varSurName)
    intCharCount = 0
    'Removes "L" if followed by "A, E, I, O, U"
    Do Until (intCharCount = intLength - 1)
        intCharCount = intCharCount + 1
        varCurrChar = Mid(Mid(varSurName, 2), intCharCount, 2)
        If varCurrChar = "RA" Then
            varCurrChar = "A"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "RA", _
                 "A")
        End If
        If varCurrChar = "RE" Then
            varCurrChar = "E"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "RE", _
                 "E")
        End If
        If varCurrChar = "RI" Then
            varCurrChar = "I"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "RI", _
                 "I")
        End If
        If varCurrChar = "RO" Then
            varCurrChar = "O"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "RO", _
                 "O")
        End If
        If varCurrChar = "RU" Then
            varCurrChar = "U"
            varSurName = Left(varSurName, intLength - (intLength - 1)) + Replace(Mid(varSurName, 2), "RU", _
                 "U")
        End If
    Loop
    intLength = Len(varSurName)
    intCharCount = 0
    'Loop until the Phonex code is of length 4
    'or we have run out of characters in the name
    Do Until (intPhxCount = 4 Or intCharCount = intLength)
        intCharCount = intCharCount + 1
        varCurrChar = Mid(varSurName, intCharCount, 1)
        'Calculate the code for the current character
        Select Case varCurrChar
            Case "B", "F", "P", "V"
                intPhxCode = 1
            Case "C", "G", "J", "K", "Q", "S", "X", "Z"
                intPhxCode = 2
            Case "D", "T"
                intPhxCode = 3
            Case "L"
                intPhxCode = 4
            Case "M", "N"
                intPhxCode = 5
            Case "R"
                intPhxCode = 6
            Case "A", "E", "H", "I", "O", "U", "W", "Y"
                intPhxCode = -1
            Case Else
                intPhxCode = -2
        End Select
        'Treat the first character specially
        If intCharCount = 1 Then
            varPhx = UCase(varCurrChar)
            intPhxCount = intPhxCount + 1
            intPrvCode = intPhxCode
            intSeparator = 0
            'If a significant constant and not a repeat
            'without a separator then code this character
        ElseIf intPhxCode > 0 And (intPhxCode <> intPrvCode Or intSeparator = 1) Then
            varPhx = varPhx + Format(intPhxCode, "#")
            intPhxCount = intPhxCount + 1
            intPrvCode = intPhxCode
            intSeparator = 0
            'If a vowel, this character is not coded,
            'but it will act as a separator
        ElseIf intPhxCode = -1 Then
            intSeparator = 1
        End If
    Loop
    'If the code is < 4 chars long, then
    'fill the rest of code with zeros
    If intPhxCount < 4 Then
        varPhx = varPhx + String((4 - intPhxCount), "0")
    End If
PhonexDone:
    Phonex = varPhx
    Exit Function
Err_Phonex:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function IsFieldNull(MyValue As Variant)
    On Error GoTo Err_IsFieldNull
    'Allows checking for null on fields or variables that are not variants
    If IsNull(MyValue) Then
        IsFieldNull = True
    Else
        IsFieldNull = False
    End If
Err_IsFieldNull:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Function Security_Lvl()
    On Error GoTo Err_Security_Lvl
    Dim conn As ADODB.Connection
    Dim rs As ADODB.Recordset
    'New security module that runs on user mapping and position code. allows chester to change position codes to whatever he wants as long as he does it in both tables
    'Returns number as security level, 0 through 100. 100 being the highest.
    'If Security_Lvl = 100 then give permission
    Set conn = CreateObject("ADODB.Connection")
    conn.Open "Provider=Microsoft.Jet.OLEDB.4.0;Jet OLEDB:Database Password=NewBeginnings8;Data Source=P:\Database\Restricted\Restricted BE\Extracts\REPOSITORY.mdb"
    Set rs = New ADODB.Recordset
    'need recordset to open tables via connection to respository
    rs.Open "SELECT UserMapping.WindowsLogin, UserMapping.DeptID, UserMapping.EMPStatus, PositionCodes.SecurityLevel FROM PositionCodes INNER JOIN UserMapping ON PositionCodes.PositionCode = UserMapping.PositionCode WHERE (((UserMapping.WindowsLogin)='" & _
         UserName() & "'));", conn, adOpenDynamic, adLockReadOnly
    '0 means not allowed into DB due to Position Code in UserMapping table not in PositionCode table.
    If rs.EOF = True Then
        Security_Lvl = 0
    Else
        Security_Lvl = rs
    End If
    Exit Function
Err_Security_Lvl:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Function SetProperties(strPropName As String, varPropType As Variant, varPropValue As Variant) As Integer
    On Error GoTo Err_SetProperties
    Dim db As DAO.Database
    Dim prp As DAO.Property
    'Sets the properties of the database
    Set db = CurrentDb
    db.Properties(strPropName) = varPropValue
    SetProperties = True
    Set db = Nothing
    Exit Function
Err_SetProperties:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
    If Err = 3270 Then
        Set prp = db.CreateProperty(strPropName, varPropType, varPropValue)
        db.Properties.Append prp
        Resume Next
    Else
        SetProperties = False
    End If
End Function
 
Public Function TableEnumerator()
    On Error GoTo Err_TableEnumerator
    Dim db As DAO.Database
    Dim tbl As TableDef
    Dim fld As DAO.Field
    Dim rst As DAO.Recordset
    Dim rst2 As DAO.Recordset
    Dim prp As DAO.Property
    'Lists the tables in the database for documentation
    Set db = CurrentDb()
    Set rst = db.OpenRecordset("Table_Enumerations")
    For Each tbl In db.TableDefs
        If tbl.Name <> "Table_Enumerations" Then
            Set rst2 = db.OpenRecordset(tbl.Name)
            For Each fld In rst2.Fields
                For Each prp In fld.Properties
                    On Error Resume Next
                    'Debug.Print tbl.Name & " : " & prp.Name & " : " & prp.Value & " : " & fld.Name
                    With rst
                        .AddNew
                        !TableName = tbl.Name
                        !Field = fld.Name
                        !Attribute = prp.Name
                        !Value = prp.Value
                        .Update
                    End With
                Next
            Next
        End If
    Next
    MsgBox "Tables have been enumerated.", vbOKOnly
    Exit Function
Err_TableEnumerator:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function DB_Verification(Version As Double)
    On Error GoTo Err_DB_Verification
    Dim LocVer As Boolean
    ImportLink
    LocVer = LocVerCheck(Version)
    If LocVer = False Then
        If Left(Application.CurrentProject.path, 3) = "P:\" Then
            DoCmd.Quit
        Else
            MsgBox "The copy of this database you are using is outdated." & vbCr & "Please get a new copy of the database from one of the following locations:" & _
                vbCrLf & vbCrLf & "P:\Public\SI\Shortcuts" & vbCrLf & vbCrLf & _
                 "Or" & vbCrLf & vbCrLf & "P:\Restricted\SI\Shortcuts" & vbCr & _
                vbCr & "If you need assistance, please contact the NBC Serco IT Assist at extension 4417 or 4418.", _
                vbOKOnly, "Obsolete"
            DoCmd.Quit
        End If
        'Copy_Down
    End If
    'test to see if version of access is 2003 or 2010
    If Application.Version = 11 Then
        'if version is 2003 do not turn off ribbons
    Else
        'if version is 2010 then turn off ribbons
        DoCmd.ShowToolbar "Ribbon", acToolbarNo
    End If
    Exit Function
Err_DB_Verification:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
    DoCmd.Quit
End Function
 
Function ImportLink()
    On Error GoTo Err_ImportLink
    Dim wrkDefault As Workspace
    Dim db As Database
    Dim td As DAO.TableDef
    Dim dbsNew As Database
    Set db = CurrentDb
    On Error Resume Next
    Set td = db.TableDefs("sys_Database")
    If Err.Number <> 0 Then
        Err.Clear
        Set wrkDefault = DBEngine.Workspaces(0)
        Set dbsNew = wrkDefault.OpenDatabase("P:\Database\Public\Public BE\ITRepository.mdb", True, False, _
             "MS Access;PWD=NewBeginnings8")
        DoCmd.TransferDatabase acLink, "Microsoft Access", "" & dbsNew.Name & "", acTable, "sys_Database", _
             "sys_Database", , True
    End If
    Exit Function
Err_ImportLink:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
    DoCmd.Quit
End Function
 
Function LocVerCheck(Version As Double)
    On Error GoTo Err_LocVerCheck
    Dim strDBName As String
    Dim db As DAO.Database
    Dim rs As DAO.Recordset
    Set db = CurrentDb()
    Set rs = db.OpenRecordset("SELECT sys_Database.* FROM sys_Database WHERE (((sys_Database.DatabaseName)='" & _
         Application.CurrentProject.Name & "'));", dbOpenDynaset)
    If rs.EOF Then
        If Right(Application.CurrentProject.Name, 9) = "_Test.mdb" Then
            LocVerCheck = True
            Exit Function
        Else
            MsgBox "The name of this database is not recognized in our library. Please notify Serco IT Assistants.", _
                vbOKOnly, "Sys_Database"
            DoCmd.Quit
        End If
    End If
    If rs!copy = True Then
        If (Left(Application.CurrentDb.Name, 3) = "c:\" Or Left(Application.CurrentDb.Name, 3) = "l:\") Then
            If rs!Version = Version Then
                LocVerCheck = True
            Else
                LocVerCheck = False
            End If
        Else
            LocVerCheck = False
        End If
    Else
        LocVerCheck = True
    End If
    Exit Function
Err_LocVerCheck:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
    DoCmd.Quit
End Function
 
Function Copy_Down()
    On Error GoTo Err_Copy_Down
    Dim db As DAO.Database
    Dim rs As DAO.Recordset
    Dim fs As Object
    Dim a As Object
    Set db = CurrentDb()
    Set rs = db.OpenRecordset("SELECT sys_Database.* FROM sys_Database WHERE (((sys_Database.DatabaseName)='" & _
         Application.CurrentProject.Name & "'));", dbOpenDynaset)
    If Dir("L:\Copy_Down\", vbDirectory) = "" Then MkDir ("L:\Copy_Down\")
    If Dir("L:\Copy_Down\updater.bat") <> "" Then Kill "L:\Copy_Down\updater.bat"
    Set fs = CreateObject("Scripting.FileSystemObject")
    Set a = fs.CreateTextFile("L:\Copy_Down\updater.bat", True)
    a.WriteLine ("@Echo 'Please wait while a newer version of your program is copied to your desktop. Thank You.'")
    a.WriteLine ("@echo off")
    a.WriteLine (": start")
    If rs!FEPath <> Application.CurrentDb.Name And InStr(1, Application.CurrentDb.Name, "Test Bed") <> 0 Then
        a.WriteLine ("del " & Chr(34) & Application.CurrentDb.Name & Chr(34) & " / F")
        a.WriteLine ("if errorlevel 1 (goto start)")
    End If
    If InStr(1, Application.CurrentDb.Name, "Test Bed") <> 0 Then
        a.WriteLine ("copy " & Chr(34) & Application.CurrentDb.Name & Chr(34) & " " & _
             Chr(34) & "%userprofile%\Desktop\" & CurDB & Chr(34) & " /y")
    Else
        a.WriteLine ("copy " & Chr(34) & rs!FEPath & Chr(34) & " " & Chr(34) & "%userprofile%\Desktop\" & _
             rs!DatabaseName & Chr(34) & " /y")
    End If
    a.WriteLine ("start /MAX " & Chr(34) & "open" & Chr(34) & " " & Chr(34) & "C:\program files\microsoft office\office11\msaccess.exe" & _
         Chr(34) & " " & Chr(34) & "%userprofile%\Desktop\" & rs!DatabaseName & _
         Chr(34))
    a.Close
    Shell "L:\Copy_Down\Updater.bat", vbHide
    DoCmd.Quit
    Exit Function
Err_Copy_Down:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
    DoCmd.Quit
End Function
 
Public Function Table_Check(strReceipt As Variant, strTempTbl As String, strProdTbl As String)
    On Error GoTo Err_Table_Check
    Dim db As Database
    Dim rs As DAO.Recordset
    Dim rs1 As DAO.Recordset
    Set db = CurrentDb()
    Set rs = db.OpenRecordset("SELECT " & strTempTbl & ".*, " & strTempTbl & ".FileNumber FROM " & _
         strTempTbl & "" & " WHERE (((" & strTempTbl & ".FileNumber)='" & strReceipt & _
         "'));", dbOpenDynaset)
    If rs.RecordCount <> 0 Then
        Set rs1 = db.OpenRecordset(" SELECT " & strTempTbl & ".*" & " FROM " & strTempTbl & _
             " LEFT JOIN " & strProdTbl & " ON (" & strTempTbl & ".FileNumberSeq = " & strProdTbl & _
             ".FileNumberSeq) AND (" & strTempTbl & ".FileNumber = " & strProdTbl & ".FileNumber)" & _
             " WHERE (((" & strTempTbl & ".FileNumber)='" & strReceipt & "') AND ((" & _
             strProdTbl & ".FileNumber) Is Null) AND ((" & strProdTbl & ".FileNumberSeq) Is Null));", _
             dbOpenDynaset)
        If rs1.RecordCount <> 0 Then
            Table_Check = False
        Else
            Table_Check = True
        End If
    Else
        Table_Check = True
    End If
    Exit Function
Err_Table_Check:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Function Table_Check_Batch(strBatch As Variant, strTempTbl As String, strProdTbl As String)
    On Error GoTo Err_Table_Check_Batch
    Dim db As Database
    Dim rs As DAO.Recordset
    Dim rs1 As DAO.Recordset
    Set db = CurrentDb()
    Set rs = db.OpenRecordset("SELECT " & strTempTbl & ".*, " & strTempTbl & ".BatchNumber FROM " & _
         strTempTbl & "" & " WHERE (((" & strTempTbl & ".BatchNumber)=" & strBatch & _
         "));", dbOpenDynaset)
    If rs.RecordCount <> 0 Then
        Set rs1 = db.OpenRecordset("SELECT " & strTempTbl & ".*, " & strTempTbl & ".BatchNumber FROM " & _
             strTempTbl & "" & " LEFT JOIN " & strProdTbl & " ON " & strTempTbl & _
             ".BatchNumber = " & strProdTbl & ".BatchNumber" & " WHERE (((" & strTempTbl & _
             ".BatchNumber)=" & strBatch & ") AND ((" & strProdTbl & ".BatchNumber) Is Null));", _
             dbOpenDynaset)
        If rs1.RecordCount <> 0 Then
            Table_Check_Batch = False
        Else
            Table_Check_Batch = True
        End If
    Else
        Table_Check_Batch = True
    End If
    Exit Function
Err_Table_Check_Batch:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function IsHoliday(sDate)
    On Error GoTo Err_IsHoliday
    'Checks to see if passed date is a holiday
    Dim iDay, iTmpDay, i
    IsHoliday = 0
    iDay = Day(sDate)
    'Check if valid date first
    If IsDate(sDate) Then
        Select Case Month(sDate)
            Case 1 'Jan
                If iDay = 1 Then 'New Years
                    IsHoliday = 1
                Else
                    If iDay = 2 Then 'Make sure new years doesn't fall on sunday.
                        'If so, today is a holiday.
                        If Weekday(DateAdd("d", -1, sDate)) = 1 Then
                            IsHoliday = 1
                        End If
                    Else
                         For i = 0 To 30 'Martin Luther King B-Day
                            If Weekday(DateAdd("d", i, CDate("1/1/" & Year(sDate)))) = 2 Then
                                If CDate(sDate) = CDate(DateAdd("d", i + 14, CDate("1/1/" & Year(sDate)))) Then
                                    IsHoliday = 1
                                End If
                                Exit For 'PG 1/28
                            End If
                        Next
                    End If
                End If
            Case 2 'Feb
                 For i = 0 To 27 'President's Day
                    If Weekday(DateAdd("d", i, CDate("2/1/" & Year(sDate)))) = 2 Then
                        If CDate(sDate) = CDate(DateAdd("d", i + 14, CDate("2/1/" & Year(sDate)))) Then
                            IsHoliday = 1
                        End If
                        Exit For
                    End If
                Next
            Case 3 'Mar
            Case 4 'Apr
            Case 5 'May
                 For i = 1 To 7 'Memorial Day
                    If Weekday(DateAdd("d", "-" & i, CDate("5/31/" & Year(sDate)))) = 2 Then
                        If CDate(sDate) = CDate(DateAdd("d", "-" & i, CDate("5/31/" & Year(sDate)))) Then
                            IsHoliday = 1
                        End If
                        Exit For
                    End If
                Next
            Case 6 'Jun
            Case 7 'Jul
                If iDay = 4 Then 'Independence Day
                    IsHoliday = 1
                Else
                    If iDay = 3 Then 'Make sure Independence Day doesn't
                        'fall on saturday. If so, Friday is a holiday.
                        If Weekday(DateAdd("d", 1, sDate)) = 7 Then
                            IsHoliday = 1
                        End If
                    Else
                        If iDay = 5 Then 'Make sure Independence
                            'Day doesn't fall on sunday. If so, Monday is a holiday.
                            If Weekday(DateAdd("d", -1, sDate)) = 1 Then
                                IsHoliday = 1
                            End If
                        End If
                    End If
                End If
            Case 8 'Aug
            Case 9 'Sep
                 For i = 0 To 13 'Labor Day
                    If Weekday(DateAdd("d", i, CDate("9/1/" & Year(sDate)))) = 2 Then
                        If CDate(sDate) = CDate(DateAdd("d", i, CDate("9/1/" & Year(sDate)))) Then
                            IsHoliday = 1
                        End If
                        Exit For
                    End If
                Next
            Case 10 'Oct
                 For i = 0 To 13 'Columbus Day
                    If Weekday(DateAdd("d", i, CDate("10/1/" & Year(sDate)))) = 2 Then
                        If CDate(sDate) = CDate(DateAdd("d", i + 7, CDate("10/1/" & Year(sDate)))) Then
                            IsHoliday = 1
                        End If
                        Exit For
                    End If
                Next
            Case 11 'Nov
                If iDay = 11 Then 'Veteran's Day
                    IsHoliday = 1
                Else
                    If iDay = 10 Then 'Make sure Veterans Day doesn't fall
                        'on saturday. If so, Friday is a holiday.
                        If Weekday(DateAdd("d", 1, sDate)) = 7 Then
                            IsHoliday = 1
                        End If
                    Else
                        If iDay = 12 Then 'Make sure Veterans Day doesn't
                            'fall on sunday. If so, Monday is a holiday.
                            If Weekday(DateAdd("d", -1, sDate)) = 1 Then
                                IsHoliday = 1
                            End If
                        Else
                             For i = 0 To 28 'Thanksgiving & the Day After
                                If Weekday(DateAdd("d", i, CDate("11/1/" & Year(sDate)))) = 5 Then     'this is the first
                                    'thursday of the month
                                    If DateDiff("d", sDate, DateAdd("d", i + 21, CDate("11/1/" & Year(sDate)))) = 0 Then       'add 3
                                        'weeks to the first to get the 4th (thanksgiving)
                                        IsHoliday = 1
                                        Exit For
                                    End If
                                End If
                                ' If Weekday(DateAdd("d", i, CDate("11/1/" & _
                                ' Year(sDate)))) = 6 Then 'this is the day
                                ' 'after thanksgiving
                                ' If DateDiff("d", sDate, DateAdd("d", i + 21, _
                                ' CDate("11/1/" & Year(sDate)))) = 0 Then
                                ' IsHoliday = 1
                                ' Exit For
                                ' End If
                                ' End If
                            Next
                        End If
                    End If
                End If
            Case 12 'Dec
                If iDay = 25 Then 'Christmas
                    IsHoliday = 1
                Else
                    If iDay = 24 Then 'Make sure Christmas Day doesn't
                        'fall on saturday. If so, Friday is a holiday.
                        If Weekday(DateAdd("d", 1, sDate)) = 7 Then
                            IsHoliday = 1
                        End If
                    Else
                        If iDay = 26 Then 'Make sure Christmas
                            'Day doesn't fall on sunday. If so, Monday is a holiday.
                            If Weekday(DateAdd("d", -1, sDate)) = 1 Then
                                IsHoliday = 1
                            End If
                        Else
                            If iDay = 31 Then 'Make sure new years
                                'doesn't fall on saturday. If so, today is a holiday.
                                If Weekday(DateAdd("d", 1, sDate)) = 7 Then
                                    IsHoliday = 1
                                End If
                            End If
                        End If
                    End If
                End If
            Case Else
                'Do nothing but return false
        End Select
    End If
    Debug.Print IIf(IsHoliday = 1, "Holiday", "Not a Holiday")
    Exit Function
Err_IsHoliday:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function WeekEnd(sDate)
    On Error GoTo Err_WeekEnd
    Dim dayNum As Integer
    dayNum = Weekday(sDate)
    'If 1 returned = BusinessDay; 0 returned = Weekend or Holiday; 2 returned = specifically a Saturday.
    If dayNum > 1 And dayNum < 7 Then
        If IsHoliday(sDate) = False Then
            WeekEnd = 1
        Else
            WeekEnd = 0
        End If
    Else
        If dayNum = 7 Then
            WeekEnd = 2
        Else
            WeekEnd = 0
        End If
    End If
    Debug.Print WeekEnd
    Exit Function
Err_WeekEnd:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Function LeapCheck(strYear As String)
    On Error GoTo Err_LeapCheck
    Dim remainder As Integer
    Dim datYear As Date
    If IsNumeric(strYear) = False Then
        LeapCheck = False
        Exit Function
    Else
        datYear = CInt(strYear)
    End If
    '1.) If the year is evenly divisible by 4, go to step 2. Otherwise, go to step 5.
    '2.) If the year is evenly divisible by 100, go to step 3. Otherwise, go to step 4.
    '3.) If the year is evenly divisible by 400, go to step 4. Otherwise, go to step 5.
    '4.) The year is a leap year (it has 366 days).
    '5.) The year is not a leap year (it has 365 days).
    remainder = datYear Mod 4
    If remainder = 0 Then
        remainder = datYear Mod 100
        If remainder = 0 Then
            remainder = datYear Mod 400
            If remainder = 0 Then
                LeapCheck = True
            Else
                LeapCheck = False
            End If
        Else
            LeapCheck = True
        End If
    Else
        LeapCheck = False
    End If
    Exit Function
Err_LeapCheck:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
'******************************************
'Use this code if you want to change the mouse cursor.
'For instance, to change the standard arrow pointer to a pointing hand (a la hyperlink) --
'If you were to do this for a label on a form, just make sure you have this module in your DB,
'and then insert into the label's On Mouse Move . . . . . [Event Procedure]
'MouseCursor IDC_HAND
'That's all there is to it!
'*******************************************
 
Function MouseCursor(CursorType As Long)
    On Error GoTo Err_MouseCursor
    Dim lngRet As Long
    lngRet = LoadCursorBynum(0&, CursorType)
    lngRet = SetCursor(lngRet)
Err_MouseCursor:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function PointM(strPathToCursor As String)
    On Error GoTo Err_PointM
    Dim lngRet As Long
    lngRet = LoadCursorFromFile(strPathToCursor)
    lngRet = SetCursor(lngRet)
Err_PointM:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Function ReplaceCRLFwithBR(ByVal strText) As String
    On Error GoTo Err_CRLFwithBR
    '=================================================================
    'Replace all vbcrlf with <br> to keep line breaks in html emails
    '=================================================================
    strText = Replace(strText, Chr(13), "<br>")
    strText = Replace(strText, Chr(10), "")
    ReplaceCRLFwithBR = strText
Err_CRLFwithBR:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Function FormatAsHtml(ByVal str) As String
    On Error GoTo Err_FormatAsHtml
    '=================================================================
    'Wraps a string in html tags
    '=================================================================
    FormatAsHtml = "<html><font face=""arial"" size=""2"">" & str & "</font></html>"
Err_FormatAsHtml:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Function GetCSWord(ByVal s, Indx As Integer, Optional strdelimiter = ";") As String
    On Error GoTo Err_GetCSWord
    '=================================================================
    'Returns the nth word in a specific field
    '=================================================================
    On Error Resume Next
    GetCSWord = Split(s, strdelimiter)(Indx - 1)
Err_GetCSWord:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function CountCSWords(ByVal str, Optional strdelimiter = ";") As Integer
    On Error GoTo Err_CountCSWords
    '=================================================================
    'Counts the words in the delimited string
    '=================================================================
    Dim WC As Integer, Pos As Integer
    If VarType(str) <> 8 Or Len(str) = 0 Then
        CountCSWords = 0
        Exit Function
    End If
    WC = 1
    Pos = InStr(str, strdelimiter)
    Do While Pos > 0
        WC = WC + 1
        Pos = InStr(Pos + 1, str, strdelimiter)
    Loop
    CountCSWords = WC
Err_CountCSWords:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Public Sub CreateTextFile(strFullPath As String, strText As String)
    On Error GoTo Err_CreateTextFile
    '=================================================================
    'Creates a text file with the specified file name containing the supplied text
    '=================================================================
    Dim fso As Object
    Dim MyFile As Object
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set MyFile = fso.CreateTextFile(strFullPath, True) 'Creates file, existing file will be overwritten
    MyFile.WriteLine (strText) 'writes string to the file
    MyFile.Close 'close the file
Err_CreateTextFile:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Sub
 
Public Function GetTextFile(ByVal strFile As String) As String
    On Error GoTo Err_GetTextFile
    '=================================================================
    'Returns a string that contains the contents of the specified file
    '=================================================================
    Dim fso As Object
    Dim ts As Object
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set ts = fso.GetFile(strFile).OpenAsTextStream(1, -2)  'Open the file ForReading, Use system default for file format
    GetTextFile = ts.readall 'Read the contents of the file
    ts.Close 'Close the file
Err_GetTextFile:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function
 
Function OpenFormInRemoteMDB(MDBFile As String, FormName As String, Optional ViewMode As Long = acViewNormal)
    On Error GoTo Err_OpenFormInRemoteMDB
    Dim appAccess As Access.Application
    If Len(Dir(MDBFile)) > 0 Then
        Set appAccess = New Access.Application
        With appAccess
            apiSetForegroundWindow .hWndAccessApp
            apiShowWin .hWndAccessApp, SW_MAXIMIZE
            .OpenCurrentDatabase MDBFile
            .DoCmd.Maximize
            .DoCmd.OpenForm FormName , ViewMode
        End With
    End If
    Exit Function
Err_OpenFormInRemoteMDB:
    debugger.Process Application.CurrentObjectName, Erl, Err.Number, Err.Description, ""
End Function