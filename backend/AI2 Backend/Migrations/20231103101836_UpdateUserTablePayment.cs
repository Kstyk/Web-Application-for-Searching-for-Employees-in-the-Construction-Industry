using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI2_Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserTablePayment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "RequiredPayment",
                table: "Users",
                type: "decimal(65,30)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(2,30)",
                oldPrecision: 2,
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "RequiredPayment",
                table: "Users",
                type: "decimal(2,30)",
                precision: 2,
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(65,30)",
                oldNullable: true);
        }
    }
}
