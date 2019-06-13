using System;
using System.Net;
using System.Net.Mail;

namespace WebApp.Models.Email
{
    public static class EmailHelper
    {
        public static void SendSuccess(string address)
        {
            MailMessage mail = new MailMessage("udemo.mail@gmail.com", address);
            mail.Subject = "Transit App - Document Verification Status";
            mail.Body = "Your document image has been verified.";

            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential("udemo.mail@gmail.com", "Demo123#");

            try
            {
                client.Send(mail);
            }
            catch (Exception e)
            {
                // what to do, what to do
            }
        }

        public static void SendReject(string address)
        {
            MailMessage mail = new MailMessage("udemo.mail@gmail.com", address);
            mail.Subject = "Transit App - Document Verification Status";
            mail.Body = "Your document image has been verified.";

            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential("udemo.mail@gmail.com", "Demo123#");

            try
            {
                client.Send(mail);
            }
            catch (Exception)
            {
                // what to do, what to do
            }
        }

        public static void SendTicket(string address, Ticket ticket)
        {
            MailMessage mail = new MailMessage("udemo.mail@gmail.com", address);
            mail.Subject = "Transit App - Document Verification Status";
            mail.Body = $@"You have successfully purchased a SingleUser ticket.
                           ID: {ticket.Id}
                           Time of purchase: {ticket.TimeOfPurchase}";

            SmtpClient client = new SmtpClient("smtp.gmail.com", 587);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential("udemo.mail@gmail.com", "Demo123#");

            try
            {
                client.Send(mail);
            }
            catch (Exception e)
            {
                // what to do, what to do
            }
        }
    }
}