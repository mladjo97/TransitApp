namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedInitialClasses : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BusLines",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                        Description = c.String(maxLength: 1024),
                        BusLineTypeId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BusLineTypes", t => t.BusLineTypeId, cascadeDelete: true)
                .Index(t => t.BusLineTypeId);
            
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
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 256),
                        Address = c.String(nullable: false, maxLength: 256),
                        Lon = c.Decimal(nullable: false, precision: 20, scale: 18),
                        Lat = c.Decimal(nullable: false, precision: 20, scale: 18),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.StartTimes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BusLineId = c.Int(nullable: false),
                        Time = c.DateTime(nullable: false),
                        DayOfWeek = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Id, t.BusLineId })
                .ForeignKey("dbo.BusLines", t => t.BusLineId, cascadeDelete: true)
                .Index(t => t.BusLineId);
            
            CreateTable(
                "dbo.BusLineTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BusLines", "BusLineTypeId", "dbo.BusLineTypes");
            DropForeignKey("dbo.StartTimes", "BusLineId", "dbo.BusLines");
            DropForeignKey("dbo.BusLineStations", "StationId", "dbo.Stations");
            DropForeignKey("dbo.BusLineStations", "BusLineId", "dbo.BusLines");
            DropIndex("dbo.BusLineTypes", new[] { "Name" });
            DropIndex("dbo.StartTimes", new[] { "BusLineId" });
            DropIndex("dbo.BusLineStations", new[] { "StationId" });
            DropIndex("dbo.BusLineStations", new[] { "BusLineId" });
            DropIndex("dbo.BusLines", new[] { "BusLineTypeId" });
            DropTable("dbo.BusLineTypes");
            DropTable("dbo.StartTimes");
            DropTable("dbo.Stations");
            DropTable("dbo.BusLineStations");
            DropTable("dbo.BusLines");
        }
    }
}
