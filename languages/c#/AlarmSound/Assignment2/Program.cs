using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Assignment2
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("How many times should the alarm beep? ");
            int num= Console.Read()-'0';
            Console.WriteLine(num);
            for (int tmp = 1; tmp <= num; tmp++) {
                System.Media.SystemSounds.Asterisk.Play();
                System.Threading.Thread.Sleep(500);
            }
        }
    }
}
