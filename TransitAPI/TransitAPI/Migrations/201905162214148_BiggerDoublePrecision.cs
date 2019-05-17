namespace TransitAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class BiggerDoublePrecision : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Stations", "Lon", c => c.Decimal(nullable: false, precision: 20, scale: 18));
            AlterColumn("dbo.Stations", "Lat", c => c.Decimal(nullable: false, precision: 20, scale: 18));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Stations", "Lat", c => c.Decimal(nullable: false, precision: 18, scale: 2));
            AlterColumn("dbo.Stations", "Lon", c => c.Decimal(nullable: false, precision: 18, scale: 2));
        }
    }
}
