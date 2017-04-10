using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HelloWorld
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Please enter your first name: ");
            var firstName = Console.ReadLine();
            Console.WriteLine("Please enter your last name: ");
            var lastName = Console.ReadLine();
            Console.WriteLine("Hello, " + firstName + " " + lastName + "! Welcome to C#!");
            Console.ReadLine(); //pause
        }
    }
}
