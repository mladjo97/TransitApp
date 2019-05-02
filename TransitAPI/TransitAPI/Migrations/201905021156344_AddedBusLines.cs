namespace TransitAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedBusLines : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StartTimes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Time = c.DateTime(nullable: false),
                        BusLine_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.BusLines", t => t.BusLine_Id)
                .Index(t => t.BusLine_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StartTimes", "BusLine_Id", "dbo.BusLines");
            DropIndex("dbo.StartTimes", new[] { "BusLine_Id" });
            DropTable("dbo.StartTimes");
        }
    }
}
