using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.BindingModels;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Tickets")]
    public class TicketsController : ApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private ApplicationUserManager _userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        public TicketsController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize(Roles = "User, Controller, Admin")]
        public IHttpActionResult Get([FromUri]int ticketId)
        {
            Ticket ticket = _unitOfWork.TicketRepository.Get(ticketId);
            if(ticket == null)
            {
                return BadRequest();
            }

            return Ok(ticket);
        }
            
        [HttpPost]
        [Route("Buy")]
        [Authorize(Roles = "User")]
        public IHttpActionResult BuyTicket(BuyTicketBindingModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            ApplicationUser currentUser = UserManager.FindById(User.Identity.GetUserId());

            foreach(var userTicket in currentUser.Tickets)
            {
                if(userTicket.IsValid && userTicket.ItemId.Equals(model.ItemId))
                {
                    return Conflict();
                }
            }

            Ticket ticket = new Ticket()
            {
                UserId = currentUser.Id,
                ItemId = model.ItemId,
                TimeOfPurchase = DateTime.Now,
                IsValid = true
            };

            _unitOfWork.TicketRepository.Add(ticket);
            _unitOfWork.Complete();
            return Ok(ticket);
        }

    }
}
