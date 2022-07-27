namespace xx.Areas.Project.Models;
// note: you need to run dotnet-aspnet-codegenerator area Project to create areas
public class Project
{
        [System.ComponentModel.DataAnnotations.Key]
        public Guid Id {get;set;}
        public string Name {get;set;}
        public string Desc {get;set;}
}
