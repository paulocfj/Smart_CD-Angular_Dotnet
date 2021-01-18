using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Db 
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> opt) : base(opt)
        {

        }
        public DbSet<User> Users {get;set;}
        public DbSet<CD> CDs {get;set;}
        public DbSet<UserCD> UserCDs {get;set;}
    }
}