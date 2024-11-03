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

RUN dotnet publish -c Debug -o out
RUN dotnet tool install --global dotnet-ef --version 3.0.0
ENV PATH="$PATH:/root/.dotnet/tools"

ENTRYPOINT ["dotnet"]