using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AI2_Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStat : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CounterAll",
                table: "Stats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdateDate",
                table: "Stats",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CounterAll",
                table: "Stats");

            migrationBuilder.DropColumn(
                name: "LastUpdateDate",
                table: "Stats");
        }
    }
}
