FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build-backend

WORKDIR /app

COPY TimeZonesApp.Api/TimeZonesApp.Api.csproj ./TimeZonesApp.Api/TimeZonesApp.Api.csproj
COPY TimeZonesApp.Auth/TimeZonesApp.Auth.csproj ./TimeZonesApp.Auth/TimeZonesApp.Auth.csproj
COPY TimeZonesApp.Data/TimeZonesApp.Data.csproj ./TimeZonesApp.Data/TimeZonesApp.Data.csproj
COPY TimeZonesApp.Domain/TimeZonesApp.Domain.csproj ./TimeZonesApp.Domain/TimeZonesApp.Domain.csproj
COPY TimeZonesApp.Infrastructure/TimeZonesApp.Infrastructure.csproj ./TimeZonesApp.Infrastructure/TimeZonesApp.Infrastructure.csproj
COPY TimeZonesApp.sln ./TimeZonesApp.sln
RUN dotnet restore

COPY TimeZonesApp.Api/ ./TimeZonesApp.Api/
COPY TimeZonesApp.Auth/ ./TimeZonesApp.Auth/
COPY TimeZonesApp.Data/ ./TimeZonesApp.Data/
COPY TimeZonesApp.Domain/ ./TimeZonesApp.Domain/
COPY TimeZonesApp.Infrastructure/ ./TimeZonesApp.Infrastructure/

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/core/sdk:3.0
WORKDIR /app

COPY --from=build-backend /app/out .
COPY --from=build-backend /app/TimeZonesApp.Api/appsettings.json .
COPY --from=build-backend /app/TimeZonesApp.Api/appsettings.Development.json .

ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "TimeZonesApp.Api.dll"]