using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI2_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddUserPreferencesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserPreferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    IsVisibleProfile = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsVisibleAboutMe = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsVisibleSkills = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsVisibleExperience = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsVisibleEducation = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsVisibleVoivodeship = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    IsVisibleRequiredPayment = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPreferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPreferences_Users_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_UserPreferences_EmployeeId",
                table: "UserPreferences",
                column: "EmployeeId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserPreferences");
        }
    }
}
