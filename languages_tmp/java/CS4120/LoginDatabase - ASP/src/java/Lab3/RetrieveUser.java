package Lab3;

import java.sql.*;

public class RetrieveUser {
    public static String username="";
    public static String password="";
    public static String actualName="";
    public static String getName(String sendUsername, String oldPassword, String newPassword, String confirmPassword) throws SQLException, ClassNotFoundException {
        // Load the JDBC driver
        Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
        try (Connection connection = DriverManager.getConnection("jdbc:odbc:Lab3DataSource")) {
            Statement statement = connection.createStatement();
            // Execute a statement
            ResultSet resultSet = statement.executeQuery("SELECT username, password, studentname FROM Account WHERE username='"+sendUsername+"' AND password='"+oldPassword+"';");
            // Iterate through the result and print the student names
            while (resultSet.next()){
                username=resultSet.getString(1);
                password=resultSet.getString(2);
                actualName=resultSet.getString(3);
                System.out.println(username+":"+password+":"+actualName);
            }
            resultSet.close();
            statement.close();
           System.out.println(username+":"+password+":"+actualName);
            // Go ahead and update the password
            if(username.length()>0){
                statement=connection.createStatement();
                statement.executeUpdate("UPDATE Account SET Account.[password]='"+newPassword+"' WHERE Account.username='"+username+"';");
            }
        }
        if(username.length()>0){
            return actualName;
        }else{
            return "Failure";
        }
    }
}