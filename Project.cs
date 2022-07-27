namespace xx.Areas.Project.Models;
// note: you need to run dotnet-aspnet-codegenerator area Project to create areas
public class Project
{
        [Key]
        public Guid Id {get;set;};
        public string Name {get;set;};
        public string Desc {get;set;};
}
