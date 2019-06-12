using LocationServer.EventDispatchers;
using System;
using System.Threading;

namespace LocationServer
{
    class Program
    {
        static void Main(string[] args)
        {
            PositionEventDispatcher dispatcher = new PositionEventDispatcher();

            Thread positionDispatcherWork = new Thread(new ThreadStart(dispatcher.DoWork));
            positionDispatcherWork.Start();

            Console.ReadLine();
        }
    }
}
