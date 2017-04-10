import java.util.Scanner;

public class SecurityNumber {
  //main method begins execution of java application
  public static void main(String[] args)  {
    int i;
    boolean isValid=false;
    //Create Scanner to obtain input from command window
    Scanner input = new Scanner(System.in);
    System.out.print("Enter social security number DDD-DD-DDDD: ");
    String SSN=input.nextLine();
    if (SSN.length()==11) {
      for (i=0;i<11;i++){
        if (i==3||i==6) {
          if (SSN.charAt(i)!='-') {
            System.out.println("Invalid SSN");
            isValid=true;
            i=10;
          } //end is '-' if
        } else {
          if (!Character.isDigit(SSN.charAt(i))) {
            System.out.println("Invalid SSN");
            isValid=true;
            i=10;
          } //end is digit if
        } //end if
      } //end for statement
    } else {
      isValid=true;
      System.out.println("Invalid SSN");
    } //end is correct length if
    if (!isValid) { System.out.println("Valid SSN"); }
  } //end main
} //end class