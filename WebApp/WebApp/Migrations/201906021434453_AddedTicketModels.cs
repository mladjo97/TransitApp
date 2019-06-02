namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedTicketModels : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.UserTypes", new[] { "Name" });
            CreateTable(
                "dbo.UserTypeDiscounts",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserTypeId = c.Int(nullable: false),
                        Discount = c.Single(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserTypes", t => t.UserTypeId, cascadeDelete: true)
                .Index(t => t.UserTypeId);
            
            CreateTable(
                "dbo.Tickets",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TimeOfPurchase = c.DateTime(nullable: false),
                        IsValid = c.Boolean(nullable: false),
                        UserId = c.String(nullable: false, maxLength: 128),
                        TicketInspectorId = c.String(maxLength: 128),
                        ItemId = c.Int(nullable: false),
                        ApplicationUser_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.PriceListItems", t => t.ItemId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.TicketInspectorId)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.ApplicationUser_Id)
                .Index(t => t.UserId)
                .Index(t => t.TicketInspectorId)
                .Index(t => t.ItemId)
                .Index(t => t.ApplicationUser_Id);
            
            CreateTable(
                "dbo.PriceListItems",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        BasePrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        TicketTypeId = c.Int(nullable: false),
                        PriceListId = c.Int(nullable: false),
                        DiscountId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.UserTypeDiscounts", t => t.DiscountId, cascadeDelete: false)
                .ForeignKey("dbo.PriceLists", t => t.PriceListId, cascadeDelete: true)
                .ForeignKey("dbo.TicketTypes", t => t.TicketTypeId, cascadeDelete: true)
                .Index(t => t.TicketTypeId)
                .Index(t => t.PriceListId)
                .Index(t => t.DiscountId);
            
            CreateTable(
                "dbo.PriceLists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ValidFrom = c.DateTime(nullable: false),
                        ValidUntil = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.TicketTypes",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserTypeDiscounts", "UserTypeId", "dbo.UserTypes");
            DropForeignKey("dbo.Tickets", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.Tickets", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Tickets", "TicketInspectorId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Tickets", "ItemId", "dbo.PriceListItems");
            DropForeignKey("dbo.PriceListItems", "TicketTypeId", "dbo.TicketTypes");
            DropForeignKey("dbo.PriceListItems", "PriceListId", "dbo.PriceLists");
            DropForeignKey("dbo.PriceListItems", "DiscountId", "dbo.UserTypeDiscounts");
            DropIndex("dbo.PriceListItems", new[] { "DiscountId" });
            DropIndex("dbo.PriceListItems", new[] { "PriceListId" });
            DropIndex("dbo.PriceListItems", new[] { "TicketTypeId" });
            DropIndex("dbo.Tickets", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.Tickets", new[] { "ItemId" });
            DropIndex("dbo.Tickets", new[] { "TicketInspectorId" });
            DropIndex("dbo.Tickets", new[] { "UserId" });
            DropIndex("dbo.UserTypeDiscounts", new[] { "UserTypeId" });
            DropTable("dbo.TicketTypes");
            DropTable("dbo.PriceLists");
            DropTable("dbo.PriceListItems");
            DropTable("dbo.Tickets");
            DropTable("dbo.UserTypeDiscounts");
            CreateIndex("dbo.UserTypes", "Name", unique: true);
        }
    }
}
