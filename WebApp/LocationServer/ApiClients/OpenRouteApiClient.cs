using LocationServer.Containers;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Linq;
using System.Collections;
using System;

namespace LocationServer.ApiClients
{
    public class OpenRouteApiClient
    {
        private readonly HttpClient _client;
        private static readonly string _apiKey = "5b3ce3597851110001cf6248edec42468e2d4638b315cfa63438cb40";
        private static readonly string _url = $"https://api.openrouteservice.org/v2/directions/driving-car?api_key={_apiKey}";

        public OpenRouteApiClient()
        {
            _client = new HttpClient();
        }

        public async Task<List<Position>> GetRoutePositions(decimal startLon, decimal startLat, decimal endLon, decimal endLat)
        {
            List<Position> positions = new List<Position>();

            string start = $"{startLon.ToString(CultureInfo.InvariantCulture)},{startLat.ToString(CultureInfo.InvariantCulture)}";
            string end = $"{endLon.ToString(CultureInfo.InvariantCulture)},{endLat.ToString(CultureInfo.InvariantCulture)}";

            HttpResponseMessage response = await _client.GetAsync($"{_url}&start={start}&end={end}");

            if (response.IsSuccessStatusCode)
            {
                string responseJson = await response.Content.ReadAsStringAsync();

                // ooh boy
                JObject parsedObject = JObject.Parse(responseJson);
                JEnumerable<JToken> featuresJson = parsedObject["features"].Children();
                List<JToken> geometryJson = featuresJson["geometry"].Children().ToList();
                var coordinatesJson = geometryJson[0];

                string coordinates = JsonConvert.SerializeObject(coordinatesJson);
                string coordinatesProperJson = "{" + coordinates + "}";
                RootObject pos = new RootObject();

                try
                {
                    pos = JsonConvert.DeserializeObject<RootObject>(coordinatesProperJson);
                }
                catch (Exception e)
                {
                    return positions;
                }

                foreach (var position in pos.Coordinates)
                {
                    positions.Add(new Position(position[0], position[1]));
                    Console.WriteLine($"Added [{position[0]}, {position[1]}]");
                }
            }

            return positions;
        }
    }
}
