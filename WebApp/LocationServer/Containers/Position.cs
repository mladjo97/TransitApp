namespace LocationServer.Containers
{
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
