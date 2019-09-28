namespace TimeZonesApp.Infrastructure
{
    public static class Roles
    {
        public const string User = "User";
        public const string UserManager = "UserManager";
        public const string Admin = "Admin";
        public static string[] AllRoles = { User, UserManager, Admin };
    }
}
