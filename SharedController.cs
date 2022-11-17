using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
#pragma warning disable CS8618
namespace xp.Controllers
{
    public class SharedController : Controller
    {
        internal ContentResult ErrorPage(string message = "An unknown error occurred.", string action = "Home/Index")
        {
            return new ContentResult {Content = @$"<p>{message}</p><p>Click <a href=""{action}"">here</a> to continue.</p>",ContentType = "text/html"};
        }
        internal Guid ToDbGuid(string vmid = "")
        {
            return new Guid(ToDbId((vmid ?? "")));
        }
        internal string ToDbId(string vmid = "")
        {
            if((vmid ?? "").Length==32)
                return (vmid.Substring(0,8)+'-'+vmid.Substring(8,4)+'-'+vmid.Substring(12,4)+'-'+vmid.Substring(16,4)+'-'+vmid.Substring(20,12)).ToUpper();
            return (vmid ?? "").ToUpper();
        }
        internal string ToVmId(string dbid = "")
        {
            return (dbid ?? "").Replace("-","").ToLower();
        }
        internal string ToVmId(Guid dbguid)
        {
            return ToVmId(dbguid.ToString());
        }

    }
}
