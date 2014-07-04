/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
import java.util.*;

/**
 *
 * @author Nate
 */
public class PascalsTriangle {
    private static boolean setup=false;
    private static int count=-1;
    private static int triangle[][];
    
    public static Object resizeArray(Object oldArray, int newSize) {
       int oldSize = java.lang.reflect.Array.getLength(oldArray);
       Class elementType = oldArray.getClass().getComponentType();
       Object newArray = java.lang.reflect.Array.newInstance(elementType,newSize);
       int preserveLength = Math.min(oldSize,newSize);

       if (preserveLength > 0) {
          System.arraycopy(oldArray,0,newArray,0,preserveLength);
       }

       return newArray;
    }
    
    /* generic input method to get an integer value */
    public static int getnumber (String prompt){ 
      Scanner in = new Scanner(System.in);
      int  n;
      System.out.println(prompt);
      String result = in.nextLine();
      n = Integer.parseInt(result);
      return (n);
    } //end getnumber
    
    public static int recursivePascalsTriangleArray(int n,int k){
        count++;
        if(!setup){
            triangle= new int[n+1][n+1];
            for(int i=0;i<n+1;i++){
                for(int j=0;j<n+1;j++){
                    triangle[i][j]=0;
                }
            }
            setup=true;
        } //end initial setup
        if(n>1&&k>0&&k<n){
            if(triangle[n-1][k]!=0){
                if(triangle[n-1][k-1]==0){
                    triangle[n-1][k-1]=recursivePascalsTriangleArray(n-1,k-1);
                } //end if
            }else{
                if(triangle[n-1][k-1]!=0){
                    triangle[n-1][k]=recursivePascalsTriangleArray(n-1,k);
                }else{
                    triangle[n-1][k]=recursivePascalsTriangleArray(n-1,k);
                    triangle[n-1][k-1]=recursivePascalsTriangleArray(n-1,k-1);
                } //end if
            } //end if
            return triangle[n-1][k]+triangle[n-1][k-1];
        }else{
                return 1;
        } //end if
    } //end recursivePascalsTriangleArray
    
    public static int recursivePascalsTriangle(int n, int k){
        count++;
        if(n>1&&k>0&&k<n){
            return recursivePascalsTriangle(n-1,k)+recursivePascalsTriangle(n-1,k-1);
        }else{
            return 1;
        } //end if
    } //end recursivePascalsTriangle()
    
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int n,k;
        System.out.println("We will compute C(n,k) using Pascals Triangle.");
        n=getnumber("Enter the value for n: ");
        k=getnumber("Enter the value for k: ");
        System.out.println("Using complete recursion: C("+n+","+k+")="+recursivePascalsTriangle(n,k));
        System.out.println("Took "+count+" calls.");count=-1;
        System.out.println("Using array with recursion: C("+n+","+k+")="+recursivePascalsTriangleArray(n,k));
        System.out.println("Took "+count+" calls.");
    }
}
// Example of several very well-know recursive routines written 
//  in java