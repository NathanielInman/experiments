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
            <div style='margin-bottom:20px;font-size:2em;font-weight:800;width:600px;text-align:center;'>
            <p>
                <% 
                    String commandRequest=request.getParameter("hiddenCMD");
                    String studentID=request.getParameter("studentID"); 
                    String studentCategory=request.getParameter("studentCategory");
                    String scholarshipAmount=request.getParameter("scholarshipAmount");
                    String studentName=request.getParameter("studentName");
                    String advisorID=request.getParameter("advisorID");
                    String message="Student Database";
                    String messageResponse="";
                    int failedEvents=0;
                    if(commandRequest==null)commandRequest="null";
                    if(commandRequest.equals("search")){
                         studentCategory=RetrieveUser.getCategory(studentID);
                        if(studentCategory.equals("Failure")){
                            messageResponse+="Failed to load students category.<br/>";
                            studentCategory="";failedEvents++;
                        }
                        scholarshipAmount=RetrieveUser.getScholarshipAmount(studentID);
                        if(scholarshipAmount.equals("Failure")){
                            messageResponse+="Failed to load students scholarship amount.<br/>";
                            scholarshipAmount="";failedEvents++;
                        }
                        studentName=RetrieveUser.getStudentsName(studentID);
                        if(studentName.equals("Failure")){
                            messageResponse+="Failed to load students name.<br/>";
                            studentName="";failedEvents++;
                        }
                        advisorID=RetrieveUser.getAdvisorID(studentID);
                        if(advisorID.equals("Failure")){
                            messageResponse+="Failed to load students advisor id.<br/>";
                            advisorID="";failedEvents++;
                        }
                        if(failedEvents==0){
                            messageResponse="All data was successfully loaded.";
                        }
                    }else if(commandRequest.equals("null")){
                        messageResponse="Initialized successfully.";
                        studentID="";
                        studentCategory="0";
                        scholarshipAmount="";
                        studentName="";
                        advisorID="";
                    }else if(commandRequest.equals("save")){
                        String updateResponse="";
                        //updateResponse=RetrieveUser.setCategory(studentID,studentCategory);
                        //if(updateResponse.equals("Failure")){messageResponse+="Failed to update category.<br/>";failedEvents++;}
                        updateResponse=RetrieveUser.setScholarshipAmount(studentID,scholarshipAmount);
                        if(updateResponse.equals("Failure")){messageResponse+="Failed to update scholarship.<br/>";failedEvents++;}
                        updateResponse=RetrieveUser.setStudentsName(studentID,studentName);
                        if(updateResponse.equals("Failure")){messageResponse+="Failed to update name.<br/>";failedEvents++;}
                        updateResponse=RetrieveUser.setAdvisorID(studentID,advisorID);
                        if(updateResponse.equals("Failure")){messageResponse+="Failed to update advisor ID.<br/>";failedEvents++;}
                        /*
                        if(failedEvents==0){
                            messageResponse="All data was successfully updated.";
                        } */
                    }else if(commandRequest.equals("new")){
                        String appendResponse="";
                        appendResponse=RetrieveUser.appendData(studentCategory,scholarshipAmount,studentName,advisorID);
                        if(appendResponse.equals("Failure")){
                            messageResponse="Failed to add the new student.";
                        }else{
                            messageResponse="New user was added successfully.";
                        } //end if
                    }
                %>
                <%=message%>
            </p></div>
            <p><span style='float:left;width:300px;'>Student ID <input id="studentID" name="studentID" value='<%=studentID%>'/></span>
               <span style=''>Student Category 
                   <select id='studentCategory' name='studentCategory'>
                     <option value="SelectCategory">Select Category</option>
                     <option value="freshman">Freshman</option>
                     <option value="sophomore">Sophomore</option>
                     <option value="junior">Junior</option>
                     <option value="senior">Senior</option>
                     <option value="graduate">Graduate</option>
                   </select>
               </span>
            </p>
            <p><span style='float:left;width:300px;'>Scholarship Amount<input id="scholarshipAmount" name="scholarshipAmount" value='<%=scholarshipAmount%>'/></span>
               <span style=''>Student's Name <input id="studentName" name="studentName" value='<%=studentName%>'/></span>
            </p>
            <div style='float:left;width:600px;height:300px;text-align:center;margin-bottom:30px;'>
                <p>Advisor ID <input id="advisorID" name="advisorID" value='<%=advisorID%>'/></p>
                <button id='searchBtn' style="width:100px;height:30px;" onmousedown="document.getElementById('hiddenCMD').value='search';">Search</button>
                <button id='newBtn' style="width:100px;height:30px;" onmousedown="document.getElementById('hiddenCMD').value='new';">New</button>
                <button id='saveBtn' style="width:100px;height:30px;" onmousedown="document.getElementById('hiddenCMD').value='save';">Save</button>
                <div style='width:100%;height:200px;background-color:#AAA;margin-top:30px;border:2px solid #666;'>
                    <div style='font-size:2em;font-weight:800;width:100%;background-color:#CCC;border-bottom:2px solid black;'>System Message</div>
                    <%=messageResponse%>
                </div>
            </div>
            <input id='hiddenCMD' name='hiddenCMD' style='visibility:hidden;'/>
        </form>
        <script>
                var condition=<%=studentCategory%>;
                document.getElementById("studentCategory").selectedIndex=condition;
                if(condition===0){ //the user doesn't exist (it's not possible to have a category of 0)
                    document.getElementById("newBtn").style.visibility="hidden";
                    document.getElementById("saveBtn").style.visibility="hidden";
                } //end if
        </script>
    </body>
</html>

