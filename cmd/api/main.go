package main

import (
	"log"

	"github.com/and-med/go-time-tracker/internal/api"
	"github.com/and-med/go-time-tracker/internal/db"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
	err := db.MigrateDatabase()
	if err != nil {
		log.Fatal(err)
		return
	}

	err = api.RunServer()
	if err != nil {
		log.Fatal(err)
	}
}
