package repository

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/and-med/go-time-tracker/internal/activity"
)

type rowScanner interface {
	Scan(dest ...interface{}) error
}

func scanActivity(row rowScanner) (activity.Activity, error) {
	a := activity.Activity{}
	err := row.Scan(&a.ID, &a.Name, &a.Description, &a.UserId)
	return a, err
}

var (
	allFields string = "id, name, description, user_id"
	tableName string = "activities"
	getAll    string = fmt.Sprintf("SELECT %s FROM %s", allFields, tableName)
	get       string = fmt.Sprintf("SELECT %s FROM %s WHERE id = ?", allFields, tableName)
	insert    string = fmt.Sprintf("INSERT INTO %s(name, description, user_id) VALUES (?, ?, ?) RETURNING %s", tableName, allFields)
)

func NewActivityRepository(db *sql.DB) *ActivityRepository {
	return &ActivityRepository{
		DB:     db,
		Logger: log.Default(),
	}
}

type ActivityRepository struct {
	DB     *sql.DB
	Logger *log.Logger
}

func (r *ActivityRepository) GetAll() ([]activity.Activity, error) {
	rows, err := r.DB.Query(getAll)
	activities := []activity.Activity{}

	if err != nil {
		return activities, err
	}

	for rows.Next() {
		act, err := scanActivity(rows)
		if err != nil {
			return activities, err
		}
		activities = append(activities, act)
	}

	if rows.Err() != nil {
		return activities, rows.Err()
	}

	return activities, nil
}

func (r *ActivityRepository) Get(id int64) (activity.Activity, error) {
	row := r.DB.QueryRow(get, id)

	return scanActivity(row)
}

func (r *ActivityRepository) Create(a activity.Activity) (activity.Activity, error) {
	row := r.DB.QueryRow(insert, a.Name, a.Description)

	return scanActivity(row)
}
