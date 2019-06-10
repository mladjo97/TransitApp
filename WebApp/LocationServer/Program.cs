using LocationServer.ApiClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LocationServer
{
    class Program
    {
        static void Main(string[] args)
        {
            GetBusLines();

            Console.ReadLine();
        }

        static void GetBusLines()
        {
            TransitApiClient apiClient = new TransitApiClient();

            var buslines = apiClient.GetBusLines();
        }
    }
}
