import javax.swing.*;
import java.awt.*;

public class Checkers {
  
  JFrame window = new JFrame();
  Control control = null;
  
  JPanel row1 = new JPanel();
  JButton start = new JButton("Start");
  JComboBox difficulty = new JComboBox();
  JCheckBox AI = new JCheckBox("AI");
  
  JPanel row2 = new JPanel();
  Cell[][] cell = null;
  
  boolean currentStatus=true;
  
  public Checkers(){
    control = new Control(this);
    cell = new Cell[8][8];
    window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    window.setSize(300,370);
    window.setResizable(false);
    FlowLayout layout = new FlowLayout();
    window.setLayout(layout);
    
    FlowLayout layout1 = new FlowLayout();
    row1.setLayout(layout1);
    difficulty.addItem("Easy");
    difficulty.addItem("Normal");
    difficulty.addItem("Hard");
    row1.add(difficulty);
    row1.add(AI);
    AI.setSelected(false);
    row1.add(start);
    window.add(row1);
    
    GridLayout layout2 = new GridLayout(8,8);
    row2.setLayout(layout2);
    for(int x =0; x < 8; x++){
      currentStatus = (currentStatus ==true? false:true); //if the status is true, then it'll turn to false and vis-versa 
      for(int y=0; y < 8; y++){
        cell[x][y] = new Cell();
        currentStatus = (currentStatus ==true? false:true); //if the status is true, then it'll turn to false and vis-versa
        cell[x][y].isBlack = (currentStatus==true?false:true); //draws it either black or leave it
        row2.add(cell[x][y]);
      } //end for
    } //end for
    row2.setPreferredSize(new Dimension(32*8,32*8));
    window.add(row2);
    
    start.addActionListener(control);
    window.setVisible(true);
  } //end Checkers()
  
  public static void main(String[] args) {
    Checkers game = new Checkers();
  } //end main()
} //end Checkers Class

class Cell extends JPanel
{
  int pieceType=0;
  boolean isBlack=false;
  Piece piece = null;
  JLayeredPane layer = new JLayeredPane();
  public Cell()
  {
    layer.setPreferredSize(new Dimension(31,31));
    piece = new Piece(this,pieceType);
    layer.add(piece,10);
  }
  public void paintComponent(Graphics g)
  {
    super.paintComponents(g);
    if(pieceType!=0)
    {
      layer.setLayer(piece, 10);
    }
    if(isBlack==true)
    {
      g.setColor(Color.black);
      g.fillRect(0, 0, 31, 31);
    }
    else
    {
      g.setColor(Color.white);
      g.fillRect(0, 0, 31, 31);
    }
  }
  
}

class Piece extends JComponent
{
  Cell control = null;
  int pieceType=0;
  public Piece(Cell control, int piece)
  {
    this.control = control;
    pieceType = piece;
  }
  
  public void paintComponent(Graphics g)
  {
    super.paintComponents(g);
    if(pieceType ==1)
    {
      g.setColor(Color.darkGray);
    }
    else
    {
      g.setColor(Color.red);
    }
    g.fillOval(0, 0, 31, 31);
  }
}