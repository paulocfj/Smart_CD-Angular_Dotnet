using System.Collections.Generic;
using Server.ViewModel;

namespace Server.Models 
{
    public class CD
    {
        public CD(){}
        public CD(CDViewModel cd)
        {
           Name = cd.Name;
           Year = cd.Year;
           Genre = cd.Genre;
           Artist = cd.Artist;
           Duration = cd.Duration;
        }
        public int Id {get; set;}
        public string Name { get; set; }
        public string Artist { get; set; }
        public string Year { get; set; }
        public string Genre { get; set; }
        public string Duration { get; set; }

        public List<UserCD> UserCDs {get; set;}
    }
}