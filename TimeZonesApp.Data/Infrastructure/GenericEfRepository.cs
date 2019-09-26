using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace TimeZonesApp.Data.Infrastructure
{
    public class GenericEfRepository<TEntity> : IRepository<TEntity>
        where TEntity : class
    {
        private readonly DbSet<TEntity> _entities;

        public GenericEfRepository(TimeZonesContext context)
        {
            _entities = context.Set<TEntity>();
        }

        public TEntity Create(TEntity entity)
        {
            var response = _entities.Add(entity);
            return response.Entity;
        }

        public void Create(IEnumerable<TEntity> entities)
        {
            _entities.AddRange(entities);
        }

        public void Delete(TEntity entity)
        {
            _entities.Remove(entity);
        }

        public void Delete(IEnumerable<TEntity> entities)
        {
            _entities.RemoveRange(entities);
        }

        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> expression)
        {
            return await _entities.Where(expression).ToListAsync();
        }

        public void Update(TEntity entity)
        {
            _entities.Update(entity);
        }
    }
}
