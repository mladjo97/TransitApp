using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using System.Threading.Tasks;
using WebApp.Models.HubModels;

namespace WebApp.Hubs
{
    [HubName("buslinehub")]
    public class BusLineHub : Hub
    {
        private static IHubContext hubContext = GlobalHost.ConnectionManager.GetHubContext<BusLineHub>();


        public void UpdateCoordinates(GroupMessage groupMessage)
        {
            Clients.Group(groupName: groupMessage.GroupName).updateCoordinates(groupMessage.Coordinates);
            //Clients.All.hello(groupMessage.Coordinates);
        }

        public void JoinGroup(string groupName)
        {
            this.Groups.Add(this.Context.ConnectionId, groupName);
        }

        public override Task OnConnected()
        {
            Groups.Add(Context.ConnectionId, "Users");
            return base.OnConnected();
        }
    }
}