using AI2_Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace AI2_Backend.Seeders
{
    public class RoleSeeder
    {
        private AIDbContext _dbContext;

        public RoleSeeder(AIDbContext context)
        {
            _dbContext = context;
        }

        public void Seed()
        {
            if(_dbContext.Database.CanConnect())
            {
                var pendingMigrations = _dbContext.Database.GetPendingMigrations();
                if(pendingMigrations != null && pendingMigrations.Any())
                {
                    _dbContext.Database.Migrate();
                }

                if(!_dbContext.Roles.Any())
                {
                    var roles = GetRoles();
                    _dbContext.Roles.AddRange(roles);
                    _dbContext.SaveChanges();
                }
            }
        }

        private static IEnumerable<Role> GetRoles()
        {
            var roles = new List<Role>() {
                new Role() {
                    Name = "recruiter"
                },
                new Role() {
                    Name="worker"
                } 
            };

            return roles;
        }
    }
}
