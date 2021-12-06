package db

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/lib/pq"
)

type MigrationLogger struct {
	Log *log.Logger
}

func (l *MigrationLogger) Printf(format string, v ...interface{}) {
	l.Log.Printf(format, v...)
}

func (l *MigrationLogger) Verbose() bool {
	return true
}

func MigrateDatabase() error {
	m, err := migrate.New(
		"file://db/migrations",
		"postgresql://admin:nV88XxSuVqW9sAKk@localhost:5432/time-tracker?sslmode=disable")
	m.Log = &MigrationLogger{
		Log: log.Default(),
	}

	if err != nil {
		return err
	}
	defer m.Close()

	err = m.Up()
	if err != nil {
		log.Print("Error occurred during up.")
	}

	return nil
}

func InitDatabase() (*sql.DB, error) {
	const (
		host     = "localhost"
		port     = 5432
		user     = "admin"
		password = "nV88XxSuVqW9sAKk"
		dbname   = "time-tracker"
	)
	conn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	return sql.Open("postgres", conn)
}
