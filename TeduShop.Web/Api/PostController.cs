using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using TeduShop.Service;
using TeduShop.Web.Infrastructure.Core;

namespace TeduShop.Web.Api
{
    [RoutePrefix("api/post")]
    public class PostController : BaseApiController
    {
        IPostService _postService;
        public PostController(IErrorService errorService, IPostService postService) : 
            base(errorService)
        {
            _postService = postService;
        }

        [Route("getall")]
        public HttpResponseMessage GetAll(HttpRequestMessage request)
        {
            return CreateHttpResponse(request, () =>
            {
                HttpResponseMessage response = null;
                if (!ModelState.IsValid)
                {
                    request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
                else
                {
                    var listPost = _postService.GetAll();
                    response = request.CreateResponse(HttpStatusCode.OK, listPost);
                }
                return response;
            });
        }
    }
}