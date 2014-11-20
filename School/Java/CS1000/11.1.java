/* ComputeArea.java: */

public class ComputeArea {
  public static void main(String[] args) {
    double radius; // Declare radius
    double area; // Declare area

    // Assign a radius
    radius = 20; // New value is radius

    // Compute area
    area = radius * radius * 3.14159;

    // Display results
    System.out.println("The area for the circle of radius " +
    radius + " is " + area);
  }
} //end ComputeArea Class

/* GeometricObject.java: */

public abstract class GeometricObject {
  private String color = "white";
  private boolean filled;
  private java.util.Date dateCreated;

  /** Construct a default geometric object */
  protected GeometricObject() {
    dateCreated = new java.util.Date();
  } //end GeometricObject()

  /** Return color */
  public String getColor() {
    return color;
  } //end getColor()

  /** Set a new color */
  public void setColor(String color) {
    this.color = color;
  } //end setColor()

  /** Return filled. Since filled is boolean,
  * so, the get method name is isFilled */
  public boolean isFilled() {
    return filled;
  } //end isFilled()

  /** Set a new filled */
  public void setFilled(boolean filled) {
    this.filled = filled;
  } //end setFilled()

  /** Get dateCreated */
  public java.util.Date getDateCreated() {
    return dateCreated;
  } //end getDateCreated()

  /** Return a string representation of this object */
  public String toString() {
    return "created on " + dateCreated + "\ncolor: " + color +
    " and filled: " + filled;
  } //end toString()

  /** Abstract method getArea */
  public abstract double getArea();

  /** Abstract method getPerimeter */
  public abstract double getPerimeter();
} //end GeometricObject class

public GeometricObject(String color, double weight){
  this.color = color;
  this.weight = weight;
} //end GeometricObject

//getColor()
public String getColor(){
  return color;
} //end getColor()

//setColor
public void setColor(String color){
  this.color = color;
} //end setColor

//getWeight
public double getWeight(){
  return weight;
} //end getWeight()

//setWeight
public void setWeight(double weight){
  this.weight = weight;
} //end setWeight

//for find area and perimeter
public abstract double findArea();
public abstract double findPerimeter();
}

//Triangle class extends Geometricobject
class Triangle extends Geometricobject{
  //variable declaration
  double side1,side2,side3;
  boolean filled;

  //findArea()
  public double findArea(){
    //varaible declartion
    double area,s;
    //calculatting s
    s = ( side1 + side2 + side3 ) /2;
    //calculatting area
    area = Math.sqrt(s * (s-side1) * (s-side2) * (s-side3));
    //return area
    return area;
  }//end findArea()

  //Triangle
  public Triangle(double s1,double s2,double s3){
    side1=s1;
    side2=s2;
    side3=s3;
  } //end Triangle()

  public void setFilled(boolean tri){
    filled = tri;
  } //end setFilled()

  public boolean getFilled(){
    return filled;
  } //end getFilled()

  //findPerimeter()
  public double findPerimeter(){
    double perimeter;
    //calculatting perimeter
    perimeter = (side1 + side2 + side3);
    return perimeter;
  } //end findPerimeter()

  public String toString(){
    return "Triangle: side1 = " + side1 + " side2 = " + side2 + "side3 = " + side3;
  } //end toString()

  public static void main(String args[]){
    Triangle tri = new Triangle(1, 1.5, 1);
    tri.setColor("yellow");
    tri.setFilled(true);

    System.out.println("The area is " + tri.findArea());
    System.out.println("The perimeter is " + tri.findPerimeter());
    System.out.println(" color is " + tri.getColor());
    System.out.println("filled " + tri.getFilled());
  } //end main()
} //end Triangle class