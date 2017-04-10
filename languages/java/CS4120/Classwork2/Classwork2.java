/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package classwork2;

/**
 *
 * @author Nate
 */

public class Classwork2 {
        private Integer sum = new Integer(0);
    	public static void main(String[] args) {
		Classwork2 test = new Classwork2();
		System.out.println("Without synchronization: " + test.sum);    
                Classwork2synchronization test2 = new Classwork2synchronization();
                test2.run();
                System.out.println("With synchronization: " + test2.sum);
	}

	public Classwork2() {
		java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newFixedThreadPool(1000);
		for (int i = 0; i < 1000; i++) {
			executor.execute(new Classwork2.SumTask());
		}
		executor.shutdown();
	}

         static class Classwork2synchronization implements Runnable{
             static Integer sum = new Integer(0);
            java.util.concurrent.ExecutorService executor = java.util.concurrent.Executors.newFixedThreadPool(1000); 
            @Override
            public synchronized void run(){
                for(int i = 0; i < 1000; i++){
                    executor.execute(new Classwork2.SumTask2());
                }      
                executor.shutdown();
            }
        }
         
         static class SumTask2 implements Runnable {
                @Override
		public void run() {
			int value = Classwork2synchronization.sum.intValue() + 1;
			Classwork2synchronization.sum = new Integer(value);
		}
	}
	class SumTask implements Runnable {
		SumTask() {}
                @Override
		public void run() {
			int value = Classwork2.this.sum.intValue() + 1;
			Classwork2.this.sum = new Integer(value);
		}
	}
}
