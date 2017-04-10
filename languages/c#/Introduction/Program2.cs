using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarApplication
{
    interface IVehicle
    {
        string make { get; set; }
        string model { get; set; }
        string color { get; set; }
        string nickname { get; set; }
        string license { get; set; }
        string category { get; set; }
        int price { get; set; }
        int year { get; set; }
        string value
        {
            get { return String.Format("{0:C}", (year / 10) * price); }
        }
        string worth
        {
            get { return String.Format("{0:C}", price); }
        }
    }
    public class Car : IComparable,IVehicle
    {
        public string make { get; set; }
        public string model { get; set; }
        public string color { get; set; }
        public string nickname { get; set; }
        public string license { get; set; }
        public string category { get { return "Car"; } }
        public int price { get; set; }
        public int year { get; set; }
        public string value
        {
            get { return String.Format("{0:C}", (year / 10) * price); }
        }
        public string worth
        {
            get { return String.Format("{0:C}", price); }
        }
        public Car(String Make, String Model, String Color, String Nickname, String License, int Price, int Year)
        {
            make = Make;
            model = Model;
            color = Color;
            nickname = Nickname;
            license = License;
            price = Price;
            year = Year;
        }
        public int CompareTo(object obj)
        {
            if (obj is Car)
            {
                Car c = (Car)obj;
                return year.CompareTo(c.year);
            }
            else
            {
                throw new Exception("That's not a car.");
            }
        }
    }
    public class CompactCar : Car
    {
        public string category { get { return "Compact Car"; } }
    }
    public class MidSizeCar : Car
    {
        public string category { get { return "Mid-size Car"; } }
    }
    public class FullSizeCar : Car
    {
        public string category { get { return "Full-size Car"; } }
    }
    public class Truck : IComparable, IVehicle
    {
        public string make { get; set; }
        public string model { get; set; }
        public string color { get; set; }
        public string nickname { get; set; }
        public string license { get; set; }
        public string category { get { return "Truck"; } }
        public int price { get; set; }
        public int year { get; set; }
        public string value
        {
            get { return String.Format("{0:C}", (year / 10) * price); }
        }
        public string worth
        {
            get { return String.Format("{0:C}", price); }
        }
        public Truck(String Make, String Model, String Color, String Nickname, String License, int Price, int Year)
        {
            make = Make;
            model = Model;
            color = Color;
            nickname = Nickname;
            license = License;
            price = Price;
            year = Year;
        }
        public int CompareTo(object obj)
        {
            if (obj is Truck)
            {
                Truck c = (Truck)obj;
                return year.CompareTo(c.year);
            }
            else
            {
                throw new Exception("That's not a truck.");
            }
        }
    }
    public class SUV : IComparable, IVehicle
    {
        public string make { get; set; }
        public string model { get; set; }
        public string color { get; set; }
        public string nickname { get; set; }
        public string license { get; set; }
        public string category { get { return "SUV"; } }
        public int price { get; set; }
        public int year { get; set; }
        public string value
        {
            get { return String.Format("{0:C}", (year / 10) * price); }
        }
        public string worth
        {
            get { return String.Format("{0:C}", price); }
        }
        public SUV(String Make, String Model, String Color, String Nickname, String License, int Price, int Year)
        {
            make = Make;
            model = Model;
            color = Color;
            nickname = Nickname;
            license = License;
            price = Price;
            year = Year;
        }
        public int CompareTo(object obj)
        {
            if (obj is SUV)
            {
                SUV c = (SUV)obj;
                return year.CompareTo(c.year);
            }
            else
            {
                throw new Exception("That's not a SUV.");
            }
        }
    }
    class Garage
    {
        protected SortedSet<Car> Cars = new SortedSet<Car>();
        private static void printCar(Car car)
        {
            Console.WriteLine("--------------");
            Console.WriteLine("-(IN  GARAGE)-");
            Console.WriteLine("Make    : " + car.make);
            Console.WriteLine("Model   : " + car.model);
            Console.WriteLine("Color   : " + car.color);
            Console.WriteLine("Nickname: " + car.nickname);
            Console.WriteLine("License : " + car.license);
            Console.WriteLine("Price   : " + car.worth);
            Console.WriteLine("Value   : " + car.value);
            Console.WriteLine("Year    : " + car.year);
            Console.WriteLine("--------------");
        }
        public virtual void printAllCars()
               {
                   foreach (Car car in Cars)
                   {
                       Console.WriteLine("--------------"); //seperate each entry visibly
                       Console.WriteLine("Make    : " + car.make);
                       Console.WriteLine("Model   : " + car.model);
                       Console.WriteLine("Color   : " + car.color);
                       Console.WriteLine("Nickname: " + car.nickname);
                       Console.WriteLine("License : " + car.license);
                       Console.WriteLine("Price   : " + car.worth);
                       Console.WriteLine("Value   : " + car.value);
                       Console.WriteLine("Year    : " + car.year);
                   }
                   Console.WriteLine("--------------"); //add to the end of the book entries
               }
        public virtual void Add(Car car)
        {
            Cars.Add(car);
        }
        public virtual void RemoveExplicit(Car car)
        {
            Cars.Remove(car);
        }
        public virtual bool RemoveUnknown(string nickname)
        {
            foreach (Car car in Cars)
            {
                if (car.nickname.IndexOf(nickname) >= 0) //check to see if the name specified is found
                {
                    Console.WriteLine("Do you want to destroy this car?");
                    printCar(car);
                    Console.Write("(y)es / (n)o : ");
                    nickname = Console.ReadLine(); //this is not really a phone number, i just want to avoid creating another variable
                    if (nickname == "y")
                    {
                        Cars.Remove(car); //remove the current entry
                        Console.WriteLine("Destroyed car successfully.");
                        nickname = "finished"; //finished successfully
                        break; //exit the foreach or it will throw an exception
                    }
                    else if (nickname == "n")
                    {
                        Console.WriteLine("Operation canceled successfully.");
                    }
                    else
                    {
                        Console.WriteLine("Command not recognized, operation canceled.");
                    }
                    nickname = "finished"; //finished
                }
            }
            if (nickname == "finished") { return true; } else { return false; }
        }
        public virtual Car find(string nickname)
        {
            foreach (Car car in Cars)
            {
                if (car.nickname.IndexOf(nickname) >= 0) //check to see if the name specified is found
                {
                    return car;
                }
            }
            return null;
        }
        public int current { get; set; }
        public int maximum { get; set; }
    }
    class Program
    {
        static SortedSet<Car> Cars = new SortedSet<Car>();
        static Garage myGarage = new Garage();
        private static Car createCar(string make, string model, string color, string nickname, string license, int price, int year)
        {
            Car current = new Car(make,model,color,nickname,license,price,year);
            Cars.Add(current);
            Console.WriteLine(current.nickname + " added successfully to the lot outside garage.");
            return current;
        }
        private static void parkCar(Car car)
        {
            myGarage.current++;
            Console.WriteLine("Added " + car.nickname + " to the garage.");
            myGarage.Add(car);
            Cars.Remove(car);
        }
        private static void printCar(Car car)
        {
            Console.WriteLine("--------------");
            Console.WriteLine("Make    : " + car.make);
            Console.WriteLine("Model   : " + car.model);
            Console.WriteLine("Color   : " + car.color);
            Console.WriteLine("Nickname: " + car.nickname);
            Console.WriteLine("License : " + car.license);
            Console.WriteLine("Price   : " + car.worth);
            Console.WriteLine("Year    : " + car.year);
            Console.WriteLine("Value   : " + car.value);
            Console.WriteLine("--------------");
        }
        static void setupGarage() //start off with 5 cars in the garage and park them individually
        {
            myGarage.maximum = 10;
            Console.WriteLine("--------------");
            Console.WriteLine("Your initial garage size is 10.");
            Console.WriteLine("--------------");
            parkCar(createCar("Chevrolet", "Chevelle Super Sport", "Black", "Libby's Chevelle", "LIB410", 50000, 1969));
            parkCar(createCar("Dodge", "Charger RT", "Lime Green", "Christine's Charger", "F4D8R7", 48000, 1970));
            parkCar(createCar("Porche", "Spyder 918", "Silver", "Nate's Spyder", "BRK010", 850000, 2013));
            parkCar(createCar("Bentley", "Mulsanne Mulliner", "White", "Lydia's Mulsanne", "G8H59R", 300000, 2013));
            parkCar(createCar("Lexus", "RX450h", "Pearl", "Elizabeth's RX", "W7BH91", 47000, 2012));
            Console.WriteLine("--------------");
            Console.WriteLine("There are currently 5 cars in your garage.");
            Console.WriteLine("--------------");
        }
        static void Main(string[] args)
        {
            var done = false;
            string make="", model="", color="", nickname="",license="";
            int year,price;
            myGarage.current = 0; //initialize the current number of cars in the garage to 0
            setupGarage();
            while (!done)
            {
                Console.WriteLine("[[ Main Command List ]]\n");
                Console.WriteLine("A - Add New Car to lot outside of garage");
                Console.WriteLine("D - Destroy A Car in or outside of garage");
                Console.WriteLine("M - Move a car to garage");
                Console.WriteLine("R - Remove a car from the garage");
                Console.WriteLine("I - Increase size of garage by 1");
                Console.WriteLine("V - View cars outside garage in the lot");
                Console.WriteLine("G - View cars inside garage");
                Console.WriteLine("X - Exit the program");
                string input = System.Console.ReadLine();
                if (input == "A" || input == "a") //Add New Car
                {
                    Console.WriteLine("--Add Car--");
                    Console.WriteLine("Enter a make: ");make = Console.ReadLine();
                    Console.WriteLine("Enter a model: "); model = Console.ReadLine();
                    Console.WriteLine("Enter a color: "); color = Console.ReadLine();
                    Console.WriteLine("Enter a nickname: "); nickname = Console.ReadLine();
                    Console.WriteLine("Enter a year: "); year = int.Parse(Console.ReadLine());
                    Console.WriteLine("Enter a price: "); price = int.Parse(Console.ReadLine());
                    Console.WriteLine("Enter a license: "); license = Console.ReadLine();
                    createCar(make, model, color, nickname, license, price, year);
                }
                else if (input == "D" || input == "d") //Destroy A Car
                {
                    Console.WriteLine("--Destroy Car--");
                    Console.WriteLine("Enter the nickname or part of the nickname of the car to destroy: ");
                    nickname = Console.ReadLine();
                    foreach (Car car in Cars)
                    {
                        if (car.nickname.IndexOf(nickname) >= 0) //check to see if the name specified is found
                        {
                            Console.WriteLine("Do you want to destroy this car?");
                            printCar(car);
                            Console.Write("(y)es / (n)o : ");
                            model = Console.ReadLine(); //this is not really a model, i just want to avoid creating another variable
                            if (nickname == "y")
                            {
                                Cars.Remove(car); //remove the current entry
                                Console.WriteLine("Destroyed car successfully.");
                                model = "finished"; //finished successfully
                                break; //exit the foreach or it will throw an exception
                            }
                            else if (model == "n")
                            {
                                Console.WriteLine("Operation canceled successfully.");
                            }
                            else
                            {
                                Console.WriteLine("Command not recognized, operation canceled.");
                            }
                            model = "finished"; //finished
                        }
                    }
                    if (model != "finished")
                    {
                        if (myGarage.RemoveUnknown(nickname) != true)
                        {
                            Console.WriteLine("Could not find the car specified either in the garage, or outside of it.");
                        }
                    }     
                }
                else if (input == "I" || input == "i")
                {
                    Console.WriteLine("You increase the size of your car from {0} to {1} successfully.", myGarage.maximum++, myGarage.maximum);
                }
                else if (input == "M" || input == "m") //Move
                {
                    if (myGarage.current < myGarage.maximum)
                    {
                        Console.WriteLine("--Move car into garage--");
                        Console.WriteLine("Enter the nickname or part of the nickname of the car to move: ");
                        nickname = System.Console.ReadLine();
                        foreach (Car car in Cars)
                        {
                            if (car.nickname.IndexOf(nickname) >= 0) //check to see if the name specified is found
                            {
                                Console.WriteLine("Do you want to move this car to the garage?");
                                printCar(car);
                                Console.Write("(y)es / (n)o : ");
                                nickname = Console.ReadLine();
                                if (nickname == "y")
                                {
                                    parkCar(car);
                                    break;
                                }
                                else if (nickname == "n")
                                {
                                    Console.WriteLine("Operation canceled successfully.");
                                }
                                else
                                {
                                    Console.WriteLine("Command not recognized, operation canceled.");
                                }
                            }
                            else
                            {
                                Console.WriteLine("Car was not found.");
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine("Your Garage is full.");
                    }
                }
                else if (input == "R" || input == "r") //Remove a car from the garage
                {
                    Console.WriteLine("--Move car into garage--");
                    Console.WriteLine("Enter the nickname or part of the nickname of the car to move: ");
                    nickname = System.Console.ReadLine();
                    var theCar = myGarage.find(nickname);
                    if (theCar != null)
                    {
                        Console.WriteLine("Do you want to move this car to the garage?");
                        printCar(theCar);
                        Console.Write("(y)es / (n)o : ");
                        nickname = Console.ReadLine();
                        if (nickname == "y")
                        {
                            Cars.Add(theCar);
                            myGarage.RemoveExplicit(theCar);
                            myGarage.current--;
                        }
                        else if (nickname == "n")
                        {
                            Console.WriteLine("Operation canceled successfully.");
                        }
                        else
                        {
                            Console.WriteLine("Command not recognized, operation canceled.");
                        }
                        nickname = "finished"; //finished
                    }
                    else { Console.WriteLine("Could not find the specified car within the garage."); }
                }
                else if (input == "V" || input == "v")
                {
                    if (Cars.Count == 0)
                    {
                        Console.WriteLine("--------------");
                        Console.WriteLine("You currently have no cars in the lot, try looking in the garage (G/g command).");
                        Console.WriteLine("--------------");
                    }
                    else
                    {
                        foreach (Car car in Cars)
                        {
                            Console.WriteLine("--------------"); //seperate each entry visibly
                            Console.WriteLine("Make    : " + car.make);
                            Console.WriteLine("Model   : " + car.model);
                            Console.WriteLine("Color   : " + car.color);
                            Console.WriteLine("Nickname: " + car.nickname);
                            Console.WriteLine("License : " + car.license);
                            Console.WriteLine("Price   : " + car.worth);
                            Console.WriteLine("Value   : " + car.value);
                            Console.WriteLine("Year    : " + car.year);
                        }
                        Console.WriteLine("--------------"); //add to the end of the book entries
                    }
                }
                else if (input == "G" || input == "g")
                {
                    if (myGarage.current == 0)
                    {
                        Console.WriteLine("--------------");
                        Console.WriteLine("-GARAGE EMPTY-");
                        Console.WriteLine("Occupied = {0}/{1}", myGarage.current, myGarage.maximum);
                        Console.WriteLine("--------------");
                    }
                    else
                    {
                        myGarage.printAllCars();
                        Console.WriteLine("--------------");
                        Console.WriteLine("Occupied = {0}/{1}", myGarage.current, myGarage.maximum);
                        Console.WriteLine("--------------");
                    }
                }
                else if (input == "X" || input == "x")
                {
                    Environment.Exit(0);
                }
                else
                {
                    Console.WriteLine("Invalid command.");
                }
            }
        }
    }
}