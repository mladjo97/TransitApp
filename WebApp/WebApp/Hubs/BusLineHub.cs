using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace WebApp.Hubs
{
    [HubName("buslinehub")]
    public class BusLineHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<BusLineHub>();


        public void Hello()
        {
            Clients.All.hello("HELLO");
        }

        public override Task OnConnected()
        {
            Groups.Add(Context.ConnectionId, "Users");
            Hello();
            return base.OnConnected();
        }
    }
}