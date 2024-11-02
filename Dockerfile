FROM node:16-alpine AS build-ui

WORKDIR /app

COPY client-app/package.json ./package.json
COPY client-app/package-lock.json ./package-lock.json
RUN npm install

COPY client-app/public ./public
COPY client-app/src ./src
COPY client-app/tsconfig.json ./tsconfig.json
COPY client-app/typings-custom/ ./typings-custom/

ENV REACT_APP_API_URL=/api
ENV REACT_APP_API_CHAT_URL=/chat

RUN npm run build --ignore-scripts

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-backend

WORKDIR /app

COPY API/API.csproj ./API/API.csproj
COPY Application/Application.csproj ./Application/Application.csproj
COPY Domain/Domain.csproj ./Domain/Domain.csproj
COPY Infrastructure/Infrastructure.csproj ./Infrastructure/Infrastructure.csproj
COPY Persistence/Persistence.csproj ./Persistence/Persistence.csproj
COPY Reactivities.sln ./Reactivities.sln
RUN dotnet restore

COPY API/ ./API/
COPY Application/ ./Application/
COPY Domain/ ./Domain/
COPY Infrastructure/ ./Infrastructure/
COPY Persistence/ ./Persistence/

RUN dotnet publish -c Debug -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app

COPY --from=build-backend /app/out .
COPY --from=build-ui /app/build ./wwwroot
COPY --from=build-ui /app/build/assets ./assets
COPY --from=build-backend /app/API/Properties/launchSettings.json .
COPY --from=build-backend /app/API/appsettings.Development.json .

ENV ASPNETCORE_ENVIRONMENT=Development
ENTRYPOINT ["dotnet", "API.dll"]