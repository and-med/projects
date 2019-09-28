using Microsoft.AspNetCore.Mvc;
using System.Linq;
using TimeZonesApp.Infrastructure.ResponseModels;

namespace TimeZonesApp.Api.Filters
{
    public static class InvalidModelStateResponseHandler
    {
        public static IActionResult Handle(ActionContext context)
        {
            var errors = context.ModelState.SelectMany(x => x.Value.Errors.Select(e => e.ErrorMessage));
            var errorResponse = new ErrorResponse(errors);
            return new BadRequestObjectResult(errorResponse);
        }
    }
}
