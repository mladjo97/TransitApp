namespace TransitAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdatedDataAnnotations : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Stations", "Name", c => c.String(maxLength: 256));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Stations", "Name", c => c.String(nullable: false, maxLength: 256));
        }
    }
}
