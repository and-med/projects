using System.Collections.Generic;
using System.Linq;

namespace TimeZonesApp.Domain.Mappers.Infrastructure
{
    public abstract class EntitiesMapper<TTargetEntity, TResultEntity> 
        : OneWayEntitiesMapper<TTargetEntity, TResultEntity>, IEntitiesMapper<TTargetEntity, TResultEntity>
    {
        public abstract TTargetEntity MapEntity(TResultEntity entity);

        public TTargetEntity Map(TResultEntity entity)
        {
            if (entity == null)
            {
                return default;
            }
            return MapEntity(entity);
        }

        public IEnumerable<TTargetEntity> Map(IEnumerable<TResultEntity> entities)
        {
            return entities.Select(Map);
        }
    }
}
