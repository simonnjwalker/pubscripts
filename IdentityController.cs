using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using xx.Controllers;
#pragma warning disable CS8618
namespace Seamlex.MyEdApps
{
    [Area("Identity")]
    public class IdentityController : SharedController
    {
        internal System.Security.Claims.Claim Anonymous = new System.Security.Claims.Claim("Anonymous","00000000-0000-0000-0000-000000000000");
        internal string GetUserId()
        {
            return ToVmId(GetUserClaim().Value);
        }
        internal System.Security.Claims.Claim GetUserClaim()
        {
            return this.User.Claims.Where(x => x.Type.Contains("nameidentifier")).FirstOrDefault(Anonymous);
        }
        internal bool IsAnonymous()
        {
            return GetUserClaim().Value == Anonymous.Value;
        }
        internal bool AnonymousAllowed = true;
    }
}
