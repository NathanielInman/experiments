import java.util.Scanner;

public class DialConverter {
    public static int getNumber(char uppercaseLetter) {
        int number = 0;
        switch (uppercaseLetter) {
            case 'A':
            case 'B':
            case 'C':
               number = 2;
               break;
            case 'D':
            case 'E':
            case 'F':
               number = 3;
               break;
            case 'G':
            case 'H':
            case 'I':
               number = 4;
               break;
            case 'J':
            case 'K':
            case 'L':
               number = 5;
               break;
            case 'M':
            case 'N':
            case 'O':
               number = 6;
               break;
            case 'P':
            case 'Q':
            case 'R':
            case 'S':
               number = 7;
               break;
            case 'T':
            case 'U':
            case 'V':
               number = 8;
               break;
            case 'W':
            case 'X':
            case 'Y':
            case 'Z':
               number = 9;
               break;
        }
        
        return number;
    }

    public static void main(String[] args) {
        System.out.print("Enter a string: ");

        Scanner scanner = new Scanner(System.in);
        String string = scanner.nextLine();
        scanner.close();

        int stringLength = string.length();
        for (int index = 0; index < stringLength; index++) {
            char currChar = string.charAt(index);

            if (Character.isLetter(currChar)) {
               // Make sure the character is uppercase.
               currChar = Character.toUpperCase(currChar);

               // Conver the dialed letter into a number.
               int number = getNumber(currChar);

               // Print the number
               System.out.print(number);
            } else {
               // The character was not a letter, so print it unmodified.
               System.out.print(currChar);
            }
        }
        System.out.println();
    }
}