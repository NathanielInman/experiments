/***************************************
 * Lab : 	001						   *
 * Date:	09-12-2013				   *
 * Name:	Nathaniel Inman			   *
 * Program: 32.6					   *
 * This program utilizes multiple	   *
 * threads to coordinate bouncing	   *
 * balls.							   *
 ***************************************/
import java.awt.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.*;

public class Classwork3 {
	public static void main(String[] args) {
		JFrame frame = new BouncingPanel();
		frame.show();
	} //end main
} //end Classwork3
	
class BouncingPanel extends JFrame {
	private JPanel canvas;
	
	public BouncingPanel() {
		setSize(300, 200);
		setTitle("Bounce");

		addWindowListener(new WindowAdapter() {
			public void windowClosing(WindowEvent e) {
				System.exit(0);
			} //end windowClosing
		}); //end addWindowListener

		Container contentPane = getContentPane();
		canvas = new JPanel();
		contentPane.add(canvas, "Center");
		JPanel p = new JPanel();
		addButton(p, "Start", new ActionListener() {
			public void actionPerformed(ActionEvent evt) {
				Ball b = new Ball(canvas);
				b.start();
			} //end actionPerformed
		}); //end addButton

		addButton(p, "Close", new ActionListener() {
			public void actionPerformed(ActionEvent evt) {
				canvas.setVisible(false);
				System.exit(0);
			} //end actionPerformed
		}); //end addButton
		contentPane.add(p, "South");
	} //end BouncingPanel

	public void addButton(Container c, String title, ActionListener a) {
		JButton b = new JButton(title);
		c.add(b);
		b.addActionListener(a);
	} //end addButton
} //end BouncingPanel

class Ball extends Thread {
	private JPanel box;
	private static final int XSIZE = 10;
	private static final int YSIZE = 10;
	private int x = 0;
	private int y = 0;
	private int cx = 2;
	private int cy = 2;
	
	public Ball(JPanel b) { box = b; }

	public void draw() {
		Graphics g = box.getGraphics();
		g.fillOval(x, y, XSIZE, YSIZE);
		g.dispose();
	} //end draw()

	public void move() {
		if (!box.isVisible()) return;
		Graphics g = box.getGraphics();
		g.setXORMode(box.getBackground());
		g.fillOval(x, y, XSIZE, YSIZE);
		x += cx;
		y += cy;
		Dimension d = box.getSize();
		if (x < 0) { x = 0; cx = -cx; }
		if (x + XSIZE >= d.width) { x = d.width - XSIZE; cx = -cx; }
		if (y < 0) { y = 0; cy = -cy; }
		if (y + YSIZE >= d.height) { y = d.height - YSIZE; cy = -cy; }
		g.fillOval(x, y, XSIZE, YSIZE);
		g.dispose();
	} //end move()

	public void run() {
		try {
			draw();
			for (int i = 1; i <= 1000; i++) {
				move();
				sleep(5);
			} //end for
		} catch (InterruptedException e) { }
	} //end run()
} //end Ball
