import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.*;
import javax.swing.JPanel;
import javax.swing.JComponent;
import java.awt.*;
import javax.swing.*;
import java.applet.*;



public class HangmanComponent extends Hangman extends JComponent implements ActionListener

{  
  
 // private String input;
  
  public HangmanComponent()
  {
  
  }
  
   
	public void paintComponent(Graphics g)
	{  

	// Recover Graphics2D
		Graphics2D g2 = (Graphics2D) g;
		
		
	//draw gallows

	//draw upright
	g2.drawLine(20,50,20,200);
	//draw top bar
	g2.drawLine(20,50,95,50);
	//draw noose
	g2.drawLine(95,50,98,90);
		

	//draw head	
	
	
		if (life==7)
	{	
		g2.drawOval(82,95,30,30);
	}
		
	//draw trunk
	if (life>=6)
	{
		g2.drawLine(97,125,97,150);
	}
	//draw arms	(left)
	if (life>=5)
	{
		g2.drawLine(97,125,117,135);
	}
	//right
	if (life>=4)
	{
		g2.drawLine(97,125,77,135);
	}
	
	//draw right leg
	if (life>=3)
	{
		g2.drawLine(97,150,117,183);
	}
	
	//draw left leg
	if (life>2)
	{
		g2.drawLine(97,150,77,183);
	}
	
	//draw feet(left)
	if (life>=1)
	{
 		g2.drawLine(65,179,77,183);
	}
 
 //right foot
	 if (life>=0)
	{
 		g2.drawLine(130,179,117,183);
	}

	
	

	
}	
}	
	


	




/* Pseudocode for Hangman class
	get SecretWord
	display dashes corresponding to secretWord
	Get user to guess letter
	Search secretWord against guessLetter
	Replace dashes with correct guesses
	Decrement lives if incorrect
	Game over if word guessed or no lives remain
*/
	import java.util.*;
	import java.lang.*;

public class Hangman
{
				
		private String secretWord;
		private char[] dashWord;
		private char guessLetter;
	 	private int life, correctAnswer;
		
	
			
	//constructor
	public Hangman(String wordIn)
	{
		life = 8;
		secretWord = wordIn;
	}	 
	
	//keep track of no. of lives left
	public int getLife()
	{
		return life;
	}	
	
	//count correct answers for end of game
	public int getCorrectAnswer()
	{
		return correctAnswer;
	}
		
		//display word in dashes
	public String getDashWord()
	{
		String dash = "";
		for (int i = 0; i<secretWord.length(); i++)
		{
			dash = dash+ dashWord[i];
		}
		return dash;
	}	

	
	//change string to char and fill with dashes
	public void setDashWord()	
	{	
		dashWord = new char[secretWord.length()];
		for (int i=0; i< secretWord.length(); i++)
		{
			dashWord[i]='-';
		}


	}		
	
		
		//word that will be guessed
	public String getSecretWord()
	
	{	

		return secretWord;
	}		
	

	//to find correct/incorrect guess
	public void searchWord(char guessLetter)
	 	{
			boolean charfound = false;
			guessLetter=Character.toLowerCase(guessLetter);
		
		
			for (int i=0; i<secretWord.length(); i++)
			{
				if (guessLetter==secretWord.charAt(i))
			{
				dashWord[i]= guessLetter;
				charfound=true;
				correctAnswer++;
				
			}	
				
				
			}	  
					
				if(!charfound)
 				{					
					life --;
					System.out.println("Number of lives left " +getLife());
				}
			}
			
				//end the game
				public void gameOver()
			{
				if(secretWord.length() == correctAnswer)
				{
					System.out.println("Well done - You Win");
				}
				if(life == 0)
				{
					System.out.println("Game Over, correct Word -  "+getSecretWord().toUpperCase());	
				}	
			}		
			private String wordList[] = 
			{"test", "looking", "safety", "elephant", "spring"};		
}

