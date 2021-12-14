package repository

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/and-med/go-time-tracker/internal/activity"
)

var (
	activityFields    string = "id, name, description, user_id"
	activityTableName string = "activities"
)

func scanActivity(row rowScanner) (activity.Activity, error) {
	a := activity.Activity{}
	err := row.Scan(&a.ID, &a.Name, &a.Description, &a.UserId)
	return a, err
}

type ActivityRepository struct {
	DB     *sql.DB
	Logger *log.Logger
}

func NewActivityRepository(db *sql.DB) *ActivityRepository {
	return &ActivityRepository{
		DB:     db,
		Logger: log.Default(),
	}
}

func (r *ActivityRepository) GetAll() ([]activity.Activity, error) {
	query := fmt.Sprintf("SELECT %s FROM %s", activityFields, activityTableName)
	rows, err := r.DB.Query(query)
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
	query := fmt.Sprintf("SELECT %s FROM %s WHERE id = $1", activityFields, activityTableName)
	row := r.DB.QueryRow(query, id)

	return scanActivity(row)
}

func (r *ActivityRepository) Create(a activity.Activity) (activity.Activity, error) {
	query := fmt.Sprintf(
		"INSERT INTO %s(name, description, user_id) VALUES ($1, $2, $3) RETURNING %s",
		activityTableName,
		activityFields,
	)
	row := r.DB.QueryRow(query, a.Name, a.Description, a.UserId)

	return scanActivity(row)
}
