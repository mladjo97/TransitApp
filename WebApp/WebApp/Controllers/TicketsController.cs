using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.BindingModels;
using WebApp.Models.ViewModels;
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
        public IHttpActionResult Get()
        {
            ApplicationUser currentUser = _unitOfWork.UserRepository.GetUserById(User.Identity.GetUserId());
            IEnumerable<Ticket> tickets = _unitOfWork.TicketRepository.GetUserTickets(currentUser.Id);

            if (tickets == null)
            {
                return BadRequest();
            }

            List<TicketInfoViewModel> ticketInfos = new List<TicketInfoViewModel>();

            foreach(var ticket in tickets)
            {
                var ticketInfo = new TicketInfoViewModel()
                {
                    TicketId = ticket.Id,
                    IsValid = ticket.IsValid,
                    TicketType = ticket.Item.TicketType.Name,
                    TimeOfPurchase = ticket.TimeOfPurchase,
                    UserFirstName = ticket.User.FirstName,
                    UserLastName = ticket.User.LastName
                };
                ticketInfos.Add(ticketInfo);
            }

            return Ok(ticketInfos);
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

            var ticketInfo = new TicketInfoViewModel()
            {
                TicketId = ticket.Id,
                IsValid = ticket.IsValid,
                TicketType = ticket.Item.TicketType.Name,
                TimeOfPurchase = ticket.TimeOfPurchase,
                UserFirstName = ticket.User.FirstName,
                UserLastName = ticket.User.LastName
            };

            return Ok(ticket);
        }

        [HttpPost]
        [Route("Validate")]
        [Authorize(Roles = "TicketInspector, Admin")]
        public IHttpActionResult ValidateTicket([FromUri]int ticketId)
        {
            Ticket ticket = _unitOfWork.TicketRepository.GetTicket(ticketId);

            if (ticket == null)
            {
                return BadRequest();
            }

            var ticketInfo = new TicketInfoViewModel()
            {
                TicketId = ticket.Id,
                IsValid = ticket.IsValid,
                TicketType = ticket.Item.TicketType.Name,
                TimeOfPurchase = ticket.TimeOfPurchase,
                UserFirstName = ticket.User.FirstName,
                UserLastName = ticket.User.LastName
            };

            bool isValid = _unitOfWork.TicketRepository.IsValid(ticket);
            
            if (isValid)
            {
                return Ok(ticket);
            }

            ticket.IsValid = ticketInfo.IsValid  = isValid;
            _unitOfWork.TicketRepository.Update(ticket);

            try
            {
                _unitOfWork.Complete();
            } 
            catch(Exception e)
            {
                return InternalServerError();
            }

            return Ok(ticketInfo);
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

            ApplicationUser currentUser = _unitOfWork.UserRepository.GetUserById(User.Identity.GetUserId());

            IEnumerable<Ticket> tickets = _unitOfWork.TicketRepository.GetUserTickets(currentUser.Id);
            foreach (var userTicket in tickets)
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
