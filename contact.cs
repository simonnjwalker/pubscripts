using System.ComponentModel.DataAnnotations.Schema;
namespace xx.Models.vm;
public class contact
{
        public string name { get; set; }
        public string email { get; set; }
        public string number { get; set; }
        public string subject  { get; set; }
        public string message { get; set; }
}
