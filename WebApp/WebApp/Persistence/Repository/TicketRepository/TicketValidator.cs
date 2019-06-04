using System;
using WebApp.Models;

namespace WebApp.Persistence.Repository.TicketRepository
{
    public static class TicketValidator
    {
        public static bool Validate(Ticket ticket)
        {
            bool isValid = false;

            if(ticket.Item == null)
            {
                return isValid;
            }
            if(ticket.Item.TicketType == null)
            {
                return isValid;
            }

            switch(ticket.Item.TicketType.Name)
            {
                case "SingleUse":
                    isValid = DateTime.Now < ticket.TimeOfPurchase.AddHours(1);
                    break;
                case "Daily":
                    isValid = DateTime.Now < ticket.TimeOfPurchase.AddDays(1);
                    break;
                case "Monthly":
                    isValid = DateTime.Now < ticket.TimeOfPurchase.AddMonths(1);
                    break;
                case "Annual":
                    isValid = DateTime.Now < ticket.TimeOfPurchase.AddYears(1);
                    break;
                default:
                    isValid = false;
                    break;
            }

            return isValid;
        }
    }
}