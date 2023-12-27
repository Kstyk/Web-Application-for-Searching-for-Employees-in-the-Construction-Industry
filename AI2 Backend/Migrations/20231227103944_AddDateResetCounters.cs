using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI2_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddDateResetCounters : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
         

            migrationBuilder.AddColumn<DateTime>(
                name: "LastDailyReset",
                table: "Stats",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "LastMonthlyReset",
                table: "Stats",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

    
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Stats_EmployeeId",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "LastDailyReset",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "LastMonthlyReset",
                table: "Stats");

            migrationBuilder.CreateIndex(
                name: "IX_Stats_EmployeeId",
                table: "Stats",
                column: "EmployeeId");
        }
    }
}
