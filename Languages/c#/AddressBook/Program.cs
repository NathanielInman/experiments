using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AddressBook
{
    class entry
    {
        public entry() { } //empty constructor
        public string Name { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }

    class Program
    {
        static List<entry> Book = new List<entry>();
        private static bool createEntry(string name, string phone, string address)
        {
            entry person = new entry();
            person.Name = name;
            person.Phone = phone;
            person.Address = address;

            Book.Add(person);
            return true;
        }
        private static void printEntry(string name, string phone, string address)
        {
            Console.WriteLine("--------------");
            Console.WriteLine("Name: " + name);
            Console.WriteLine("Phone: " + phone);
            Console.WriteLine("Address: " + address);
            Console.WriteLine("--------------");
        }
        private static void saveBook()
        {
            string lines="";
            foreach (entry person in Book)
            {
                lines += "--------------\r\n";
                lines += person.Name+"\r\n";
                lines += person.Phone+"\r\n";
                lines += person.Address+"\r\n";
            }
            lines += "--------------\r\n";
            System.IO.StreamWriter file = new System.IO.StreamWriter(System.Environment.CurrentDirectory+"\\AddressBook.txt");
            file.WriteLine(lines);
            file.Close();
        }
        static void Main(string[] args)
        {
            var done = false;
            string name, phone, address;
            while (!done)
            {
                Console.WriteLine("My Address Book\n");
                Console.WriteLine("A - Add New Address");
                Console.WriteLine("D - Delete Address");
                Console.WriteLine("M - Modify Address");
                Console.WriteLine("V - View Addresses");
                Console.WriteLine("S - Save Address Book");
                Console.WriteLine("Q - Save and Quit");
                Console.WriteLine("X - Exit without saving");
                string input = System.Console.ReadLine();
                if (input == "A" || input=="a")
                {
                    Console.WriteLine("--Add Entry--");
                    Console.WriteLine("Enter a name: ");
                    name = System.Console.ReadLine();
                    Console.WriteLine("Enter a phone number: ");
                    phone = System.Console.ReadLine();
                    Console.WriteLine("Enter a address: ");
                    address = System.Console.ReadLine();
                    if (createEntry(name, phone, address)) { Console.WriteLine(name + " created successfully."); }
                }
                else if (input == "D" || input == "d")
                {
                    Console.WriteLine("--Delete Entry--");
                    Console.WriteLine("Enter the name or part of the name of the entry to delete: ");
                    name = Console.ReadLine();
                    foreach (entry person in Book)
                    {
                        if (person.Name.IndexOf(name)>=0) //check to see if the name specified is found
                        {
                            Console.WriteLine("Do you want to delete this entry?");
                            printEntry(person.Name,person.Phone,person.Address);
                            Console.Write("(y)es / (n)o : ");
                            phone=Console.ReadLine(); //this is not really a phone number, i just want to avoid creating another variable
                            if (phone == "y")
                            {
                                Book.Remove(person); //remove the current entry
                                Console.WriteLine("Deleted entry successfully.");
                                name = "finished"; //finished successfully
                                break; //exit the foreach or it will throw an exception
                            }
                            else if (phone == "n")
                            {
                                Console.WriteLine("Operation canceled successfully.");
                            }
                            else
                            {
                                Console.WriteLine("Command not recognized, operation canceled.");
                            }
                            name = "finished"; //finished
                        }
                    }
                    if (name != "finished")
                    {
                        Console.WriteLine("Entry was not found.");
                    }
                }
                else if (input == "M" || input == "m")
                {
                    Console.WriteLine("--Modify Entry--");
                    Console.WriteLine("Enter the name or part of the name of the entry to modify: ");
                    name = System.Console.ReadLine();
                    foreach (entry person in Book)
                    {
                        if (person.Name.IndexOf(name) >= 0) //check to see if the name specified is found
                        {
                            Console.WriteLine("Do you want to modify this entry?");
                            printEntry(person.Name, person.Phone, person.Address);
                            Console.Write("(y)es / (n)o : ");
                            phone = Console.ReadLine(); //this is not really a phone number, i just want to avoid creating another variable
                            if (phone == "y")
                            {
                                Console.WriteLine("Enter a name: ");
                                person.Name = System.Console.ReadLine();
                                Console.WriteLine("Enter a phone number: ");
                                person.Phone = System.Console.ReadLine();
                                Console.WriteLine("Enter a address: ");
                                person.Address = System.Console.ReadLine();
                                Console.WriteLine("Modified entry successfully.");
                            }
                            else if (phone == "n")
                            {
                                Console.WriteLine("Operation canceled successfully.");
                            }
                            else
                            {
                                Console.WriteLine("Command not recognized, operation canceled.");
                            }
                            name = "finished"; //finished
                        }
                    }
                    if (name != "finished")
                    {
                        Console.WriteLine("Entry was not found.");
                    }
                }
                else if (input == "V" || input == "v")
                {
                    foreach(entry person in Book)
                    {
                        Console.WriteLine("--------------"); //seperate each entry visibly
                        Console.WriteLine("Name: " + person.Name);
                        Console.WriteLine("Phone: " + person.Phone);
                        Console.WriteLine("Address: " + person.Address);
                    }
                    Console.WriteLine("--------------"); //add to the end of the book entries
                }
                else if (input == "S" || input == "s")
                {
                    saveBook();
                }
                else if (input == "Q" || input == "q")
                {
                    saveBook();
                    Environment.Exit(0); //exit the program
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