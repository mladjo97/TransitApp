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

            Console.WriteLine("Press ENTER (RETURN) to stop the loop and close the application.\n");
            Console.ReadLine();
            dispatcher.ShouldStop = true;
        }
    }
}
