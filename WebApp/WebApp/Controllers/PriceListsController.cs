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
    [RoutePrefix("api/PriceLists")]
    public class PriceListsController : ApiController
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

        public PriceListsController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult Get()
        {
            PriceList priceList = _unitOfWork.PriceListRepository.GetActivePriceList();

            return Ok(priceList);
        }

        [HttpGet]
        [Authorize(Roles = "User, TicketInspector, Admin")]
        public IHttpActionResult Get([FromUri]int ticketTypeId)
        {
            TicketType ticketType = _unitOfWork.TicketTypeRepository.Get(ticketTypeId);
            if(ticketType == null)
            {
                return BadRequest();
            }

            IEnumerable<PriceListItem> priceListItems = _unitOfWork.PriceListRepository.GetPriceListItems(ticketTypeId);
            if (priceListItems == null)
            {
                return BadRequest();
            }

            ApplicationUser currentUser = UserManager.FindById(User.Identity.GetUserId());

            PriceListItem userPriceListItem = null;
            bool hasDiscount = false;
            float? discountPrice = null;
            float? discountRate = null;
            foreach(var priceListItem in priceListItems)
            {
                if(priceListItem.Discount != null)
                {
                    if(priceListItem.Discount.UserTypeId == currentUser.UserTypeId)
                    {
                        userPriceListItem = priceListItem;
                        hasDiscount = true;                        
                        break;
                    }
                }
            }

            if (userPriceListItem == null)
            {
                return NotFound();
            }

            if (hasDiscount)
            {
                discountRate = userPriceListItem.Discount.Discount;
                discountPrice = _unitOfWork.PriceListItemRepository.GetDiscountPrice(userPriceListItem.Id);
            }

            TicketPriceViewModel ticketPrice = new TicketPriceViewModel()
            {
                ItemId = userPriceListItem.Id,
                BasePrice = userPriceListItem.BasePrice,
                DiscountPrice = discountPrice,
                HasDiscount = hasDiscount,
                DiscountRate = discountRate
            };

            return Ok(ticketPrice);
                                                                         
        }

        [HttpPost]
        public IHttpActionResult Post(AddPriceListBindingModel model)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // check if there is one pricelist active during this period
            if(!CheckIfDateValid(model.ValidFrom, model.ValidUntil))
            {
                return Conflict();
            }

            PriceList priceList = new PriceList()
            {
                ValidFrom = model.ValidFrom,
                ValidUntil = model.ValidUntil
            };

            foreach(var priceListItem in model.PriceListItems)
            {
                PriceListItem plItem = new PriceListItem()
                {
                    BasePrice = priceListItem.BasePrice,
                    Discount = new UserTypeDiscount() { Discount = priceListItem.Discount / 100, UserTypeId = priceListItem.UserTypeId },
                    TicketTypeId = priceListItem.TicketTypeId
                };

                priceList.PriceListItems.Add(plItem);
            }

            _unitOfWork.PriceListRepository.Add(priceList);

            try
            {
                _unitOfWork.Complete();
            }
            catch(Exception e)
            {
                return InternalServerError();
            }

            return Ok();
        }

        #region Helpers

        private bool CheckIfDateValid(DateTime from, DateTime until)
        {
            bool isValid = true;
            PriceList activePriceList = _unitOfWork.PriceListRepository.GetActivePriceList();
            
            if( activePriceList.ValidFrom <= from && from <= activePriceList.ValidUntil)
            {
                isValid = false;
            }

            if (activePriceList.ValidFrom <= until && until <= activePriceList.ValidUntil)
            {
                isValid = false;
            }

            return isValid;
        }

        #endregion

    }
}
