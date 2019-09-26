using System.Collections.Generic;
using System.Linq;

namespace TimeZonesApp.Domain.Mappers.Infrastructure
{
    public abstract class OneWayEntitiesMapper<TTargetEntity, TResultEntity> 
        : IOneWayEntitiesMapper<TTargetEntity, TResultEntity>
    {
        public abstract TResultEntity Map(TTargetEntity entity);

        public IEnumerable<TResultEntity> Map(IEnumerable<TTargetEntity> entities)
        {
            return entities.Select(Map);
        }
    }
}
