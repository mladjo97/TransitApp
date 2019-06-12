using Newtonsoft.Json;
using System.Collections.Generic;

namespace LocationServer.Containers
{
    public class RootObject
    { 
        [JsonProperty("coordinates")]
        public List<List<decimal>> Coordinates { get; set; }
    }

}
