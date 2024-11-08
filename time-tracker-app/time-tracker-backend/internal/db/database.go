package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

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

func getDbConfigs() (host, port, user, password, dbname string) {
	return os.Getenv("DATABASE_HOST"),
		os.Getenv("DATABASE_PORT"),
		os.Getenv("DATABASE_USER"),
		os.Getenv("DATABASE_PASSWORD"),
		os.Getenv("DATABASE_NAME")
}

func MigrateDB() error {
	host, port, user, password, dbname := getDbConfigs()
	url := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s?sslmode=disable", user, password, host, port, dbname)

	m, err := migrate.New("file://db/migrations", url)
	if err != nil {
		return fmt.Errorf("error migrating db: %w", err)
	}

	m.Log = &MigrationLogger{
		Log: log.Default(),
	}

	defer m.Close()

	err = m.Up()

	if err != nil && err != migrate.ErrNoChange {
		return err
	}

	return nil
}

func OpenDB() (*sql.DB, error) {
	host, port, user, password, dbname := getDbConfigs()
	conn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	return sql.Open("postgres", conn)
}
