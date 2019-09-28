using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TimeZonesApp.Data.Migrations
{
    public partial class _20190927222947_Added_RefreshTokens : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTimeZone_AspNetUsers_OwnerId",
                table: "UserTimeZone");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTimeZone",
                table: "UserTimeZone");

            migrationBuilder.RenameTable(
                name: "UserTimeZone",
                newName: "UserTimeZones");

            migrationBuilder.RenameIndex(
                name: "IX_UserTimeZone_OwnerId",
                table: "UserTimeZones",
                newName: "IX_UserTimeZones_OwnerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTimeZones",
                table: "UserTimeZones",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Token = table.Column<Guid>(nullable: false),
                    JwtId = table.Column<Guid>(nullable: false),
                    CreationDate = table.Column<DateTime>(nullable: false),
                    ExpiryDate = table.Column<DateTime>(nullable: false),
                    Used = table.Column<bool>(nullable: false),
                    Invalidated = table.Column<bool>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Token);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTimeZones_AspNetUsers_OwnerId",
                table: "UserTimeZones",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserTimeZones_AspNetUsers_OwnerId",
                table: "UserTimeZones");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserTimeZones",
                table: "UserTimeZones");

            migrationBuilder.RenameTable(
                name: "UserTimeZones",
                newName: "UserTimeZone");

            migrationBuilder.RenameIndex(
                name: "IX_UserTimeZones_OwnerId",
                table: "UserTimeZone",
                newName: "IX_UserTimeZone_OwnerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserTimeZone",
                table: "UserTimeZone",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserTimeZone_AspNetUsers_OwnerId",
                table: "UserTimeZone",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
