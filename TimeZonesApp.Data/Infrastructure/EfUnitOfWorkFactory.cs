namespace TimeZonesApp.Data.Infrastructure
{
    public class EfUnitOfWorkFactory : IUnitOfWorkFactory
    {
        private readonly TimeZonesContext _context;
        public EfUnitOfWorkFactory(TimeZonesContext context)
        {
            _context = context;
        }

        public IUnitOfWork GetUnitOfWork()
        {
            return new EfUnitOfWork(_context);
        }
    }
}
