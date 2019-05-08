namespace TransitAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedBusLineClasses : DbMigration
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
                        Station_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BusLineTypes", t => t.BusLineTypeId, cascadeDelete: true)
                .ForeignKey("dbo.Stations", t => t.Station_Id)
                .Index(t => t.BusLineTypeId)
                .Index(t => t.Station_Id);
            
            CreateTable(
                "dbo.StartTimes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BusLineId = c.Int(nullable: false),
                        Time = c.DateTime(nullable: false),
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
            
            CreateTable(
                "dbo.Stations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(maxLength: 256),
                        Address = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BusLines", "Station_Id", "dbo.Stations");
            DropForeignKey("dbo.BusLines", "BusLineTypeId", "dbo.BusLineTypes");
            DropForeignKey("dbo.StartTimes", "BusLineId", "dbo.BusLines");
            DropIndex("dbo.BusLineTypes", new[] { "Name" });
            DropIndex("dbo.StartTimes", new[] { "BusLineId" });
            DropIndex("dbo.BusLines", new[] { "Station_Id" });
            DropIndex("dbo.BusLines", new[] { "BusLineTypeId" });
            DropTable("dbo.Stations");
            DropTable("dbo.BusLineTypes");
            DropTable("dbo.StartTimes");
            DropTable("dbo.BusLines");
        }
    }
}
