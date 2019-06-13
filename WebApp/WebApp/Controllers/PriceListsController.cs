using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
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
        [Route("All")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult GetAll()
        {
            IEnumerable<PriceList> priceLists = _unitOfWork.PriceListRepository.GetAllPriceLists();
            List<PriceListViewModel> priceListsInfo = new List<PriceListViewModel>();

            foreach (var priceList in priceLists)
            {
                List<PriceListItemViewModel> plItemsInfo = new List<PriceListItemViewModel>();

                foreach (var priceListItem in priceList.PriceListItems)
                {
                    PriceListItemViewModel plItemViewModel = new PriceListItemViewModel()
                    {
                        Id = priceListItem.Id,
                        BasePrice = priceListItem.BasePrice,
                        DiscountId = priceListItem.DiscountId,
                        Discount = priceListItem.Discount.Discount,
                        HasDiscount = true,
                        TicketTypeId = priceListItem.TicketTypeId,
                        TicketTypeName = priceListItem.TicketType.Name,
                        UserTypeId = priceListItem.Discount.UserTypeId,
                        UserTypeName = priceListItem.Discount.UserType.Name
                    };

                    plItemViewModel.HasDiscount = priceListItem.Discount.Discount > 0 ? true : false;
                    plItemsInfo.Add(plItemViewModel);
                }


                PriceListViewModel plViewModel = new PriceListViewModel()
                {
                    Id = priceList.Id,
                    ValidFrom = priceList.ValidFrom,
                    ValidUntil = priceList.ValidUntil,
                    PriceListItems = plItemsInfo
                };

                priceListsInfo.Add(plViewModel);
            }

            return Ok(priceListsInfo);
        }

        [HttpGet]
        [Route("Active")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult Get()
        {
            PriceList priceList = _unitOfWork.PriceListRepository.GetActivePriceList();

            return Ok(priceList);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult Get(int id)
        {
            PriceList priceList = _unitOfWork.PriceListRepository.GetPriceListById(id);
            List<PriceListItemViewModel> plItemsInfo = new List<PriceListItemViewModel>();

            foreach (var priceListItem in priceList.PriceListItems)
            {
                PriceListItemViewModel plItemViewModel = new PriceListItemViewModel()
                {
                    Id = priceListItem.Id,
                    BasePrice = priceListItem.BasePrice,
                    DiscountId = priceListItem.DiscountId,
                    Discount = priceListItem.Discount.Discount,
                    HasDiscount = true,
                    TicketTypeId = priceListItem.TicketTypeId,
                    TicketTypeName = priceListItem.TicketType.Name,
                    UserTypeId = priceListItem.Discount.UserTypeId,
                    UserTypeName = priceListItem.Discount.UserType.Name
                };

                plItemViewModel.HasDiscount = priceListItem.Discount.Discount > 0 ? true : false;
                plItemsInfo.Add(plItemViewModel);
            }


            PriceListViewModel plViewModel = new PriceListViewModel()
            {
                Id = priceList.Id,
                ValidFrom = priceList.ValidFrom,
                ValidUntil = priceList.ValidUntil,
                PriceListItems = plItemsInfo,
                RowVersion = priceList.RowVersion
            };
            

            return Ok(plViewModel);
        }

        [HttpGet]
        [Authorize(Roles = "User, TicketInspector, Admin")]
        public IHttpActionResult GetFromTicketType([FromUri]int ticketTypeId)
        {
            TicketType ticketType = _unitOfWork.TicketTypeRepository.Get(ticketTypeId);
            if (ticketType == null)
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
            foreach (var priceListItem in priceListItems)
            {
                if (priceListItem.Discount != null)
                {
                    if (priceListItem.Discount.UserTypeId == currentUser.UserTypeId)
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

            if (discountRate <= 0)
            {
                hasDiscount = false;
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

        [HttpGet]
        [Route("GetRegularPrice")]
        [AllowAnonymous]
        public IHttpActionResult GetRegularPrice([FromUri]int ticketTypeId)
        {
            TicketType ticketType = _unitOfWork.TicketTypeRepository.Get(ticketTypeId);
            if (ticketType == null)
            {
                return BadRequest();
            }

            IEnumerable<PriceListItem> priceListItems = _unitOfWork.PriceListRepository.GetPriceListItems(ticketTypeId);
            if (priceListItems == null)
            {
                return BadRequest();
            }

            int regularId = _unitOfWork.UserTypeRepository.GetRegularUserTypeId();

            PriceListItem userPriceListItem = null;
            bool hasDiscount = false;
            float? discountPrice = null;
            float? discountRate = null;
            foreach (var priceListItem in priceListItems)
            {
                if (priceListItem.Discount != null)
                {
                    if (priceListItem.Discount.UserTypeId == regularId)
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

            if (discountRate <= 0)
            {
                hasDiscount = false;
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (model.PriceListItems.Count < 12)
            {
                return BadRequest();
            }

            // check if there is one pricelist active during this period
            if (!CheckIfDateValid(model.ValidFrom, model.ValidUntil))
            {
                return Conflict();
            }

            PriceList priceList = new PriceList()
            {
                ValidFrom = model.ValidFrom,
                ValidUntil = model.ValidUntil
            };

            foreach (var priceListItem in model.PriceListItems)
            {
                PriceListItem plItem = new PriceListItem()
                {
                    BasePrice = priceListItem.BasePrice,
                    TicketTypeId = priceListItem.TicketTypeId,
                    Discount = new UserTypeDiscount() { Discount = priceListItem.Discount / 100, UserTypeId = priceListItem.UserTypeId }
                };

                priceList.PriceListItems.Add(plItem);
            }

            _unitOfWork.PriceListRepository.Add(priceList);

            try
            {
                _unitOfWork.Complete();
            }
            catch (Exception)
            {
                return InternalServerError();
            }

            return Ok();
        }


        // PUT: api/PriceLists
        [HttpPut]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult Put(EditPriceListBindingModel model)
        {
            if(model.PriceListItems.Count < 12)
            {
                return BadRequest();
            }
            
            PriceList contextPriceList = _unitOfWork.PriceListRepository.GetPriceListById(model.Id);

            if(contextPriceList == null)
            {
                return BadRequest();
            }

            // check for date change
            if(!contextPriceList.ValidFrom.Equals(model.ValidFrom) || !contextPriceList.ValidUntil.Equals(model.ValidUntil))
            {
                if(!CheckIfDateValid(model.ValidFrom, model.ValidUntil, contextPriceList.Id))
                {
                    return Conflict();
                }
            }

            contextPriceList.ValidFrom = model.ValidFrom;
            contextPriceList.ValidUntil = model.ValidUntil;

            // clear discounts
            ICollection<UserTypeDiscount> cloneDiscounts = new HashSet<UserTypeDiscount>();
            foreach (var item in contextPriceList.PriceListItems)
                cloneDiscounts.Add(item.Discount);

            foreach (var contextDiscount in cloneDiscounts)
            {
                _unitOfWork.UserTypeDiscountRepository.Remove(contextDiscount);
            }

            // clear priceitems
            ICollection<PriceListItem> cloneItems = new HashSet<PriceListItem>();
            foreach (var item in contextPriceList.PriceListItems)
                cloneItems.Add(item);

            foreach(var contextPriceListItem in cloneItems)
            {
                _unitOfWork.PriceListItemRepository.Remove(contextPriceListItem);
            }


            // add new values
            foreach (var priceListItem in model.PriceListItems)
            {
                PriceListItem plItem = new PriceListItem()
                {
                    BasePrice = priceListItem.BasePrice,
                    TicketTypeId = priceListItem.TicketTypeId,
                    Discount = new UserTypeDiscount() { Discount = priceListItem.Discount, UserTypeId = priceListItem.UserTypeId }
                };

                contextPriceList.PriceListItems.Add(plItem);
            }

            // update
            _unitOfWork.PriceListRepository.Update(contextPriceList);

            try
            {
                _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriceListExists(model.Id))
                {
                    return NotFound();
                }
                else
                {
                    return Conflict();
                }
            }

            return Ok(); // Modified ?
        }


        // DELETE: api/PriceLists/5
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            PriceList priceList = _unitOfWork.PriceListRepository.Get(id);
            if (priceList == null)
            {
                return BadRequest();
            }

            IEnumerable<UserTypeDiscount> discounts = _unitOfWork.PriceListRepository.GetDiscounts(priceList.Id);
            foreach (var discount in discounts)
                _unitOfWork.UserTypeDiscountRepository.Remove(discount);

            _unitOfWork.PriceListRepository.Remove(priceList);

            try
            {
                _unitOfWork.Complete();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PriceListExists(id))
                {
                    return NotFound();
                }
                else
                {
                    return Conflict();
                }
            }

            return Ok();
        }

        #region Helpers

        private bool CheckIfDateValid(DateTime from, DateTime until, int id = -1)
        {
            bool isValid = true;
            IEnumerable<PriceList> priceLists = _unitOfWork.PriceListRepository.GetAll();

            foreach (var priceList in priceLists)
            {
                if (priceList.Id.Equals(id))
                {
                    continue;
                }

                if (priceList.ValidFrom <= from && from <= priceList.ValidUntil)
                {
                    isValid = false;
                    break;
                }

                if (priceList.ValidFrom <= until && until <= priceList.ValidUntil)
                {
                    isValid = false;
                    break;
                }
            }

            return isValid;
        }

        private bool PriceListExists(int id)
        {
            return _unitOfWork.PriceListRepository.GetAll().Count(e => e.Id == id) > 0;
        }

        #endregion



    }
}
