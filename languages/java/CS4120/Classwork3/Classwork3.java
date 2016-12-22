/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package classwork3;

/**
 *
 * @author Nate
 */
import java.awt.Container;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class Classwork3 {
  public static void main(String[] args) {
    JFrame frame = new BounceThreadFrame();
    frame.show();
  }
}

class BounceThreadFrame extends JFrame {
  public BounceThreadFrame() {
    setSize(300, 200);
    setTitle("Bounce");

    addWindowListener(new WindowAdapter() {
      public void windowClosing(WindowEvent e) {
        System.exit(0);
      }
    });

    Container contentPane = getContentPane();
    canvas = new JPanel();
    contentPane.add(canvas, "Center");
    JPanel p = new JPanel();
    addButton(p, "Start", new ActionListener() {
      public void actionPerformed(ActionEvent evt) {
        Ball b = new Ball(canvas);
        b.start();
      }
    });

    addButton(p, "Close", new ActionListener() {
      public void actionPerformed(ActionEvent evt) {
        canvas.setVisible(false);
        System.exit(0);
      }
    });
    contentPane.add(p, "South");
  }

  public void addButton(Container c, String title, ActionListener a) {
    JButton b = new JButton(title);
    c.add(b);
    b.addActionListener(a);
  }

  private JPanel canvas;
}

class Ball extends Thread {
  public Ball(JPanel b) {
    box = b;
  }

  public void draw() {
    Graphics g = box.getGraphics();
    g.fillOval(x, y, XSIZE, YSIZE);
    g.dispose();
  }

  public void move() {
    if (!box.isVisible())
      return;
    Graphics g = box.getGraphics();
    g.setXORMode(box.getBackground());
    g.fillOval(x, y, XSIZE, YSIZE);
    x += dx;
    y += dy;
    Dimension d = box.getSize();
    if (x < 0) {
      x = 0;
      dx = -dx;
    }
    if (x + XSIZE >= d.width) {
      x = d.width - XSIZE;
      dx = -dx;
    }
    if (y < 0) {
      y = 0;
      dy = -dy;
    }
    if (y + YSIZE >= d.height) {
      y = d.height - YSIZE;
      dy = -dy;
    }
    g.fillOval(x, y, XSIZE, YSIZE);
    g.dispose();
  }

  public void run() {
    try {
      draw();
      for (int i = 1; i <= 1000; i++) {
        move();
        sleep(5);
      }
    } catch (InterruptedException e) {
    }
  }

  private JPanel box;
  private static final int XSIZE = 10;
  private static final int YSIZE = 10;
  private int x = 0;
  private int y = 0;
  private int dx = 2;
  private int dy = 2;
}
