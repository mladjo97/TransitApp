namespace TransitAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedBusLineStationsJoinTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StationBusLines", "Station_Id", "dbo.Stations");
            DropForeignKey("dbo.StationBusLines", "BusLine_Id", "dbo.BusLines");
            DropIndex("dbo.StationBusLines", new[] { "Station_Id" });
            DropIndex("dbo.StationBusLines", new[] { "BusLine_Id" });
            CreateTable(
                "dbo.BusLineStations",
                c => new
                    {
                        BusLineId = c.Int(nullable: false),
                        StationId = c.Int(nullable: false),
                        StopOrder = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.BusLineId, t.StationId })
                .ForeignKey("dbo.BusLines", t => t.BusLineId, cascadeDelete: true)
                .ForeignKey("dbo.Stations", t => t.StationId, cascadeDelete: true)
                .Index(t => t.BusLineId)
                .Index(t => t.StationId);
            
            DropTable("dbo.StationBusLines");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.StationBusLines",
                c => new
                    {
                        Station_Id = c.Int(nullable: false),
                        BusLine_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Station_Id, t.BusLine_Id });
            
            DropForeignKey("dbo.BusLineStations", "StationId", "dbo.Stations");
            DropForeignKey("dbo.BusLineStations", "BusLineId", "dbo.BusLines");
            DropIndex("dbo.BusLineStations", new[] { "StationId" });
            DropIndex("dbo.BusLineStations", new[] { "BusLineId" });
            DropTable("dbo.BusLineStations");
            CreateIndex("dbo.StationBusLines", "BusLine_Id");
            CreateIndex("dbo.StationBusLines", "Station_Id");
            AddForeignKey("dbo.StationBusLines", "BusLine_Id", "dbo.BusLines", "Id", cascadeDelete: true);
            AddForeignKey("dbo.StationBusLines", "Station_Id", "dbo.Stations", "Id", cascadeDelete: true);
        }
    }
}
