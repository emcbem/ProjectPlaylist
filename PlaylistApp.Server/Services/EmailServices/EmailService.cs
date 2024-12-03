using MailKit.Net.Smtp;
using MimeKit;
using PlaylistApp.Server.Data;

namespace PlaylistApp.Server.Services.EmailServices;

public class EmailService : IEmailService
{
	IConfiguration config;

	public EmailService(IConfiguration config)
	{
		this.config = config;
	}

	public bool SendEmailFromNotification(Notification notification, UserAccount user)
	{
		string smtpServer = "smtp.gmail.com"; // Replace with your SMTP server address
		int smtpPort = 587; // Port (e.g., 587 for TLS, 465 for SSL)
		string senderEmail = config.GetValue<string>("EMAIL") ?? throw new Exception("Unable to send users without email config");
		string senderPassword = config.GetValue<string>("EMAIL_PASS") ?? throw new Exception("Unable to send users without email config");
		string recipientEmail = user.Email ?? throw new Exception("Unable to send email to someone who doesn't exist");
		string subject = notification.Title ?? "";
		string body = notification.Body ?? "";

		try
		{
			var email = new MimeMessage();
			email.From.Add(new MailboxAddress("Project Playlist", senderEmail));
			email.To.Add(new MailboxAddress(user.Username, recipientEmail));
			email.Subject = subject;

			// Set the email body
			email.Body = new TextPart("plain")
			{
				Text = body
			};

			// Connect to the SMTP server and send the email
			using (var smtpClient = new SmtpClient())
			{
				smtpClient.Connect(smtpServer, smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
				smtpClient.Authenticate(senderEmail, senderPassword);
				smtpClient.Send(email);
				smtpClient.Disconnect(true);

				Console.WriteLine("Email sent successfully!");
			}
			return true;
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Failed to send email. Error: {ex.Message}");
			return false;
		}
	}
}
