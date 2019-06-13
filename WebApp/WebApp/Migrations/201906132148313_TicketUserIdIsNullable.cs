namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TicketUserIdIsNullable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Tickets", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Tickets", new[] { "UserId" });
            AlterColumn("dbo.Tickets", "UserId", c => c.String(nullable: true, maxLength: 128));
            CreateIndex("dbo.Tickets", "UserId");
            AddForeignKey("dbo.Tickets", "UserId", "dbo.AspNetUsers", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Tickets", "UserId", "dbo.AspNetUsers");
            DropIndex("dbo.Tickets", new[] { "UserId" });
            AlterColumn("dbo.Tickets", "UserId", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Tickets", "UserId");
            AddForeignKey("dbo.Tickets", "UserId", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
