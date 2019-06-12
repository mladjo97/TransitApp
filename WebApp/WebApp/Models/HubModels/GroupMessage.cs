using System.Collections.Generic;

namespace WebApp.Models.HubModels
{
    public class GroupMessage
    {
        public string GroupName { get; set; }
        public List<Position> Coordinates { get; set; }
    }

    public class Position
    {
        public decimal Lon { get; set; }
        public decimal Lat { get; set; }

        public Position() { }

        public Position(decimal lon, decimal lat)
        {
            this.Lon = lon;
            this.Lat = lat;
        }
    }
}