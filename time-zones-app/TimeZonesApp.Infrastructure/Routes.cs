namespace TimeZonesApp.Infrastructure
{
    public static class Routes
    {
        public static class UserTimeZones
        {
            public const string Base = "user-time-zones";
        }
        public static class Users
        {
            public const string Base = "users";
        }
        public static class Auth
        {
            public const string Base = "auth";
            public const string Register = "register";
            public const string Login = "login";
            public const string Refresh = "refresh";
        }
    }
}
