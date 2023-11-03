using AI2_Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace AI2_Backend.seeders
{
    public class QualificationSeeder
    {
        private AIDbContext _dbContext;

        public QualificationSeeder(AIDbContext context)
        {
            _dbContext = context;
        }

        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {
                var pendingMigrations = _dbContext.Database.GetPendingMigrations();
                if (pendingMigrations != null && pendingMigrations.Any())
                {
                    _dbContext.Database.Migrate();
                }

                if (!_dbContext.Qualifications.Any())
                {
                    var qualifications = GetQualifications();
                    _dbContext.Qualifications.AddRange(qualifications);
                    _dbContext.SaveChanges();
                }
            }
        }

        private static IEnumerable<Qualification> GetQualifications()
        {
            var qualifications = new List<Qualification>() {
                new Qualification() {
                    Name = "Murarz"
                },
                new Qualification() {
                    Name = "Cieśla"
                },
                new Qualification() {
                    Name = "Dekarz"
                },
                new Qualification() {
                    Name = "Tynkarz"
                },
                new Qualification() {
                    Name = "Elektryk budowlany"
                },
                new Qualification() {
                    Name = "Hydraulik"
                },
                new Qualification() {
                    Name = "Malarz i tapeciarz"
                },
                new Qualification() {
                    Name = "Glazurnik"
                },
                new Qualification() {
                    Name = "Monter instalacji grzewczych i klimatyzacyjnych"
                },
                new Qualification() {
                    Name = "Monter instalacji elektrycznych"
                },
                new Qualification() {
                    Name = "Szklarz"
                },
                new Qualification() {
                    Name = "Stolarz"
                },
                new Qualification() {
                    Name = "Betoniarz"
                },
                new Qualification() {
                    Name = "Monter instalacji sanitarnych"
                },
                new Qualification() {
                    Name = "Monter instalacji gazowych"
                },
                new Qualification() {
                    Name = "Monter instalacji alarmowych i monitoringowych"
                },
                new Qualification() {
                    Name = "Sufitownik"
                },
                new Qualification() {
                    Name = "Zbrojarz"
                },
                new Qualification() {
                    Name = "Operator koparki"
                },
                new Qualification() {
                    Name = "Operator dźwigu"
                },
                new Qualification() {
                    Name = "Kierowca ciężarówki"
                },
            };

            return qualifications;
        }
    }
}
