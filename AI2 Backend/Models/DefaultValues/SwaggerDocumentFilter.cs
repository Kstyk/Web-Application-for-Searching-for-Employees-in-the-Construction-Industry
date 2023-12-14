using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace AI2_Backend.Models.DefaultValues
{
    public class SwaggerDocumentFilter : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            // Lista nazw typów, które chcesz ukryć
            var excludedTypes = new List<string> { "EmployeeNotFoundResponse", "LoggedUserProfileResponse", "ListOfEmployeesResponse", "ListOfQualificationsResponse", "LoginUserSuccesfulResponse",
            "LoginUserUnsuccesfulResponse", "RegisterUserCreatedResponse", "UserUnauthorizedResponse", "ValidationExampleTemplate", "ValidationUserEditErrorResponse", "ProblemDetails"};

            foreach (var excludedType in excludedTypes)
            {
                var schemaToRemove = swaggerDoc.Components.Schemas.FirstOrDefault(s => s.Key == excludedType);
                if (!string.IsNullOrEmpty(schemaToRemove.Key))
                {
                    swaggerDoc.Components.Schemas.Remove(schemaToRemove.Key);
                }
            }
        }
    }
}
