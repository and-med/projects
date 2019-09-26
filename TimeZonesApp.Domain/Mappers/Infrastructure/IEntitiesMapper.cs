using System.Collections.Generic;

namespace TimeZonesApp.Domain.Mappers.Infrastructure
{
    public interface IEntitiesMapper<TTargetEntity, TResultEntity>
        : IOneWayEntitiesMapper<TTargetEntity, TResultEntity>
    {
        TTargetEntity Map(TResultEntity entity);

        IEnumerable<TTargetEntity> Map(IEnumerable<TResultEntity> entities);
    }
}
