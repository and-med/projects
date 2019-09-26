using System;
using System.Threading.Tasks;

namespace TimeZonesApp.Data.Infrastructure
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<T> GetRepository<T>() where T : class;

        Task SaveChangesAsync();
    }
}
