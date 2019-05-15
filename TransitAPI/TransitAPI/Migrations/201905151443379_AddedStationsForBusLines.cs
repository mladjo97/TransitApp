namespace TransitAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedStationsForBusLines : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.BusLines", "Station_Id", "dbo.Stations");
            DropIndex("dbo.BusLines", new[] { "Station_Id" });
            CreateTable(
                "dbo.StationBusLines",
                c => new
                    {
                        Station_Id = c.Int(nullable: false),
                        BusLine_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Station_Id, t.BusLine_Id })
                .ForeignKey("dbo.Stations", t => t.Station_Id, cascadeDelete: true)
                .ForeignKey("dbo.BusLines", t => t.BusLine_Id, cascadeDelete: true)
                .Index(t => t.Station_Id)
                .Index(t => t.BusLine_Id);
            
            DropColumn("dbo.BusLines", "Station_Id");
        }
        
        public override void Down()
        {
            AddColumn("dbo.BusLines", "Station_Id", c => c.Int());
            DropForeignKey("dbo.StationBusLines", "BusLine_Id", "dbo.BusLines");
            DropForeignKey("dbo.StationBusLines", "Station_Id", "dbo.Stations");
            DropIndex("dbo.StationBusLines", new[] { "BusLine_Id" });
            DropIndex("dbo.StationBusLines", new[] { "Station_Id" });
            DropTable("dbo.StationBusLines");
            CreateIndex("dbo.BusLines", "Station_Id");
            AddForeignKey("dbo.BusLines", "Station_Id", "dbo.Stations", "Id");
        }
    }
}
