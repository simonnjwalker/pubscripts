using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
namespace xx.Areas.Identity.Models;
public class User : Microsoft.AspNetCore.Identity.IdentityUser
{

        public string FirstName { get; set; }
        public string LastName { get; set; }
}
