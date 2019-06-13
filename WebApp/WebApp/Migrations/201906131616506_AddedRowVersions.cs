namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedRowVersions : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.BusLines", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.Stations", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
            AddColumn("dbo.PriceLists", "RowVersion", c => c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"));
        }
        
        public override void Down()
        {
            DropColumn("dbo.PriceLists", "RowVersion");
            DropColumn("dbo.Stations", "RowVersion");
            DropColumn("dbo.BusLines", "RowVersion");
        }
    }
}
