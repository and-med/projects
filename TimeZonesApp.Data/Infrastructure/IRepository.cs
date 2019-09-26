using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace TimeZonesApp.Data.Infrastructure
{
    public interface IRepository<TEntity> 
        where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression = null);
        TEntity Create(TEntity entity);
        void Create(IEnumerable<TEntity> entities);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void Delete(IEnumerable<TEntity> entities);
    }
}
