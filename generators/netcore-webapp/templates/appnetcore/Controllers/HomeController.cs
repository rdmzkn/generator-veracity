using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using <%= projectName %>.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;

namespace <%= projectName %>.Controllers
{
    public class HomeController : Controller
    {
        readonly AzureAdB2COptions _azureAdB2COptions;
        public HomeController(IOptions<AzureAdB2COptions> azureAdB2COptions)
        {
            _azureAdB2COptions = azureAdB2COptions.Value;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public IActionResult About()
        {
            ViewData["Message"] = "Your identity information.";

            return View();
        }

        [Authorize]
        public async Task<IActionResult> CallAPI()
        {
            string responseString = "";
            try
            {
                // Retrieve the token with the specified scopes
                var scope = _azureAdB2COptions.VeracityServiceApiScopes.Split(' ');
                var signedInUserId = HttpContext.User.Claims.FirstOrDefault(d => d.Type == "userId").Value;
                TokenCache userTokenCache = new MSALSessionCache(signedInUserId, this.HttpContext).GetMsalCacheInstance();
                ConfidentialClientApplication cca = new ConfidentialClientApplication(_azureAdB2COptions.ClientId,
                    _azureAdB2COptions.Authority,
                    _azureAdB2COptions.RedirectUri,
                    new ClientCredential(_azureAdB2COptions.ClientSecret),
                    userTokenCache,
                    null);

                AuthenticationResult result = await cca.AcquireTokenSilentAsync(scope, cca.Users.FirstOrDefault(), _azureAdB2COptions.Authority, false);

                HttpClient client = new HttpClient();
                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Get, $"{_azureAdB2COptions.VeracityServiceApiUrl}/my/profile");

                // Add token to the Authorization header and make the request
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", result.AccessToken);
                HttpResponseMessage response = await client.SendAsync(request);

                // Handle the response
                switch (response.StatusCode)
                {
                    case HttpStatusCode.OK:
                        responseString = await response.Content.ReadAsStringAsync();
                        break;
                    case HttpStatusCode.Unauthorized:
                        responseString = $"Please sign in again. {response.ReasonPhrase}";
                        break;
                    default:
                        responseString = $"Error calling API. StatusCode=${response.StatusCode}";
                        break;
                }
            }
            catch (MsalUiRequiredException ex)
            {
                responseString = $"Session has expired. Please sign in again. {ex.Message}";
            }
            catch (Exception ex)
            {
                responseString = $"Error calling API: {ex.Message}";
            }

            ViewData["Payload"] = $"{responseString}";
            return View();

        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
