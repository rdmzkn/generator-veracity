using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Tokens;

namespace <%= projectName %>
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.Configure<AzureAdB2COptions>(Configuration.GetSection("Authentication:AzureAdB2C"));
            services.AddAuthentication(sharedOptions =>
                {
                    sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                    sharedOptions.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
                })
                .AddCookie(c => c.LoginPath = new PathString("/account/signin"))
                .AddOpenIdConnect(o =>
                {
                    o.Authority = Option.Authority;
                    o.ClientId = Option.ClientId;
                    o.UseTokenLifetime = true;
                    o.TokenValidationParameters = new TokenValidationParameters() {NameClaimType = "name"};
                    o.ClientSecret = Option.ClientSecret;
                    o.Events = new OpenIdConnectEvents()
                    {
                        OnRedirectToIdentityProvider = OnRedirectToIdentityProvider,
                        OnRemoteFailure = OnRemoteFailure,
                        OnAuthorizationCodeReceived = OnAuthorizationCodeReceived
                    };
                });
            services.AddMvc();
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromHours(1);
            });
        }

        #region B2C OpenId Authentication

        public AzureAdB2COptions Option => Configuration.GetSection("Authentication:AzureAdB2C").Get<AzureAdB2COptions>();

        private async Task OnAuthorizationCodeReceived(AuthorizationCodeReceivedContext context)
        {
            // Use MSAL to swap the code for an access token
            // Extract the code from the response notification
            var code = context.ProtocolMessage.Code;
            var signedInUserId = context.Principal.Claims.FirstOrDefault(d => d.Type == "userId").Value;
            TokenCache userTokenCache = new MSALSessionCache(signedInUserId, context.HttpContext).GetMsalCacheInstance();
            ConfidentialClientApplication cca = new ConfidentialClientApplication(
                Option.ClientId,
                Option.Authority,
                Option.RedirectUri,
                new ClientCredential(Option.ClientSecret),
                userTokenCache,
                null);
            try
            {
                AuthenticationResult result = await cca.AcquireTokenByAuthorizationCodeAsync(code, Option.VeracityServiceApiScopes.Split(' '));
                context.HandleCodeRedemption(result.AccessToken, result.IdToken);
            }
            catch
            {
                //TODO: Handle
                throw;
            }
        }

        private Task OnRemoteFailure(RemoteFailureContext context)
        {
            context.HandleResponse();
            if (context.Failure.Message.Contains("access_denied"))
            {
                context.Response.Redirect("/");
            }
            else
            {
                context.Response.Redirect("/Home/Error?message=" + context.Failure.Message);
            }
            return Task.FromResult(0);
        }

        private Task OnRedirectToIdentityProvider(RedirectContext context)
        {
            var defaultPolicy = Option.DefaultPolicy;
            if (context.Properties.Items.TryGetValue(AzureAdB2COptions.PolicyAuthenticationProperty, out var policy) &&
                !policy.Equals(defaultPolicy))
            {
                context.ProtocolMessage.ResponseType = OpenIdConnectResponseType.IdToken;
                context.ProtocolMessage.IssuerAddress = context.ProtocolMessage.IssuerAddress.ToLower().Replace(defaultPolicy.ToLower(), policy.ToLower());
                context.Properties.Items.Remove(AzureAdB2COptions.PolicyAuthenticationProperty);
            }
            else if (!string.IsNullOrEmpty(Option.VeracityServiceApiUrl))
            {
                context.ProtocolMessage.Scope += $" offline_access {Option.VeracityServiceApiScopes}";
                context.ProtocolMessage.ResponseType = OpenIdConnectResponseType.CodeIdToken;
            }
            context.ProtocolMessage.RedirectUri = Option.RedirectUri;
            return Task.FromResult(0);
        }

        #endregion



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseSession();

            app.UseAuthentication();
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }

}
