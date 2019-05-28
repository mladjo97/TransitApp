using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using WebApp.Models;
using WebApp.Persistence;

namespace WebApp.Providers
{
    public class CustomOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            ApplicationUserManager userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();
            context.OwinContext.Response.Headers.Add("Access-Control-Expose-Headers", new[] { "Role", "UserId" });
            ApplicationUser user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.!!!!");
                return;
            }

            // Added for role
            var db = new ApplicationDbContext();
            var userRole = user.Roles.FirstOrDefault().RoleId;
            var roleName = db.Roles.FirstOrDefault(a => a.Id == userRole);
            db.Dispose();

            if (roleName.Name.Equals("Admin"))
            {
                context.OwinContext.Response.Headers.Add("Role", new[] { "Admin" });
            }
            else
            {
                if (roleName.Name.Equals("TicketInspector"))
                {
                    context.OwinContext.Response.Headers.Add("Role", new[] { "TicketInspector" });
                }
                else
                {
                    context.OwinContext.Response.Headers.Add("Role", new[] { "User" });
                }
            }

            // Added for user id
            context.OwinContext.Response.Headers.Add("UserId", new[] { user.Id.ToString() });

            //if (!user.EmailConfirmed)
            //{
            //    context.SetError("invalid_grant", "AppUser did not confirm email.");
            //    return;
            //}

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, "JWT");
          
            var ticket = new AuthenticationTicket(oAuthIdentity, null);

            context.Validated(ticket);
        }
    }
}