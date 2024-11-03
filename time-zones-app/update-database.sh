#!/bin/bash

## This script applies any new unapplied migrations to the db schema.
## See generate-migration.sh script on how migrations are generated.

die () {
    echo >&2 "$@"
    exit 1
}

echo "Building migration.Dockerfile with tag time-zones-app-migration"
docker build --tag time-zones-app-migration -f migration.Dockerfile . || die "build failed"

echo "Applying changes to the database"
docker run --rm -v "./data:/app/data" -v "./TimeZonesApp.Data/Migrations:/app/TimeZonesApp.Data/Migrations" time-zones-app-migration ef database update --project TimeZonesApp.Data --startup-project TimeZonesApp.Api || die "update database failed"