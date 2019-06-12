using LocationServer.ApiClients;
using LocationServer.Containers;
using System;
using System.Collections.Generic;
using System.Threading;
using WebApp.Models;
using WebApp.Models.HubModels;

namespace LocationServer.EventDispatchers
{
    public class PositionEventDispatcher
    {
        private readonly TransitApiClient _transitApiClient;
        private readonly OpenRouteApiClient _openRouteApiClient;
        private readonly HubClientDispatcher _hubClient;

        private int _numberOfBuses;
        private Dictionary<int, List<int>> _busIndexes;
        
        public bool ShouldStop { get; set; }

        public PositionEventDispatcher()
        {
            _transitApiClient = new TransitApiClient();
            _openRouteApiClient = new OpenRouteApiClient();
            _hubClient = new HubClientDispatcher();

            ShouldStop = false;
            _busIndexes = new Dictionary<int, List<int>>();
            _numberOfBuses = 3;
        }

        public void DoWork()
        {
            Console.WriteLine("Starting the position event dispatcher ...");
            if (!LoadBusLines())
            {
                Console.WriteLine("There was an error while loading buslines.");
                return;
            }

            if (!LoadBusLineRoutes())
            {
                Console.WriteLine("There was an error while loading busline routes.");
                return;
            }

            // start the main loop
            StartMainLoop();
        }

        /// <summary>
        /// The main loop will call the hub on the web api to send 
        /// the current locations of all buslines
        /// </summary>
        public void StartMainLoop()
        {
            var busLineRoutes = LocalContainer.Instance.GetBusLineRoutes();

            // init bus indexes
            InitBusIndexes(busLineRoutes);

            _hubClient.Connect();
            while (!ShouldStop)
            {
                foreach (var pair in busLineRoutes)
                {
                    List<Position> coordinates = new List<Position>();

                    for(int i = 0; i < _busIndexes[pair.Key].Count; i++)
                    {
                        _busIndexes[pair.Key][i] = (_busIndexes[pair.Key][i] + 1) % pair.Value.Count;
                        int index = _busIndexes[pair.Key][i];
                        Console.WriteLine($"Adding coordinates for index: {index}");

                        coordinates.Add(new Position(lat: pair.Value[index].Lat,
                                                     lon: pair.Value[index].Lon));
                    }

                    _hubClient.SendMessage(new GroupMessage() { GroupName = pair.Key.ToString(), Coordinates = coordinates });
                }

                Thread.Sleep(1000);
            }

            Console.WriteLine("Stopping MainLoop.");
            _hubClient.Stop();
        }

        /// <summary>
        /// Assings initial indexes for positions of the buses for every busline.
        /// </summary>
        /// <param name="routes">Collection of buslines and route positions</param>
        private void InitBusIndexes(Dictionary<int, List<Position>> routes)
        {
            foreach(var pair in routes)
            {
                int numOfPositions = (int)(Math.Floor((decimal)(pair.Value.Count / _numberOfBuses)));

                List<int> indexes = new List<int>();
                int index = 0;
                for(int i = 0; i < _numberOfBuses; i++)
                {
                    indexes.Add(index);
                    index = index + numOfPositions;
                }

                _busIndexes.Add(pair.Key, indexes);
            }
        }

        public bool LoadBusLines()
        {
            try
            {
                Console.WriteLine("Loading buslines ...");

                List<BusLine> buslines = _transitApiClient.GetBusLines().Result;
                LocalContainer.Instance.SetBusLines(buslines);

                Console.WriteLine("Successfully loaded buslines");
            }
            catch(Exception)
            {
                return false;
            }

            if (LocalContainer.Instance.OrganizeBusLineContainer())
            {
                Console.WriteLine("Mapped buslines to their stations.");
            }

            return true;
        }

        public bool LoadBusLineRoutes()
        {
            try
            {
                Console.WriteLine("Loading busline routes ...");

                var buslineStations = LocalContainer.Instance.GetBusLineStations();
                foreach (KeyValuePair<int, List<Station>> busLineStation in buslineStations)
                {
                    Console.WriteLine($"Adding positions for BusLine ID: {busLineStation.Key}");

                    List<Position> positions = new List<Position>();

                    for (int i = 0; i < busLineStation.Value.Count - 1; i++)
                    {
                        Console.WriteLine($"Getting routes for stations: ({busLineStation.Value[i].Name} - {busLineStation.Value[i+1].Name})");

                        List<Position> apiPos = _openRouteApiClient.GetRoutePositions(busLineStation.Value[i].Lon,
                                                                                         busLineStation.Value[i].Lat,
                                                                                         busLineStation.Value[i + 1].Lon,
                                                                                         busLineStation.Value[i + 1].Lat)
                                                                                         .Result;

                        positions.AddRange(apiPos);
                    }
                    
                    LocalContainer.Instance.SetBusLineRoutes(busLineStation.Key, positions);
                }

                Console.WriteLine("Successfully loaded busline routes");
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
    }
}
