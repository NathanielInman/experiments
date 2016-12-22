import java.awt.*;
import javax.swing.*;

public class TESTFOURFANS extends JFrame implements Runnable {
  FOURFANS fan1 = new FOURFANS();
  FOURFANS fan2 = new FOURFANS();
  FOURFANS fan3 = new FOURFANS();
  FOURFANS fan4 = new FOURFANS();

  public TESTFOURFANS(){
    setLayout(new GridLayout(2, 2, 5, 5));
    add(fan1);
    add(fan2);
    add(fan3);
    add(fan4);
    setVisible(true);
    setSize(400,600);
    run();
  } //end TESTFOURFANS method

  public void run(){
    try{
      Thread.sleep(100);

      fan1.moveFan();
      fan2.moveFan();
      fan3.moveFan();
      fan4.moveFan();
      this.repaint();
    }catch (Exception e){
      return;
    } //end try
    run();
  } //end run() method

  
  public static void main(String[] args){
    TESTFOURFANS frame = new TESTFOURFANS();
    
    frame.setSize(400, 200);
    frame.setTitle("FOUR FANS");
    frame.setLocationRelativeTo(null);
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setVisible(true);
  } //end main method()
} //end TESTFOURFANS Class

