namespace WebApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddedTransactions : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.PayPalTransactions",
                c => new
                    {
                        OrderId = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(),
                        CreateTime = c.String(),
                        Status = c.String(),
                        PayerEmail = c.String(),
                    })
                .PrimaryKey(t => t.OrderId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.PayPalTransactions");
        }
    }
}
