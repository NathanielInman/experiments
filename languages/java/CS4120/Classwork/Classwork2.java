/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package classwork;

/**
 *
 * @author Nate
 */
public class Classwork2 {
	private Integer sum = new Integer(0);

	public static void main(String[] args) {
		Classwork2 test = new Classwork2();
		System.out.println("What is sum ? " + test.sum);
	}

	public Classwork2() {
		java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newFixedThreadPool(1000);
		for (int i = 0; i < 1000; i++) {
			executor.execute(new Classwork2.SumTask());
		}
		executor.shutdown();
	}

	class SumTask implements Runnable {
		SumTask() {}

		public void run() {
			int value = Classwork2.this.sum.intValue() + 1;
			Classwork2.this.sum = new Integer(value);
		}
	}
}
