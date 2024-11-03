# Time Zones App

This is an example app that implements Rest API, ReactJs frontend + authentication using jwt tokens.

## Running locally

```bash
docker-compose up
```

Visit localhost:3000

## Generating certificates 

For some reason development build of asp.net core 3.0 didn't work for me so I had to use production build.
For that I needed to setup the certificates, here's [the original article](https://learn.microsoft.com/en-us/aspnet/core/security/docker-https?view=aspnetcore-3.0).


To run these, certificate needs to be generated:

```bash
dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx -p <CREDENTIAL_PLACEHOLDER>
dotnet dev-certs https --trust
```