# Time Zones App

This is an example app that implements Rest API via dotnet core 3.0, ReactJs frontend + authentication using jwt tokens.

## Running locally

Generated db:
```bash
make update-database
```

```bash
docker-compose up
```

Visit http://localhost:3000

## Generating certificates 

To run this app in production certifcate need to be generated, here's [the article on how to setup certificates for asp.net core 3.0](https://learn.microsoft.com/en-us/aspnet/core/security/docker-https?view=aspnetcore-3.0).