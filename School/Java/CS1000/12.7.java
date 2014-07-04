import javax.swing.*;
import java.awt.*;
import javax.swing.border.*;
import java.util.Random; // Add this for random number generating.

public class Exercise13_7 extends JFrame {
  public Exercise13_7() {
	// Lets create an array of labels so we can generate numbers and easily reference labels through the index value.
	JLabel[] labels = new JLabel[9];
	
	// Setup our images
	Icon o = new ImageIcon("c:\\java\\o.gif");
	Icon x = new ImageIcon("c:\\java\\cross.gif");

	setLayout(new GridLayout(3, 3));
	
	// Create a loop which will...
	// 1. Load the array with a JLabel instance
	// 2. Set the boarder for that JLabel
	// 3. Add the JLabel to the JFrame
	for (int i = 0; i < 9; i++) {
		labels[i] = new JLabel();
		labels[i].setBorder(new LineBorder(Color.BLUE,1));
		add(labels[i]);
	}
	
	int count = 0;
	int num = 0;
	int toggle = 1;
	Random r = new Random();
	
	// Loop until we reach all nine spots are filled (0-8)
	while (count < 9) {
		do {
			// Create a random number and keep generating until we run into a label which doesn't have an icon set
			num = r.nextInt(9);
		} while (labels[num].getIcon() != null);
		
		// This toggles between X's and O's. If it is 1, we place the X. If it is 0, then we place the O.
		if (toggle == 1) {
			labels[num].setIcon(x);
			toggle = 0;
		}
		else { labels[num].setIcon(o); toggle = 1; }
		
		// Lastly, increment the count. The loop stops when we have filled all 9 spots.
		count++;
	}
  }

  public static void main(String[] args) {
    Exercise13_7 frame = new Exercise13_7();

   frame.setTitle("Exercise13_7");
    //JFrame frame = new JFrame("MyFrame"); // Create a frame
    frame.setTitle("Exercise13_7 " + "TicTacToe");
    frame.setSize(400, 300); // Set the frame size
    frame.setLocationRelativeTo(null); // New since JDK 1.4
    frame.pack();
    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    frame.setLocationRelativeTo(null); // Center the frame
    frame.setVisible(true);
  }
}

