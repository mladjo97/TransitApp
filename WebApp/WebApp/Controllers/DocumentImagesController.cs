using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using WebApp.Models;
using WebApp.Models.Email;
using WebApp.Models.ViewModels;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/DocumentImages")]
    public class DocumentImagesController : ApiController
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

        public DocumentImagesController(IUnitOfWork unitOfWork)
        {
            this._unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Route("all")]
        [Authorize(Roles = "TicketInspector, Admin")]
        public IEnumerable<DocumentImageViewModel> GetAll()
        {
            IList<ApplicationUser> users = UserManager.Users.ToList();
            IList<DocumentImageViewModel> documentInformation = new List<DocumentImageViewModel>();

            foreach(var user in users)
            {
                if(!user.VerifiedDocumentImage && !String.IsNullOrEmpty(user.DocumentImageUrl))
                {
                    DocumentImageViewModel document = new DocumentImageViewModel()
                    {
                        UserId = user.Id,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        DocumentImageUrl = user.DocumentImageUrl
                    };

                    documentInformation.Add(document);
                }
            }

            return documentInformation;
        }

        [HttpPost]
        [Route("Verify")]
        [Authorize(Roles = "TicketInspector, Admin")]
        public IHttpActionResult Verify([FromUri]string userId)
        {
            ApplicationUser currentUser = UserManager.FindById(userId);

            if (currentUser == null)
            {
                return BadRequest();
            }

            if (String.IsNullOrEmpty(currentUser.DocumentImageUrl))
            {
                return NotFound();
            }

            currentUser.VerifiedDocumentImage = true;

            IdentityResult result = UserManager.Update(currentUser);

            if (!result.Succeeded)
            {
                return InternalServerError();
            }

            //EmailHelper.SendSuccess("mldnmilosevic@gmail.com");

            return Ok();
        }

        [HttpPost]
        [Route("Reject")]
        [Authorize(Roles = "TicketInspector, Admin")]
        public IHttpActionResult Reject([FromUri]string userId)
        {
            ApplicationUser currentUser = UserManager.FindById(userId);

            if (currentUser == null)
            {
                return BadRequest();
            }

            if (String.IsNullOrEmpty(currentUser.DocumentImageUrl))
            {
                return NotFound();
            }

            var userImageFilePath = HttpContext.Current.Server.MapPath($"~/{currentUser.DocumentImageUrl}");
            if (!File.Exists(userImageFilePath))
            {
                return BadRequest();
            }

            try
            {
                File.Delete(userImageFilePath);

                currentUser.VerifiedDocumentImage = false;
                currentUser.DocumentImageUrl = null;

                IdentityResult updateResult = UserManager.Update(currentUser);

                if (!updateResult.Succeeded)
                {
                    return InternalServerError();
                }
            }
            catch (Exception e)
            {
                return InternalServerError();
            }

            //EmailHelper.SendReject("mldnmilosevic@gmail.com");

            return Ok();
        }

        [HttpGet]
        [Authorize(Roles = "User")]
        public IHttpActionResult Get()
        {
            ApplicationUser currentUser = UserManager.FindById(User.Identity.GetUserId());

            if (currentUser == null)
            {
                return BadRequest();
            }
            
            if(String.IsNullOrEmpty(currentUser.DocumentImageUrl))
            {
                return NotFound();
            }

            return Ok(currentUser.DocumentImageUrl);
        }

        [HttpPost]
        [Authorize(Roles = "User")]
        public HttpResponseMessage Post()
        {
            ApplicationUser currentUser = UserManager.FindById(User.Identity.GetUserId());

            if (currentUser == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            HttpRequest httpRequest = HttpContext.Current.Request;

            if(httpRequest.Files.Count <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            foreach (string file in httpRequest.Files)
            {
                var postedFile = httpRequest.Files[file];
                if (postedFile != null && postedFile.ContentLength > 0)
                {

                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                    var extension = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.')).ToLower();

                    if (!AllowedFileExtensions.Contains(extension))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotAcceptable);
                    }
                    else
                    {
                        var filePath = HttpContext.Current.Server.MapPath($"~/Documents/{currentUser.Id}_{postedFile.FileName}");

                        if (File.Exists(filePath))
                        {
                            return Request.CreateResponse(HttpStatusCode.BadRequest);
                        }

                        currentUser.DocumentImageUrl = $"/Documents/{currentUser.Id}_{postedFile.FileName}";

                        IdentityResult result = UserManager.Update(currentUser);

                        if (result.Succeeded)
                        {
                            try
                            {
                                postedFile.SaveAs(filePath);
                            }
                            catch (Exception e)
                            {
                                return Request.CreateResponse(HttpStatusCode.InternalServerError);
                            }

                        }
                        else
                        {
                            return Request.CreateResponse(HttpStatusCode.InternalServerError);
                        }
                    }
                }
            }
            
            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [HttpPut]
        [Authorize(Roles = "User")]
        public HttpResponseMessage Put()
        {
            ApplicationUser currentUser = UserManager.FindById(User.Identity.GetUserId());

            if (currentUser == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            HttpRequest httpRequest = HttpContext.Current.Request;

            if (httpRequest.Files.Count <= 0)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            var userImageFilePath = HttpContext.Current.Server.MapPath($"~/{currentUser.DocumentImageUrl}");
            if (!File.Exists(userImageFilePath))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                File.Delete(userImageFilePath);
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }

            foreach (string file in httpRequest.Files)
            {
                var postedFile = httpRequest.Files[file];
                if (postedFile != null && postedFile.ContentLength > 0)
                {

                    IList<string> AllowedFileExtensions = new List<string> { ".jpg", ".gif", ".png" };
                    var extension = postedFile.FileName.Substring(postedFile.FileName.LastIndexOf('.')).ToLower();

                    if (!AllowedFileExtensions.Contains(extension))
                    {
                        return Request.CreateResponse(HttpStatusCode.NotAcceptable);
                    }
                    else
                    {
                        var filePath = HttpContext.Current.Server.MapPath($"~/Documents/{currentUser.Id}_{postedFile.FileName}");

                        if (File.Exists(filePath))
                        {
                            return Request.CreateResponse(HttpStatusCode.BadRequest);
                        }

                        currentUser.DocumentImageUrl = $"/Documents/{currentUser.Id}_{postedFile.FileName}";

                        IdentityResult result = UserManager.Update(currentUser);

                        if (result.Succeeded)
                        {
                            try
                            {
                                postedFile.SaveAs(filePath);
                            }
                            catch(Exception e)
                            {
                                return Request.CreateResponse(HttpStatusCode.InternalServerError);
                            }
                            
                        }
                        else
                        {
                            return Request.CreateResponse(HttpStatusCode.InternalServerError);
                        }
                    }
                }
            }

            return Request.CreateResponse(HttpStatusCode.Created);
        }

        [HttpDelete]
        [Authorize(Roles = "User")]
        public HttpResponseMessage Delete()
        {
            ApplicationUser currentUser = UserManager.FindById(User.Identity.GetUserId());

            if (currentUser == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }


            var userImageFilePath = HttpContext.Current.Server.MapPath($"~/{currentUser.DocumentImageUrl}");
            if (!File.Exists(userImageFilePath))
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            try
            {
                File.Delete(userImageFilePath);

                currentUser.DocumentImageUrl = null;

                IdentityResult result = UserManager.Update(currentUser);

                if (result.Succeeded)
                {
                    return Request.CreateResponse(HttpStatusCode.OK);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.InternalServerError);
                }
            }
            catch (Exception e)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError);
            }
        }

    }
}
