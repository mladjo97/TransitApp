using Microsoft.AspNet.SignalR.Client;
using System;
using WebApp.Models.HubModels;

namespace LocationServer.EventDispatchers
{
    public class HubClientDispatcher
    {
        private const string _url = "http://localhost:52295/";
        private const string _hubName = "buslinehub";
        private readonly HubConnection _connection;
        private readonly IHubProxy _proxy;

        public HubClientDispatcher()
        {
            _connection = new HubConnection(_url);
            _proxy = _connection.CreateHubProxy(_hubName);
        }

        public void Connect()
        {
            _connection.Start().ContinueWith(task => {
                if (task.IsFaulted)
                {
                    Console.WriteLine($"There was an error opening the connection: {task.Exception.GetBaseException()}");
                }
                else
                {
                    Console.WriteLine($"Connected to {_hubName}. ");

                    _proxy.On<string>("hello", param => {
                        Console.WriteLine(param);
                    });
                }
            }).Wait();
        }

        public void SendMessage(GroupMessage groupMessage)
        {
            Console.WriteLine($"Sending coordinates to hub for group: {groupMessage.GroupName}.");
            _proxy.Invoke<string>("Hello", groupMessage).Wait();
        }


        public void Stop() => _connection.Stop();
        

    }
}
