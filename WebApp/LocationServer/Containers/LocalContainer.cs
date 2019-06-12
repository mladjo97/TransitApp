using System;
using System.Collections.Generic;
using WebApp.Models;
using WebApp.Models.HubModels;

namespace LocationServer.Containers
{
    public sealed class LocalContainer
    {

        private static LocalContainer _instance = null;
        private static readonly object lockObject = new object();

        private static List<BusLine> _busLines = null;
        private static Dictionary<int, List<Station>> _busLineStations = null;
        private static Dictionary<int, List<Position>> _buslineRoutes = null;

        public static List<BusLine> BusLines
        {
            get
            {
                return _busLines;
            }

            set
            {
                _busLines = value;
            }
        }

        public static Dictionary<int, List<Position>> BusLinesRoutes
        {
            get
            {
                return _buslineRoutes;
            }

            set
            {
                _buslineRoutes = value;
            }
        }

        public static Dictionary<int, List<Station>> BusLineStations
        {
            get
            {
                return _busLineStations;
            }

            set
            {
                _busLineStations = value;
            }
        }

        public static LocalContainer Instance
        {
            get
            {
                lock(lockObject)
                {
                    if(_instance == null)
                    {
                        _instance = new LocalContainer();
                    }

                    return _instance;
                }
            }
        }


        LocalContainer()
        {
            _busLines = new List<BusLine>();
            _buslineRoutes = new Dictionary<int, List<Position>>();
            _busLineStations = new Dictionary<int, List<Station>>();
        }


        public void SetBusLines(List<BusLine> buslines)
        {
            BusLines = buslines;
        }

        public List<BusLine> GetBusLines()
        {
            return BusLines;
        }

        public void SetBusLineStations(int busLineId, List<Station> stations)
        {
            if (!BusLineStations.ContainsKey(busLineId))
            {
                BusLineStations.Add(busLineId, stations);
            }
        }

        public List<Station> GetBusLineStations(int busLineId)
        {
            if (BusLineStations.ContainsKey(busLineId))
            {
                return BusLineStations[busLineId];
            }

            return null;
        }

        public void SetBusLineRoutes(int busLineId, List<Position> positions)
        {
            if (!BusLinesRoutes.ContainsKey(busLineId))
            {
                BusLinesRoutes.Add(busLineId, positions);
            }
        }

        public List<Position> GetBusLineRoute(int busLineId)
        {
            if (BusLinesRoutes.ContainsKey(busLineId))
            {
                return BusLinesRoutes[busLineId];
            }

            return null;
        }

        public Dictionary<int, List<Station>> GetBusLineStations()
        {
            return BusLineStations;
        }

        public Dictionary<int, List<Position>> GetBusLineRoutes()
        {
            return BusLinesRoutes;
        }

        /// <summary>
        /// Use this to map every busline with its stations
        /// </summary>
        /// <returns></returns>
        public bool OrganizeBusLineContainer()
        {
            try
            {
                foreach (var busline in BusLines)
                {
                    List<Station> stations = new List<Station>();

                    foreach (var buslineStations in busline.BusLineStations)
                    {
                        stations.Add(buslineStations.Station);
                    }

                    SetBusLineStations(busline.Id, stations);
                }
            }
            catch (Exception)
            {
                return false;
            }

            return true;
        }
        

    }
}
