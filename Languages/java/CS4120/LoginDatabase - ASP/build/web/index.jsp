<%-- 
    Document   : index
    Created on : Oct 31, 2013, 11:28:10 AM
    Author     : Nathaniel Inman : 700140843
--%>
<%@page import="Lab3.RetrieveUser"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    </head>
    <body>
        <form method="get" action="index.jsp">
            <p>
                <% 
                    String username=request.getParameter("username"); 
                    String oldPassword=request.getParameter("oldPassword");
                    String newPassword=request.getParameter("newPassword");
                    String confirmPassword=request.getParameter("confirmPassword");
                    String returnActualName="";
                    String message="Change Password";
                    if(username!=null){
                        if(oldPassword==null||newPassword==null||confirmPassword==null){
                            message="Hello "+username+", form incorrectly filled out, please try again.";
                        }else if(newPassword.length()==0){
                            message+=", please enter in your new password.";
                        }else if(confirmPassword.length()==0){
                            message+=", please confirm your new password.";
                        }else if(oldPassword.length()==0){
                            message+=", please enter in your old password.";
                        }else if(!confirmPassword.equals(newPassword)){
                            message+=", your new password and confirmation didn't match.";
                        }else if(newPassword.equals(oldPassword)){
                            message+=", your new password needs to be different than you old one.";
                        }else{
                            returnActualName=RetrieveUser.getName(username,oldPassword,newPassword,confirmPassword);
                            if(returnActualName!="Failure"){
                                message="Hello " + returnActualName+", password change successful!";
                            }else{
                                message="Hello " + username+", the information you entered was incorrect. Please try again.";
                            }
                        }
                    }
                %>
                <%=message%>
            </p>
            <p>Username <input id="username" name="username"/></p>
            <p>Old Password <input id="oldPassword" name="oldPassword" type="password"/></p>
            <p>New Password <input id="newPassword" name="newPassword" type="password"/></p>
            <p>Confirm Password <input id="confirmPassword" name="confirmPassword" type="password"/></p>
            <button style="width:100px;height:30px;" onmousedown="document.getElementById('username').value='';document.getElementById('oldPassword').value='';document.getElementById('newPassword').value='';document.getElementById('confirmPassword').value='';">Reset</button>
            <button style="width:100px;height:30px;">Submit</button>
        </form>
    </body>
</html>

