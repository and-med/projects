namespace TimeZonesApp.Data.Infrastructure
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork GetUnitOfWork();
    }
}
