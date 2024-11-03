#!/bin/bash

## This file generates the migration files from the entities defined in TimeZonesApp.Data, aka code-first.
## The idea is simple, the changes to db structure are introduced in three steps:
## 1) make changes to the model in code 
## 2) generate migration via this script (this generates two C# files in TimeZonesApp.Data/Migrations directory)
## 3) apply migration via update-database.sh script

die () {
    echo >&2 "$@"
    exit 1
}

[ "$1" == "" ] && die "usage: ./generate-migration.sh <migration-name>"

echo "Building migration.Dockerfile with tag time-zones-app-migration"
docker build --tag time-zones-app-migration -f migration.Dockerfile . || die "build failed"

echo "Generating initial migration"
docker run --rm -v data:/app/data -v "./TimeZonesApp.Data/Migrations:/app/TimeZonesApp.Data/Migrations" time-zones-app-migration ef migrations add "$1" --project TimeZonesApp.Data --startup-project TimeZonesApp.Api || die "migration generation failed"