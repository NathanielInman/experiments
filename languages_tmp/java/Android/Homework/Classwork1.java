/***************************************
 * Lab :		001					   *
 * Date:		09-12-2013			   *
 * Name:		Nathaniel Inman		   *
 * Program: 32.1					   *
 * This program emulates a line of text*
 * found within the book using threads *
 ***************************************/
 import javax.swing.JFrame;
 import javax.swing.JScrollPane;
 import javax.swing.JTextArea;
public class Classwork1 extends JFrame{
	static Runnable printA,printB,print100;
	static Thread thread1,thread2,thread3;
	static int current; //keeps track of iteration
	private JTextArea pad = new JTextArea();
	
	public static void main(String[] args) {
		Classwork1 frame = new Classwork1();
		frame.setTitle("Classwork 1");
		frame.setSize(300,200);
		frame.setDefaultCloseOperation(3);
		frame.setLocationRelativeTo(null);
		frame.setVisible(true);
	} //end main
	
	public Classwork1(){
		JScrollPane jsp = new JScrollPane(this.pad);
		add(jsp);
		this.pad.setLineWrap(true);
		
		printA = new PrintChar('a', 100);
		printB = new PrintChar('b', 100);
		print100 = new PrintNum(100);
		thread1 = new Thread(printA);
		thread2 = new Thread(printB);
		thread3 = new Thread(print100);
		current=0;
		thread3.start();
	} //end Classwork1
	
	class PrintChar implements Runnable {
		private char charToPrint; // The character to print
		private int times; // The times to repeat

		public PrintChar(char c, int t) {
			charToPrint = c;
			times = t;
		} //end PrintChar

		public void run() {
			for (int i = 0; i < times; i++) {
				Classwork1.this.pad.append(Character.toString(this.charToPrint));
				if(i==0&&Classwork1.current==1){
						Classwork1.current=2;
						Classwork1.thread2.start();
						Classwork1.thread1.suspend();
				}else if(i==0&&Classwork1.current==2){
						Classwork1.current=3;
						Classwork1.thread3.resume();
						Classwork1.thread2.suspend();
				} //end if
			} //end for
			if(Classwork1.current==4){
				 Classwork1.current=5;
				 Classwork1.thread1.resume();
			} //end if
		} //end run()
	} //end PrintChar

	class PrintNum implements Runnable {
		private int lastNum;

		public PrintNum(int n) {
			lastNum = n;
		} //end PrintNum

		@Override
		public void run() {
			for (int i = 1; i <= lastNum; i++) {
				Classwork1.this.pad.append(" " + i);
				if (i==1){
						Classwork1.current=1;
						Classwork1.thread1.start();
						Classwork1.thread3.suspend();
				} //end if
			} //end for
			if(Classwork1.current==3){
				Classwork1.thread2.resume();
				Classwork1.current=4;
			} //end if
		} //end run()
	} //end PrintNum
} //end Classwork

