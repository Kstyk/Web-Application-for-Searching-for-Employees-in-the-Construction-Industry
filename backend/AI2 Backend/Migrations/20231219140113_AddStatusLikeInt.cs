using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI2_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddStatusLikeInt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "InvitationHistories",
                type: "int",
                nullable: false
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "InvitationHistories"
            );
        }

    }
}
