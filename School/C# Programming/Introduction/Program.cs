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
        string category { get; }
        int price { get; set; }
        int year { get; set; }
        string value { get; }
        string worth { get; }
    }
    public class Car : IComparable, IVehicle
    {
        public string make { get; set; }
        public string model { get; set; }
        public string color { get; set; }
        public string nickname { get; set; }
        public string license { get; set; }
        public string category { get; set; }
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
        public Car() { }
        public Car(String Make, String Model, String Color, String Nickname, String License, int Price, int Year)
        {
            category = "Car";
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
            if (obj is IVehicle)
            {
                IVehicle c = (IVehicle)obj;
                return value.CompareTo(c.value);
            }
            else
            {
                throw new Exception("That's not a vehicle.");
            }
        }
    }
    public class CompactCar : Car
    {
        public CompactCar(String Make, String Model, String Color, String Nickname, String License, int Price, int Year)
        {
            category = "Compact Car";
            make = Make;
            model = Model;
            color = Color;
            nickname = Nickname;
            license = License;
            price = Price;
            year = Year;
        }
    }
    public class MidSizeCar : Car
    {
         public MidSizeCar(String Make, String Model, String Color, String Nickname, String License, int Price, int Year)
        {
            category = "Mid-size Car";
            make = Make;
            model = Model;
            color = Color;
            nickname = Nickname;
            license = License;
            price = Price;
            year = Year;
        }
    }
    public class FullSizeCar : Car
    {
        public FullSizeCar(String Make, String Model, String Color, String Nickname, String License, int Price, int Year)
        {
            category = "Full Size Car";
            make = Make;
            model = Model;
            color = Color;
            nickname = Nickname;
            license = License;
            price = Price;
            year = Year;
        }
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
            if (obj is IVehicle)
            {
                IVehicle c = (IVehicle)obj;
                return value.CompareTo(c.value);
            }
            else
            {
                throw new Exception("That's not a vehicle.");
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
            if (obj is IVehicle)
            {
                IVehicle c = (IVehicle)obj;
                return value.CompareTo(c.value);
            }
            else
            {
                throw new Exception("That's not a vehicle.");
            }
        }
    }
    class Garage
    {
        protected SortedSet<IVehicle> Vehicles = new SortedSet<IVehicle>();
        private static void printVehicle(IVehicle vehicle)
        {
            Console.WriteLine("--------------");
            Console.WriteLine("-(IN  GARAGE)-");
            Console.WriteLine("Category: " + vehicle.category);
            Console.WriteLine("Make    : " + vehicle.make);
            Console.WriteLine("Model   : " + vehicle.model);
            Console.WriteLine("Color   : " + vehicle.color);
            Console.WriteLine("Nickname: " + vehicle.nickname);
            Console.WriteLine("License : " + vehicle.license);
            Console.WriteLine("Price   : " + vehicle.worth);
            Console.WriteLine("Value   : " + vehicle.value);
            Console.WriteLine("Year    : " + vehicle.year);
            Console.WriteLine("--------------");
        }
        public virtual void printAllVehicles()
        {
            foreach (IVehicle vehicle in Vehicles)
            {
                Console.WriteLine("--------------"); //seperate each entry visibly
                Console.WriteLine("Category: " + vehicle.category);
                Console.WriteLine("Make    : " + vehicle.make);
                Console.WriteLine("Model   : " + vehicle.model);
                Console.WriteLine("Color   : " + vehicle.color);
                Console.WriteLine("Nickname: " + vehicle.nickname);
                Console.WriteLine("License : " + vehicle.license);
                Console.WriteLine("Price   : " + vehicle.worth);
                Console.WriteLine("Value   : " + vehicle.value);
                Console.WriteLine("Year    : " + vehicle.year);
            }
            Console.WriteLine("--------------"); //add to the end of the book entries
        }
        public virtual void Add(IVehicle vehicle)
        {
            Vehicles.Add(vehicle);
        }
        public virtual void RemoveExplicit(IVehicle vehicle)
        {
            Vehicles.Remove(vehicle);
        }
        public virtual bool RemoveUnknown(string nickname)
        {
            foreach (IVehicle vehicle in Vehicles)
            {
                if (vehicle.nickname.IndexOf(nickname) >= 0) //check to see if the name specified is found
                {
                    Console.WriteLine("Do you want to destroy this vehicle?");
                    printVehicle(vehicle);
                    Console.Write("(y)es / (n)o : ");
                    nickname = Console.ReadLine(); //this is not really a phone number, i just want to avoid creating another variable
                    if (nickname == "y")
                    {
                        Vehicles.Remove(vehicle); //remove the current entry
                        Console.WriteLine("Destroyed vehicle successfully.");
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
        public virtual IVehicle find(string nickname)
        {
            foreach (IVehicle vehicle in Vehicles)
            {
                if (vehicle.nickname.IndexOf(nickname) >= 0) //check to see if the name specified is found
                {
                    return vehicle;
                }
            }
            return null;
        }
        public int current { get; set; }
        public int maximum { get; set; }
    }
    class Program
    {
        static SortedSet<IVehicle> Vehicles = new SortedSet<IVehicle>();
        static Garage myGarage = new Garage();
        private static IVehicle createVehicle(string make, string model, string color, string nickname, string license, int price, int year, string category)
        {
            IVehicle current;
            if (category == "car")
            {
                current = new Car(make, model, color, nickname, license, price, year);
                Vehicles.Add(current);
                Console.WriteLine(current.nickname + " added successfully to the lot outside garage.");
                return current;
            }
            else if (category == "truck")
            {
                current = new Truck(make, model, color, nickname, license, price, year);
                Vehicles.Add(current);
                Console.WriteLine(current.nickname + " added successfully to the lot outside garage.");
                return current;
            }
            else if (category == "suv")
            {
                current = new SUV(make, model, color, nickname, license, price, year);
                Vehicles.Add(current);
                Console.WriteLine(current.nickname + " added successfully to the lot outside garage.");
                return current;
            }
            else if (category == "compactCar")
            {
                current = new CompactCar(make, model, color, nickname, license, price, year);
                Vehicles.Add(current);
                Console.WriteLine(current.nickname + " added successfully to the lot outside garage.");
                return current;
            }
            else if (category == "midSizeCar")
            {
                current = new MidSizeCar(make, model, color, nickname, license, price, year);
                Vehicles.Add(current);
                Console.WriteLine(current.nickname + " added successfully to the lot outside garage.");
                return current;
            }
            else if (category == "fullSizeCar")
            {
                current = new FullSizeCar(make, model, color, nickname, license, price, year);
                Vehicles.Add(current);
                Console.WriteLine(current.nickname + " added successfully to the lot outside garage.");
                return current;
            }else{
                current = new Car(make, model, color, nickname, license, price, year);
                Console.WriteLine(current.nickname + " was not added because the category specified was not found: " + category);
                return current;
            }
        }
        private static void parkCar(IVehicle vehicle)
        {
            myGarage.current++;
            Console.WriteLine("Added " + vehicle.nickname + " to the garage.");
            myGarage.Add(vehicle);
            Vehicles.Remove(vehicle);
        }
        private static void printVehicle(IVehicle vehicle)
        {
            Console.WriteLine("--------------");
            Console.WriteLine("Category: " + vehicle.category);
            Console.WriteLine("Make    : " + vehicle.make);
            Console.WriteLine("Model   : " + vehicle.model);
            Console.WriteLine("Color   : " + vehicle.color);
            Console.WriteLine("Nickname: " + vehicle.nickname);
            Console.WriteLine("License : " + vehicle.license);
            Console.WriteLine("Price   : " + vehicle.worth);
            Console.WriteLine("Year    : " + vehicle.year);
            Console.WriteLine("Value   : " + vehicle.value);
            Console.WriteLine("--------------");
        }
        static void setupGarage() //start off with 5 cars in the garage and park them individually
        {
            myGarage.maximum = 10;
            Console.WriteLine("--------------");
            Console.WriteLine("Your initial garage size is "+myGarage.maximum+".");
            Console.WriteLine("--------------");
            parkCar(createVehicle("Chevrolet", "Chevelle Super Sport", "Black", "Libby's Chevelle", "LIB410", 50000, 1969,"car"));
            parkCar(createVehicle("Dodge", "Charger RT", "Lime Green", "Christine's Charger", "F4D8R7", 48000, 1970,"truck"));
            parkCar(createVehicle("Porche", "Spyder 918", "Silver", "Nate's Spyder", "BRK010", 850000, 2013,"suv"));
            parkCar(createVehicle("Bentley", "Mulsanne Mulliner", "White", "Lydia's Mulsanne", "G8H59R", 300000, 2013,"compactCar"));
            parkCar(createVehicle("Lexus", "RX450h", "Pearl", "Elizabeth's RX", "W7BH91", 47000, 2012,"midSizeCar"));
            parkCar(createVehicle("Oldsmobile", "Intrigue", "red", "Lib's new car", "801B8B", 3900, 2000, "fullSizeCar"));
            Console.WriteLine("--------------");
            Console.WriteLine("There are currently "+myGarage.current+" cars in your garage.");
            Console.WriteLine("--------------");
        }
        static void Main(string[] args)
        {
            var done = false;
            string make = "", model = "", color = "", nickname = "", license = "",category="";
            int year, price;
            myGarage.current = 0; //initialize the current number of vehicles in the garage to 0
            setupGarage();
            while (!done)
            {
                Console.WriteLine("[[ Main Command List ]]\n");
                Console.WriteLine("A - Add new vehicle to lot outside of garage");
                Console.WriteLine("D - Destroy a vehicle in or outside of garage");
                Console.WriteLine("M - Move a vehicle to garage");
                Console.WriteLine("R - Remove a vehicle from the garage");
                Console.WriteLine("I - Increase size of garage by 1");
                Console.WriteLine("V - View vehicles outside garage in the lot");
                Console.WriteLine("G - View vehicles inside garage");
                Console.WriteLine("X - Exit the program");
                string input = System.Console.ReadLine();
                if (input == "A" || input == "a") //Add new vehicle
                {
                    Console.WriteLine("--Add Vehicle--");
                    Console.WriteLine("Enter a make: "); make = Console.ReadLine();
                    Console.WriteLine("Enter a model: "); model = Console.ReadLine();
                    Console.WriteLine("Enter a color: "); color = Console.ReadLine();
                    Console.WriteLine("Enter a nickname: "); nickname = Console.ReadLine();
                    Console.WriteLine("Enter a year: "); year = int.Parse(Console.ReadLine());
                    Console.WriteLine("Enter a price: "); price = int.Parse(Console.ReadLine());
                    Console.WriteLine("Enter a license: "); license = Console.ReadLine();
                    Console.WriteLine("Enter a category [car,truck,suv,compactCar,midSizeCar,fullSizeCar]: "); category = Console.ReadLine();
                    if (category == "car" || category == "truck" || category == "compactCar" || category == "midSizeCar" || category == "fullSizeCar")
                    {
                        createVehicle(make, model, color, nickname, license, price, year,category);
                    }
                    else
                    {
                        Console.WriteLine("Incorrect category type.");
                    }
                }
                else if (input == "D" || input == "d") //Destroy a vehicle
                {
                    Console.WriteLine("--Destroy Vehicle--");
                    Console.WriteLine("Enter the nickname or part of the nickname of the vehicle to destroy: ");
                    nickname = Console.ReadLine();
                    foreach (IVehicle vehicle in Vehicles)
                    {
                        if (vehicle.nickname.IndexOf(nickname) >= 0) //check to see if the name specified is found
                        {
                            Console.WriteLine("Do you want to destroy this car?");
                            printVehicle(vehicle);
                            Console.Write("(y)es / (n)o : ");
                            model = Console.ReadLine(); //this is not really a model, i just want to avoid creating another variable
                            if (nickname == "y")
                            {
                                Vehicles.Remove(vehicle); //remove the current entry
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
                            Console.WriteLine("Could not find the vehicle specified either in the garage, or outside of it.");
                        }
                    }
                }
                else if (input == "I" || input == "i")
                {
                    Console.WriteLine("You increase the size of your vehicle from {0} to {1} successfully.", myGarage.maximum++, myGarage.maximum);
                }
                else if (input == "M" || input == "m") //Move
                {
                    if (myGarage.current < myGarage.maximum)
                    {
                        Console.WriteLine("--Move vehicle into garage--");
                        Console.WriteLine("Enter the nickname or part of the nickname of the vehicle to move: ");
                        nickname = System.Console.ReadLine();
                        foreach (IVehicle vehicle in Vehicles)
                        {
                            if (vehicle.nickname.IndexOf(nickname) >= 0) //check to see if the name specified is found
                            {
                                Console.WriteLine("Do you want to move this car to the garage?");
                                printVehicle(vehicle);
                                Console.Write("(y)es / (n)o : ");
                                nickname = Console.ReadLine();
                                if (nickname == "y")
                                {
                                    parkCar(vehicle);
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
                                Console.WriteLine("Vehicle was not found.");
                            }
                        }
                    }
                    else
                    {
                        Console.WriteLine("Your garage is full.");
                    }
                }
                else if (input == "R" || input == "r") //Remove a vehicle from the garage
                {
                    Console.WriteLine("--Move vehicle into garage--");
                    Console.WriteLine("Enter the nickname or part of the nickname of the vehicle to move: ");
                    nickname = System.Console.ReadLine();
                    var theVehicle = myGarage.find(nickname);
                    if (theVehicle != null)
                    {
                        Console.WriteLine("Do you want to move this vehicle to the garage?");
                        printVehicle(theVehicle);
                        Console.Write("(y)es / (n)o : ");
                        nickname = Console.ReadLine();
                        if (nickname == "y")
                        {
                            Vehicles.Add(theVehicle);
                            myGarage.RemoveExplicit(theVehicle);
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
                    else { Console.WriteLine("Could not find the specified vehicle within the garage."); }
                }
                else if (input == "V" || input == "v")
                {
                    if (Vehicles.Count == 0)
                    {
                        Console.WriteLine("--------------");
                        Console.WriteLine("You currently have no vehicles in the lot, try looking in the garage (G/g command).");
                        Console.WriteLine("--------------");
                    }
                    else
                    {
                        foreach (IVehicle vehicle in Vehicles)
                        {
                            Console.WriteLine("--------------"); //seperate each entry visibly
                            Console.WriteLine("Category: " + vehicle.category);
                            Console.WriteLine("Make    : " + vehicle.make);
                            Console.WriteLine("Model   : " + vehicle.model);
                            Console.WriteLine("Color   : " + vehicle.color);
                            Console.WriteLine("Nickname: " + vehicle.nickname);
                            Console.WriteLine("License : " + vehicle.license);
                            Console.WriteLine("Price   : " + vehicle.worth);
                            Console.WriteLine("Value   : " + vehicle.value);
                            Console.WriteLine("Year    : " + vehicle.year);
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
                        myGarage.printAllVehicles();
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