import java.awt.*;
import javax.swing.*;
import java.util.*;

public class FOURFANS extends JPanel{
  private static int  n=0;
  private static int  e=90;
  private static int  s=180;
  private static int  w=270;
  
  protected void paintComponent(Graphics c){
    super.paintComponents(c);
    
    //Initialize parameters
    int circleRadius = (int)(Math.min(getWidth(), getHeight()) * 0.5);
    int xCenter = getWidth() / 2;
    int yCenter = getHeight() / 2; 
    int x = xCenter - circleRadius;
    int y = yCenter - circleRadius;
    
    //Draw circle
    c.setColor(Color.black);
    c.drawOval(xCenter - circleRadius, yCenter - circleRadius, 2 * circleRadius, 2 * circleRadius);
    
    c.fillArc(x, y, 2 * circleRadius, 2 * circleRadius, n, 30);
    c.fillArc(x, y, 2 * circleRadius, 2 * circleRadius, e, 30);
    c.fillArc(x, y, 2 * circleRadius, 2 * circleRadius, s, 30);
    c.fillArc(x, y, 2 * circleRadius, 2 * circleRadius, w, 30);
  } //end paintComponent()
  
  public static void moveFan(){
    n = (n + 20) % 360;
    e = (e + 20) % 360;
    s = (s + 20) % 360;
    w = (w + 20) % 360;
  } //end moveFan()
} //end FOURFANS class

