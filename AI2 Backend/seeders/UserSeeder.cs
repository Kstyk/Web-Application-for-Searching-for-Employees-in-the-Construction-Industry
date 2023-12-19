using AI2_Backend.Entities;
using AI2_Backend.Seeders;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace AI2_Backend.seeders
{
    public class UserSeeder
    {
        private AIDbContext _dbContext;
        private static IPasswordHasher<User> _passwordHasher;


        public UserSeeder(AIDbContext context, IPasswordHasher<User> passwordHasher)
        {
            _dbContext = context;
            _passwordHasher = passwordHasher;
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

                if (!_dbContext.Users.Any())
                {
                    var employees = GetEmployees(_dbContext);
                    _dbContext.Users.AddRange(employees);

                    _dbContext.SaveChanges();

                    var recruiters = GetRecruiters(_dbContext);
                    _dbContext.Users.AddRange(recruiters);

                    _dbContext.SaveChanges();
                }
            }
        }

        

        private static IEnumerable<User> GetRecruiters(AIDbContext dbContext)
        {
            var existingRecruiterRole = dbContext.Roles.FirstOrDefault(r => r.Name == "recruiter");

            var recruiters = new List<User>()
            {
                new User()
                {
                    Email = "adam@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Adam",
                    LastName = "Kowal",
                    Role = existingRecruiterRole,
                    SavedProfiles = new List<SavedProfile>
                    {
                        new SavedProfile()
                        {
                            EmployeeId = dbContext.Users.Where(e => e.Email.Equals("mkowal@gmail.com")).FirstOrDefault().Id
                        },
                        new SavedProfile()
                        {
                            EmployeeId = dbContext.Users.Where(e => e.Email.Equals("julig@gmail.com")).FirstOrDefault().Id
                        },
                    }
                },
                new User()
                {
                    Email = "kamil@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Kamil",
                    LastName = "Nowak",
                    Role = existingRecruiterRole,
                    SavedProfiles = new List<SavedProfile>
                    {
                        new SavedProfile()
                        {
                            EmployeeId = dbContext.Users.Where(e => e.Email.Equals("kkluks@gmail.com")).FirstOrDefault().Id
                        },
                        new SavedProfile()
                        {
                            EmployeeId = dbContext.Users.Where(e => e.Email.Equals("kkowalik@gmail.com")).FirstOrDefault().Id
                        },
                    }
                },
                new User()
                {
                    Email = "szczepan@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Szczepan",
                    LastName = "Michalski",
                    Role = existingRecruiterRole
                },
                new User()
                {
                    Email = "jacek@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Jacek",
                    LastName = "Górski",
                    Role = existingRecruiterRole
                },
                new User()
                {
                    Email = "olaf@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Olaf",
                    LastName = "Pirowski",
                    Role = existingRecruiterRole
                },
                new User()
                {
                    Email = "igor@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Igor",
                    LastName = "Kowal",
                    Role = existingRecruiterRole
                },
                new User()
                {
                    Email = "marcin@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Marcin",
                    LastName = "Dziuba",
                    Role = existingRecruiterRole
                },
                new User()
                {
                    Email = "norbert@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Norbert",
                    LastName = "Igliński",
                    Role = existingRecruiterRole
                }
            };

            return recruiters;
        }

        private static IEnumerable<User> GetEmployees(AIDbContext dbContext)
        {
            var existingEmployeeRole = dbContext.Roles.FirstOrDefault(r => r.Name == "employee");

            var employees = new List<User>()
            {
                new User()
                {
                    Email = "mkowal@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Michał",
                    LastName = "Kowal",
                    Role = existingEmployeeRole,
                    AboutMe = "Duże doświadczenie na stanowiskach kierowniczych",
                    RequiredPayment = 4500,
                    Voivodeship = Enums.Voivodeship.dolnośląskie,
                    Education = "Uniwersytet Poznański",
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Murarz")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Tynkarz")).Id
                        }
                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2018,
                                EndYear = 2021,
                                Company = "GeoBud"
                            }
                        },
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2021,
                                Company = "GeoStar"
                            }
                        }
                    }
                },
                new User()
                {
                    Email = "sopal@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Simon",
                    LastName = "Opal",
                    Role = existingEmployeeRole,
                    RequiredPayment = 5000,
                    Voivodeship = Enums.Voivodeship.opolskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Glazurnik")).Id
                        },

                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2015,
                                EndYear = 2021,
                                Company = "GlazurBud"
                            }
                        },
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2021,
                                Company = "Budimax"
                            }
                        }
                    }
                },
                new User()
                {
                    Email = "jkulig@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Julian",
                    LastName = "Kulig",
                    Role = existingEmployeeRole,
                    AboutMe = "Pracowałem za granicą przy zbrojeniach budynków wielopoziomowych",
                    RequiredPayment = 3500,
                    Voivodeship = Enums.Voivodeship.wielkopolskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Zbrojarz")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Sufitownik")).Id
                        }
                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2005,
                                EndYear = 2014,
                                Company = "NiemiecBud"
                            }
                        },
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2014,
                                Company = "Budimex"
                            }
                        }
                    }
                },
                new User()
                {
                    Email = "powal@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Piotr",
                    LastName = "Owal",
                    Role = existingEmployeeRole,
                    RequiredPayment = 6200,
                    Voivodeship = Enums.Voivodeship.podkarpackie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Operator koparki")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Operator dźwigu")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Kierowca ciężarówki")).Id
                        }
                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2018,
                                EndYear = 2023,
                                Company = "TransComp"
                            }
                        },

                    }
                },
                new User()
                {
                    Email = "kkluks@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Kamil",
                    LastName = "Kluks",
                    Role = existingEmployeeRole,
                    AboutMe = "Umiejętności we wszelakich robotach wykończeniowych",
                    RequiredPayment = 4500,
                    Voivodeship = Enums.Voivodeship.podlaskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Murarz")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Tynkarz")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Sufitownik")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Malarz i tapeciarz")).Id
                        },
                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2007,
                                EndYear = 2023,
                                Company = "ElementaryBud"
                            }
                        },

                    }
                },
                new User()
                {
                    Email = "pfeliks@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Paweł",
                    LastName = "Feliks",
                    Role = existingEmployeeRole,
                    Education = "Uniwersytet podlaski",
                    RequiredPayment = 5500,
                    Voivodeship = Enums.Voivodeship.podlaskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Monter instalacji sanitarnych")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Hydraulik")).Id
                        },

                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2007,
                                EndYear = 2012,
                                Company = "Hydrobud"
                            }
                        },
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2012,
                                EndYear = 2022,
                                Company = "KanPol"
                            }
                        },
                    }
                },
                new User()
                {
                    Email = "julig@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Julian",
                    LastName = "Uligowski",
                    Role = existingEmployeeRole,
                    RequiredPayment = 3500,
                    Voivodeship = Enums.Voivodeship.warmińskoMazurskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Betoniarz")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Murarz")).Id
                        },

                    },
                    UserExperiences =
                    {

                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 1999,
                                EndYear = 2022,
                                Company = "MajsterFach"
                            }
                        },
                    }
                },
                new User()
                {
                    Email = "hkowalski@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Hubert",
                    LastName = "Kowalski",
                    Role = existingEmployeeRole,
                    Education = "Uniwersytet pomorski",
                    RequiredPayment = 7000,
                    Voivodeship = Enums.Voivodeship.pomorskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Elektryk budowlany")).Id
                        },


                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2003,
                                EndYear = 2005,
                                Company = "EleBud"
                            }
                        },
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2005,
                                EndYear = 2023,
                                Company = "MurElBud"
                            }
                        },
                    }
                },
                new User()
                {
                    Email = "oloki@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Olgierd",
                    LastName = "Lokicki",
                    Role = existingEmployeeRole,
                    Education = "Uniwersytet radomski",
                    RequiredPayment = 5500,
                    Voivodeship = Enums.Voivodeship.mazowieckie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Monter instalacji sanitarnych")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Monter instalacji grzewczych i klimatyzacyjnych")).Id
                        },

                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2007,
                                EndYear = 2014,
                                Company = "IgloBud"
                            }
                        },
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2014,
                                EndYear = 2023,
                                Company = "PolBud"
                            }
                        },
                    }
                },
                new User()
                {
                    Email = "brucki@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Bartłomiej",
                    LastName = "Rucki",
                    Role = existingEmployeeRole,
                    RequiredPayment = 3000,
                    Voivodeship = Enums.Voivodeship.lubuskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Murarz")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Cieśla")).Id
                        },

                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2018,
                                EndYear = 2023,
                                Company = "KamBix"
                            }
                        },

                    }
                },
                new User()
                {
                    Email = "kkowalik@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Krzysztof",
                    LastName = "Kowalik",
                    Role = existingEmployeeRole,
                    RequiredPayment = 4000,
                    Voivodeship = Enums.Voivodeship.świętokrzyskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Zbrojarz")).Id
                        },
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Murarz")).Id
                        },

                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2018,
                                EndYear = 2023,
                                Company = "MurBud"
                            }
                        },

                    }
                },
                new User()
                {
                    Email = "wtor@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Wiktor",
                    LastName = "Tor",
                    Role = existingEmployeeRole,
                    RequiredPayment = 4200,
                    Voivodeship = Enums.Voivodeship.zachodnioPomorskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {

                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Murarz")).Id
                        },

                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2015,
                                EndYear = 2023,
                                Company = "IrBud"
                            }
                        },

                    }
                },
                new User()
                {
                    Email = "trowik@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Tomasz",
                    LastName = "Rowik",
                    Role = existingEmployeeRole,
                    RequiredPayment = 6000,
                    Voivodeship = Enums.Voivodeship.podkarpackie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Kierowca ciężarówki")).Id
                        },


                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2008,
                                EndYear = 2013,
                                Company = "TransBud"
                            }
                        },
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2013,
                                EndYear = 2023,
                                Company = "KorBud"
                            }
                        },
                    }
                },
                new User()
                {
                    Email = "lpowik@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Luis",
                    LastName = "Powik",
                    Role = existingEmployeeRole,
                    RequiredPayment = 11000,
                    Voivodeship = Enums.Voivodeship.wielkopolskie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Operator dźwigu")).Id
                        },


                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 2008,
                                EndYear = 2023,
                                Company = "OgryBud"
                            }
                        },

                    }
                },
                new User()
                {
                    Email = "dfrelik@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Daniel",
                    LastName = "Frelik",
                    Role = existingEmployeeRole,
                    RequiredPayment = 5000,
                    AboutMe = "Posiadam wieloletnie doświadczenie jako murarz, całą karierę zawodową spędziłem w jednej firmie, na różnych wyjazdach. " +
                    "Budowane domy jednorodzinne jak i wielopiętrowe.",
                    Voivodeship = Enums.Voivodeship.podkarpackie,
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Murarz")).Id
                        },


                    },
                    UserExperiences =
                    {
                        new UserExperience() {
                        Experience = new Experience()
                            {
                                StartYear = 1998,
                                EndYear = 2023,
                                Company = "Klimar"
                            }
                        },
                     }
                },
                new User()
                {
                    Email = "fgrodzki@gmail.com",
                    Password = HashPassword("1234"),
                    FirstName = "Filip",
                    LastName = "Grodzki",
                    Role = existingEmployeeRole,
                    RequiredPayment = 3000,
                    Voivodeship = Enums.Voivodeship.podkarpackie,
               
                    UserPreferences = new UserPreferences()
                    {
                        IsVisibleAboutMe = true,
                        IsVisibleEducation = true,
                        IsVisibleExperience = true,
                        IsVisibleProfile = true,
                        IsVisibleRequiredPayment = true,
                        IsVisibleSkills = true,
                        IsVisibleVoivodeship = true,
                    },
                    UserQualifications =
                    {
                        new UserQualification()
                        {
                            QualificationId = dbContext.Qualifications.FirstOrDefault(q => q.Name.Equals("Zbrojarz")).Id
                        },


                    },
                    UserExperiences =
                    {
                        
                    }
                },
            };

            return employees;

        }

        private static string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null, password);
        }
    }
}
