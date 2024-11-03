using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace TimeZonesApp.Data.Infrastructure
{
    public interface IRepository<TEntity> 
        where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression = null, 
            params Expression<Func<TEntity, object>>[] includes);
        Task<IEnumerable<TEntity>> GetAsync<TNestedEntity>(
            Expression<Func<TEntity, bool>> expression = null,
            Expression<Func<TEntity, IEnumerable<TNestedEntity>>> include = null,
            Expression<Func<TNestedEntity, object>> thenInclude = null);
        Task<TEntity> SingleOrDefaultAsync(Expression<Func<TEntity, bool>> expression = null, 
            params Expression<Func<TEntity, object>>[] includes);
        Task<TEntity> SingleOrDefaultAsync<TNestedEntity>(
            Expression<Func<TEntity, bool>> expression = null,
            Expression<Func<TEntity, IEnumerable<TNestedEntity>>> include = null,
            Expression<Func<TNestedEntity, object>> thenInclude = null);
        TEntity Create(TEntity entity);
        void Create(IEnumerable<TEntity> entities);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        void Delete(IEnumerable<TEntity> entities);
        Task SaveChangesAsync();
    }
}
