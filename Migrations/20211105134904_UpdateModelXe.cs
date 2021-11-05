using Microsoft.EntityFrameworkCore.Migrations;

namespace QuanLyNhaXe.Migrations
{
    public partial class UpdateModelXe : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoTang",
                table: "LoaiXe");

            migrationBuilder.AddColumn<int>(
                name: "SoTang",
                table: "Xe",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoTang",
                table: "Xe");

            migrationBuilder.AddColumn<int>(
                name: "SoTang",
                table: "LoaiXe",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
