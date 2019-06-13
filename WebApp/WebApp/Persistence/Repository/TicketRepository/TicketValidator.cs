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
                    isValid = DateTime.Now.Date < ticket.TimeOfPurchase.Date.AddDays(1);
                    break;
                case "Monthly":
                    DateTime monthlyCheckDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, day: 1, hour: 0, minute: 0, second: 0);
                    isValid = DateTime.Now < monthlyCheckDate;
                    break;
                case "Annual":
                    DateTime annualCheckDate = new DateTime(DateTime.Now.Year + 1, month: 1, day: 1, hour: 0, minute: 0, second: 0);
                    isValid = DateTime.Now < annualCheckDate;
                    break;
                default:
                    isValid = false;
                    break;
            }

            return isValid;
        }
    }
}