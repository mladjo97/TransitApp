using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Owin;
using TransitAPI.Models;
using static TransitAPI.Models.Enums;

[assembly: OwinStartup(typeof(TransitAPI.Startup))]

namespace TransitAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            ConfigureAuth(app);            
        }

    }
}
