using System.Net;
using System.Net.Mail;

namespace WebApp.Models.Email
{
    public static class EmailHelper
    {
        public static void SendSuccess(string address)
        {
            MailMessage mail = new MailMessage("noreply@transit.com", address);
            mail.Subject = "Transit App - Document Verification Status";
            mail.Body = "Your document image has been verified.";

            SmtpClient client = new SmtpClient("smtp.yandex.com", 587);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            //client.Credentials = new NetworkCredential("", "");
            
            client.Send(mail);
        }

        public static void SendReject(string address)
        {
            MailMessage mail = new MailMessage("noreply@transit.com", address);
            mail.Subject = "Transit App - Document Verification Status";
            mail.Body = "Your document image has been verified.";

            SmtpClient client = new SmtpClient("smtp.yandex.com", 465);
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            //client.Credentials = new NetworkCredential("", "");

            client.Send(mail);
        }
    }
}