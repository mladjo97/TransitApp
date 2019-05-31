namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedVerifiedDocumentImage : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "VerifiedDocumentImage", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "VerifiedDocumentImage");
        }
    }
}
