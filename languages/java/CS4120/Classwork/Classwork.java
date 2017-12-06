/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package classwork;

/**
 *
 * @author Nate
 */

public class Classwork {
    static Runnable printA,printB,print100;

  static Thread thread1,thread2,thread3;
  static int current;

  public static void main(String[] args) {
    // Create tasks
    printA = new PrintChar('a', 100);
    printB = new PrintChar('b', 100);
    print100 = new PrintNum(100);

    // Create threads
    thread1 = new Thread(printA);
    thread2 = new Thread(printB);
    thread3 = new Thread(print100);

    // Start threads
    current=0;
    thread3.start();
  }
}

// The task for printing a specified character in specified times
class PrintChar implements Runnable {
  private char charToPrint; // The character to print
  private int times; // The times to repeat

  /** Construct a task with specified character and number of
   *  times to print the character
   */
  public PrintChar(char c, int t) {
    charToPrint = c;
    times = t;
  }

  /** Override the run() method to tell the system
   *  what the task to perform
   */
  public void run() {
    for (int i = 0; i < times; i++) {
      System.out.print(charToPrint);
      if(i==0&&Classwork.current==1){
          Classwork.current=2;
          Classwork.thread2.start();
          Classwork.thread1.suspend();
      }else if(i==0&&Classwork.current==2){
          Classwork.current=3;
          Classwork.thread3.resume();
          Classwork.thread2.suspend();
          }
    }
    if(Classwork.current==4){
       Classwork.current=5;
       Classwork.thread1.resume();
    }
  }
}

// The task class for printing number from 1 to n for a given n
class PrintNum implements Runnable {
  private int lastNum;

  /** Construct a task for printing 1, 2, ... i */
  public PrintNum(int n) {
    lastNum = n;
  }

  /** Tell the thread how to run */
  @Override
  public void run() {
    for (int i = 1; i <= lastNum; i++) {
      System.out.print(" " + i);
      

      if (i==1){
          Classwork.current=1;
          Classwork.thread1.start();
          Classwork.thread3.suspend();
      }
	
    }
    if(Classwork.current==3){Classwork.thread2.resume();Classwork.current=4;}
  }
}