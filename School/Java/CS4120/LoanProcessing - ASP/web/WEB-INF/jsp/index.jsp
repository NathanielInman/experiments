<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Welcome to Spring Web MVC project</title>
    </head>

    <body>
        <form action="${pageContext.request.contextPath}/MyServlet" method="post">
            Compute Loan Payment<br/><br/>
            Loan Amount <input id="loanAmt" name="loanAmt" value="10000"/><br/>
            Annual Interest Rate <input id="interestRate" name="interestRate" value="3.5"/><br/>
            Number of Years <input id="years" name="years" value="30"/><br/>
            <button type='submit' name='submitBtn' style='width:200px;height:25px'>Compute Loan Payment</button><button style='width:100px;height:25px' onclick="document.getElementById('loanAmt').value='';document.getElementById('interestRate').value='';document.getElementById('years').value='';">Reset</button>
        </form>
    </body>
</html>
