package Lab3;

import java.sql.*;

public class RetrieveUser {
    public static String getCategory(String studentID) throws SQLException, ClassNotFoundException{
        String queryResult="";
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            ResultSet resultSet = statement.executeQuery("SELECT Categ_ID FROM Student_Table WHERE Student_ID="+studentID+";");
            // Iterate through the result and print the student names
            while (resultSet.next()){
                queryResult=resultSet.getString(1);
                System.out.println(queryResult);
            }
            resultSet.close();
            statement.close();
 
        }
        if(queryResult.length()>0){
            return queryResult;
        }else{
            return "Failure";
        }
    }
    public static String setCategory(String studentID,String category) throws SQLException, ClassNotFoundException{
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            statement.executeUpdate("UPDATE Student_Table SET Student_Table.Categ_ID="+category+" WHERE Student_Table.Student_ID="+studentID+";");
            statement.close();
            return "Success";
        }catch(Exception e){
            return "Failure";
        }
    }
    public static String getScholarshipAmount(String studentID) throws SQLException, ClassNotFoundException{
        String queryResult="";
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            ResultSet resultSet = statement.executeQuery("SELECT Scholarship FROM Student_Table WHERE Student_ID="+studentID+";");
            // Iterate through the result and print the student names
            while (resultSet.next()){
                queryResult=resultSet.getString(1);
                System.out.println(queryResult);
            }
            resultSet.close();
            statement.close();
 
        }
        if(queryResult.length()>0){
            return queryResult;
        }else{
            return "Failure";
        }
    }
    public static String setScholarshipAmount(String studentID,String scholarship) throws SQLException, ClassNotFoundException{
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            statement.executeUpdate("UPDATE Student_Table SET Student_Table.Scholarship="+scholarship+" WHERE Student_Table.Student_ID="+studentID+";");
            statement.close();
            return "Success";
        }catch(Exception e){
            return "Failure";
        }
    }
    public static String getStudentsName(String studentID) throws SQLException, ClassNotFoundException{
        String queryResult="";
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            ResultSet resultSet = statement.executeQuery("SELECT Student_Name FROM Student_Table WHERE Student_ID="+studentID+";");
            // Iterate through the result and print the student names
            while (resultSet.next()){
                queryResult=resultSet.getString(1);
                System.out.println(queryResult);
            }
            resultSet.close();
            statement.close();
 
        }
        if(queryResult.length()>0){
            return queryResult;
        }else{
            return "Failure";
        }
    }
    public static String setStudentsName(String studentID,String name) throws SQLException, ClassNotFoundException{
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            System.out.println(name+":"+studentID+":?");
            //statement.executeUpdate("UPDATE Account SET Account.[password]='"+newPassword+"' WHERE Account.username='"+username+"';");
            statement.executeUpdate("UPDATE Student_Table SET Student_Table.Student_Name='"+name+"' WHERE Student_Table.Student_ID="+studentID+";");
            statement.close();
            return "Success";
        }catch(Exception e){
            return "Failure";
        }
    }
    public static String getAdvisorID(String studentID) throws SQLException, ClassNotFoundException{
        String queryResult="";
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            ResultSet resultSet = statement.executeQuery("SELECT Advisor_ID FROM Student_Table WHERE Student_ID="+studentID+";");
            // Iterate through the result and print the student names
            while (resultSet.next()){
                queryResult=resultSet.getString(1);
                System.out.println(queryResult);
            }
            resultSet.close();
            statement.close();
 
        }
        if(queryResult.length()>0){
            return queryResult;
        }else{
            return "Failure";
        }
    }
    public static String setAdvisorID(String studentID,String advisor) throws SQLException, ClassNotFoundException{
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            statement.executeUpdate("UPDATE Student_Table SET Student_Table.Advisor_ID="+advisor+" WHERE Student_Table.Student_ID="+studentID+";");
            statement.close();
            return "Success";
        }catch(Exception e){
            return "Failure";
        }
    }
    public static String appendData(String studentCategory,String scholarshipAmount,String studentName,String advisorID) throws SQLException, ClassNotFoundException{
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            statement.execute("INSERT INTO Student_Table (Student_Name, Scholarship, Categ_ID, Advisor_ID) VALUES ('"+studentName+"', "+scholarshipAmount+", "+studentCategory+", "+advisorID+");");
            statement.close();
            return "Success";
        }catch(Exception e){
            return "Failure";
        }
    }
}