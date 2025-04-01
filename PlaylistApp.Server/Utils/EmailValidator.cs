namespace PlaylistApp.Server.Utils;

public static class EmailValidator
{
    public static bool IsValidEmail(string? email)
    {
        if (email is null) return false;

        var trimmedEmail = email.Trim();

        if (trimmedEmail.EndsWith("."))
        {
            return false;
        }
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == trimmedEmail;
        }
        catch
        {
            return false;
        }
    }
}
