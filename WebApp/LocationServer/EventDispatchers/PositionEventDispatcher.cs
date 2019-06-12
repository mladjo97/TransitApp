using LocationServer.ApiClients;
using LocationServer.Containers;
using System;
using System.Collections.Generic;
using WebApp.Models;

namespace LocationServer.EventDispatchers
{
    public class PositionEventDispatcher
    {
        private readonly TransitApiClient _transitApiClient;
        private readonly OpenRouteApiClient _openRouteApiClient;

        public PositionEventDispatcher()
        {
            _transitApiClient = new TransitApiClient();
            _openRouteApiClient = new OpenRouteApiClient();
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

                    for (int i = 0; i < busLineStation.Value.Capacity - 1; i++)
                    {
                        Console.WriteLine($"Getting routes for stations: ({busLineStation.Value[i].Name} - {busLineStation.Value[i+1].Name})");

                        positions.AddRange(_openRouteApiClient.GetRoutePositions(busLineStation.Value[i].Lon,
                                                                                         busLineStation.Value[i].Lat,
                                                                                         busLineStation.Value[i + 1].Lon,
                                                                                         busLineStation.Value[i + 1].Lat)
                                                                                         .Result);
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
