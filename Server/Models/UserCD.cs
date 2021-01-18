namespace Server.Models 
{
    public class UserCD 
    {
        public int Id {get; set;}
        public int CDId { get; set; }
        public int UserId { get; set; }
        public CD CD { get; set; }
        public User User { get; set; }
    }
}