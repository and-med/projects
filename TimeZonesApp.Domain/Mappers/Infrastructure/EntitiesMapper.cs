using System.Collections.Generic;
using System.Linq;

namespace TimeZonesApp.Domain.Mappers.Infrastructure
{
    public abstract class EntitiesMapper<TTargetEntity, TResultEntity> 
        : OneWayEntitiesMapper<TTargetEntity, TResultEntity>, IEntitiesMapper<TTargetEntity, TResultEntity>
    {
        public abstract TTargetEntity Map(TResultEntity entity);

        public IEnumerable<TTargetEntity> Map(IEnumerable<TResultEntity> entities)
        {
            return entities.Select(Map);
        }
    }
}
