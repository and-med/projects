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

        public async Task<IEnumerable<TEntity>> GetAsync(
            Expression<Func<TEntity, bool>> expression = null, 
            params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> baseList = Apply(expression, includes);

            return await baseList.ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAsync<TNestedEntity>(
            Expression<Func<TEntity, bool>> expression = null,
            Expression<Func<TEntity, IEnumerable<TNestedEntity>>> include = null, 
            Expression<Func<TNestedEntity, object>> thenInclude = null)
        {
            IQueryable<TEntity> baseList = ApplyNestedIncludes(expression, include, thenInclude);

            return await baseList.ToListAsync();
        }

        public async Task<TEntity> SingleOrDefaultAsync(
            Expression<Func<TEntity, bool>> expression = null, 
            params Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> baseList = Apply(expression, includes);

            return await baseList.SingleOrDefaultAsync();
        }

        public async Task<TEntity> SingleOrDefaultAsync<TNestedEntity>(
            Expression<Func<TEntity, bool>> expression = null,
            Expression<Func<TEntity, IEnumerable<TNestedEntity>>> include = null,
            Expression<Func<TNestedEntity, object>> thenInclude = null)
        {
            IQueryable<TEntity> baseList = ApplyNestedIncludes(expression, include, thenInclude);

            return await baseList.SingleOrDefaultAsync();
        }

        public void Update(TEntity entity)
        {
            _entities.Update(entity);
        }

        private IQueryable<TEntity> ApplyNestedIncludes<TNestedEntity>(
            Expression<Func<TEntity, bool>> expression,
            Expression<Func<TEntity, IEnumerable<TNestedEntity>>> include,
            Expression<Func<TNestedEntity, object>> thenInclude)
        {
            IQueryable<TEntity> baseList = Apply(expression, null);

            if (include != null)
            {
                var included = baseList.Include(include);
                baseList = included;
                if (thenInclude != null)
                {
                    baseList = included.ThenInclude(thenInclude);
                }
            }

            return baseList;
        }

        private IQueryable<TEntity> Apply(Expression<Func<TEntity, bool>> expression, Expression<Func<TEntity, object>>[] includes)
        {
            IQueryable<TEntity> baseList = _entities;

            if (expression != null)
            {
                baseList = baseList.Where(expression);
            }

            if (includes != null)
            {
                foreach (var include in includes)
                {
                    baseList = baseList.Include(include);
                }
            }

            return baseList;
        }
    }
}
