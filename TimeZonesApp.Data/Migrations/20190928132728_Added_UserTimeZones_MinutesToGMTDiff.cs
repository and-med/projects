using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeZonesApp.Data.Migrations
{
    public partial class Added_UserTimeZones_MinutesToGMTDiff : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GMT",
                table: "UserTimeZones");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "UserTimeZones",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(32)",
                oldMaxLength: 32,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CityName",
                table: "UserTimeZones",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(128)",
                oldMaxLength: 128,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HoursDiffToGMT",
                table: "UserTimeZones",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "MinutesDiffToGMT",
                table: "UserTimeZones",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoursDiffToGMT",
                table: "UserTimeZones");

            migrationBuilder.DropColumn(
                name: "MinutesDiffToGMT",
                table: "UserTimeZones");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "UserTimeZones",
                type: "nvarchar(32)",
                maxLength: 32,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "CityName",
                table: "UserTimeZones",
                type: "nvarchar(128)",
                maxLength: 128,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 128);

            migrationBuilder.AddColumn<int>(
                name: "GMT",
                table: "UserTimeZones",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
