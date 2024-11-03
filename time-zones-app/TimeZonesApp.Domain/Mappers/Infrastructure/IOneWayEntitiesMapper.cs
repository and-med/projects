using System.Collections.Generic;

namespace TimeZonesApp.Domain.Mappers.Infrastructure
{
    public interface IOneWayEntitiesMapper<TTargetEntity, TResultEntity>
    {
        TResultEntity Map(TTargetEntity entity);

        IEnumerable<TResultEntity> Map(IEnumerable<TTargetEntity> entities);
    }
}
