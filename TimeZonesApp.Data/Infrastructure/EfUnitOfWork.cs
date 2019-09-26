using System;
using System.Threading.Tasks;

namespace TimeZonesApp.Data.Infrastructure
{
    public class EfUnitOfWork : IUnitOfWork, IDisposable
    {
        private bool disposed = false;
        private readonly TimeZonesContext _context;

        public EfUnitOfWork(TimeZonesContext context)
        {
            _context = context;
        }

        public IRepository<T> GetRepository<T>() where T : class
        {
            return new GenericEfRepository<T>(_context);
        }

        public Task SaveChangesAsync()
        {
            return _context.SaveChangesAsync();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
