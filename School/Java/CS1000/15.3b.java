import java.awt.event.*;
public class Control implements ItemListener, ActionListener{
	Checkers game;
	
	int[][] theBoard = new int[8][8];
	
	public Control(Checkers game)
	{
		this.game = game;
	}
	public void actionPerformed(ActionEvent input) {
	Object current = input.getSource();
	if(current.equals(game.start))
	{
		game.AI.setEnabled(false);
		game.difficulty.setEnabled(false);
		game.start.setEnabled(false);
		//Sets up the board for player 2
		theBoard[7][0] = 1;
		theBoard[7][2] = 1;
		theBoard[7][4] = 1;
		theBoard[7][6] = 1;
		theBoard[6][1] = 1;
		theBoard[6][3] = 1;
		theBoard[6][5] = 1;
		theBoard[6][7] = 1;
		theBoard[5][0] = 1;
		theBoard[5][2] = 1;
		theBoard[5][4] = 1;
		theBoard[5][6] = 1;
		//Sets up the board for player 1
		theBoard[0][1] = 2;
		theBoard[0][3] = 2;
		theBoard[0][5] = 2;
		theBoard[0][7] = 2;
		theBoard[1][0] = 2;
		theBoard[1][2] = 2;
		theBoard[1][4] = 2;
		theBoard[1][6] = 2;
		theBoard[2][1] = 2;
		theBoard[2][3] = 2;
		theBoard[2][5] = 2;
		theBoard[2][7] = 2;
		
		for(int x = 0; x < 8;x++)
		{
			for(int y=0; y < 8; y++)
			{
			game.cell[x][y].pieceType = theBoard[x][y];
			game.cell[x][y].repaint();
			}
		}
	}
	}

	@Override
	public void itemStateChanged(ItemEvent arg0) {
		// TODO Auto-generated method stub
		
	}

}