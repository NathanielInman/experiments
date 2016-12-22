/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Nathaniel Inman : 700140843
 */
@WebServlet(urlPatterns = {"/MyServlet"})
public class MyServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
        /* Loan Amount <input id="loanAmt" name="loanAmt" value="10000"/><br/>
            Annual Interest Rate <input id="interestRate" name="interestRate" value="3.5"/><br/>
            Number of Years <input id="years" name="years" value="30"/><br/> */
        double loanAmt=Double.parseDouble(request.getParameter("loanAmt"));
        double interestRate=Double.parseDouble(request.getParameter("interestRate"));
        int years=Integer.parseInt(request.getParameter("years"));
        Loan theLoan = new Loan(interestRate,years,loanAmt);
        response.setContentType("text/html");
        PrintWriter out=response.getWriter();
        out.println("<!doctype html>");
        out.println("<head><title>Lab 3 Response</title></head.");
        out.println("<body>");
        out.println("Loan Amount: " + loanAmt);
        out.println("<br/>Annual Interest Rate: "+interestRate);
        out.println("<br/>Number of Years: "+years);
        out.println("<br/>Monthly Payment: "+theLoan.getMonthlyPayment());
        out.println("<br/>Total Payment: "+theLoan.getTotalPayment());
        out.println("</body></html>");
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
