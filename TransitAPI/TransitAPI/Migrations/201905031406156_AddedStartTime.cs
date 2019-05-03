namespace TransitAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedStartTime : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.StartTimes", "BusLine_Id", "dbo.BusLines");
            DropIndex("dbo.StartTimes", new[] { "BusLine_Id" });
            RenameColumn(table: "dbo.StartTimes", name: "BusLine_Id", newName: "BusLineId");
            DropPrimaryKey("dbo.StartTimes");
            AlterColumn("dbo.StartTimes", "BusLineId", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.StartTimes", new[] { "Id", "BusLineId" });
            CreateIndex("dbo.StartTimes", "BusLineId");
            AddForeignKey("dbo.StartTimes", "BusLineId", "dbo.BusLines", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.StartTimes", "BusLineId", "dbo.BusLines");
            DropIndex("dbo.StartTimes", new[] { "BusLineId" });
            DropPrimaryKey("dbo.StartTimes");
            AlterColumn("dbo.StartTimes", "BusLineId", c => c.Int());
            AddPrimaryKey("dbo.StartTimes", "Id");
            RenameColumn(table: "dbo.StartTimes", name: "BusLineId", newName: "BusLine_Id");
            CreateIndex("dbo.StartTimes", "BusLine_Id");
            AddForeignKey("dbo.StartTimes", "BusLine_Id", "dbo.BusLines", "Id");
        }
    }
}
