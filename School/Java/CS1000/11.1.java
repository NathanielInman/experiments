ComputeArea.java:
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
}

GeometricObject.java:
public abstract class GeometricObject {
private String color = "white";
private boolean filled;
private java.util.Date dateCreated;

/** Construct a default geometric object */
protected GeometricObject() {
dateCreated = new java.util.Date();
}

/** Return color */
public String getColor() {
return color;
}

/** Set a new color */
public void setColor(String color) {
this.color = color;
}

/** Return filled. Since filled is boolean,
* so, the get method name is isFilled */
public boolean isFilled() {
return filled;
}

/** Set a new filled */
public void setFilled(boolean filled) {
this.filled = filled;
}

/** Get dateCreated */
public java.util.Date getDateCreated() {
return dateCreated;
}

/** Return a string representation of this object */
public String toString() {
return "created on " + dateCreated + "\ncolor: " + color +
" and filled: " + filled;
}

/** Abstract method getArea */
public abstract double getArea();

/** Abstract method getPerimeter */
public abstract double getPerimeter();
}

public Geometricobject(String color, double weight)
{
this.color = color;
this.weight = weight;
}

//getColor()
public String getColor()
{
return color;
}

//setColor
public void setColor(String color)
{
this.color = color;
}

//getWeight
public double getWeight()
{
return weight;
}

//setWeight
public void setWeight(double weight)
{
this.weight = weight;
}

//for find area and perimeter
public abstract double findArea();
public abstract double findPerimeter();
}

//Triangle class extends Geometricobject
class Triangle extends Geometricobject
{
//variable declartion
double side1,side2,side3;
boolean filled;
//findArea()
public double findArea()
{
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
public Triangle(double s1,double s2,double s3)
{
side1=s1;
side2=s2;
side3=s3;
}
public void setFilled(boolean tri)
{
filled = tri;
}
public boolean getFilled()
{
return filled;
}

//findPerimeter()
public double findPerimeter()
{
double perimeter;
//calculatting perimeter
perimeter = (side1 + side2 + side3);
return perimeter;
}
public String toString()
{
return "Triangle: side1 = " + side1 + " side2 = " + side2 + "side3 = " + side3;
}

public static void main(String args[])
{
Triangle tri = new Triangle(1, 1.5, 1);
tri.setColor("yellow");
tri.setFilled(true);

System.out.println("The area is " + tri.findArea());
System.out.println("The perimeter is " + tri.findPerimeter());
System.out.println(" color is " + tri.getColor());
System.out.println("filled " + tri.getFilled());
}
}