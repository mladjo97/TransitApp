using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using WebApp.Models;

namespace LocationServer.ApiClients
{
    public class TransitApiClient
    {
        private readonly HttpClient _client;
        private readonly string _url = "http://localhost:52295/api/BusLines";

        public TransitApiClient()
        {
            _client = new HttpClient();
        }

        public async Task<List<BusLine>> GetBusLines()
        {
            List<BusLine> buslines = new List<BusLine>();
            HttpResponseMessage response = await _client.GetAsync(_url);

            if (response.IsSuccessStatusCode)
            {
                string responseJson = await response.Content.ReadAsStringAsync();
                buslines = JsonConvert.DeserializeObject<List<BusLine>>(responseJson);
            }

            return buslines;
        }
    }
}
