using AI2_Backend.Enums;
using Microsoft.EntityFrameworkCore;

namespace AI2_Backend.Entities
{
    public class AIDbContext : DbContext
    {
        public AIDbContext(DbContextOptions<AIDbContext> options) : base(options)
        {


        }

        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Qualification> Qualifications{ get; set; }
        public DbSet<UserQualification> UserQualifications{ get; set; }
        public DbSet<Stats> Stats { get; set; }
        public DbSet<SavedProfile> SavedProfiles { get; set; }
        public DbSet<UserPreferences> UserPreferences { get; set; }
        public DbSet<InvitationHistory> InvitationHistories { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<UserExperience> UserExperiences { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>()
                .Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255);
            modelBuilder.Entity<User>()
                .Property(e => e.RoleId)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(e => e.Password)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(e => e.FirstName)
                .HasMaxLength(255)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(e => e.LastName)
                .HasMaxLength(255)
                .IsRequired();
            modelBuilder.Entity<User>()
                .Property(e => e.AboutMe)
                .HasColumnType("text")
                .HasMaxLength(10000);
            modelBuilder.Entity<User>()
                .Property(e => e.Education)
                .HasColumnType("text")
                .HasMaxLength(10000);


            modelBuilder.Entity<UserQualification>()
                .HasKey(uq => new { uq.UserId, uq.QualificationId });

            modelBuilder.Entity<UserQualification>()
                .HasOne(uq => uq.User)
                .WithMany(u => u.UserQualifications)
                .HasForeignKey(uq => uq.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserQualification>()
                .HasOne(uq => uq.Qualification)
                .WithMany(q => q.UserQualifications)
                .HasForeignKey(uq => uq.QualificationId);

            modelBuilder.Entity<UserPreferences>()
                .HasOne(e => e.Employee)
                .WithOne(e => e.UserPreferences)
                .HasForeignKey<UserPreferences>(e => e.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            modelBuilder.Entity<InvitationHistory>()
                .Property(e => e.Title)
                .HasColumnType("text")
                .HasMaxLength(1000);

            modelBuilder.Entity<InvitationHistory>()
                .Property(e => e.Message)
                .HasColumnType("text")
                .HasMaxLength(10000);

            modelBuilder.Entity<InvitationHistory>()
                .Property(e => e.Company)
                .HasColumnType("text")
                .HasMaxLength(255);
            
           

            modelBuilder.Entity<Experience>()
                .Property(e => e.Company)
                .HasColumnType("text")
                .HasMaxLength(255);

            modelBuilder.Entity<Experience>()
                .Property(e => e.Description)
                .HasColumnType("text")
                .HasMaxLength(2000);

            modelBuilder.Entity<UserExperience>()
                .HasOne(uq => uq.Employee)
                .WithMany(u => u.UserExperiences)
                .HasForeignKey(uq => uq.EmployeeId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserExperience>()
                .HasOne(uq => uq.Experience)
                .WithMany(q => q.UserExperiences)
                .HasForeignKey(uq => uq.ExperienceId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SavedProfile>()
                .HasOne(uq => uq.Recruiter)
                .WithMany(u => u.SavedProfiles)
                .HasForeignKey(uq => uq.RecruiterId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<InvitationHistory>()
                .HasOne(uq => uq.Recruiter)
                .WithMany(u => u.InvitationsHistory)
                .HasForeignKey(uq => uq.RecruiterId);

            modelBuilder.Entity<InvitationHistory>()
                .Property(e => e.Status)
                .HasColumnType("int");

       
        }


    }
}
