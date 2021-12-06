package repository

import (
	"database/sql"
	"log"

	"github.com/and-med/go-time-tracker/internal/activity"
)

type ActivityRepository struct {
	DB *sql.DB
	Logger *log.Logger
}

func NewActivityRepository(db *sql.DB) *ActivityRepository {
	return &ActivityRepository{
		DB: db,
		Logger: log.Default(),
	}
}

func (r *ActivityRepository) Close() error {
	return r.DB.Close()
}

func (r *ActivityRepository) GetAll() ([]activity.Activity, error) {
	rows, err := r.DB.Query("SELECT id, name, description FROM activities")
	if err != nil {
		r.Logger.Print(err)
		return nil, err
	}
	defer rows.Close()

	activities := []activity.Activity{}
	for rows.Next() {
		act := activity.Activity{}
		err := rows.Scan(&act.ID, &act.Name, &act.Description)
		if err != nil {
			r.Logger.Print(err)
			return nil, err
		}
		activities = append(activities, act)
	}
	return activities, nil
}

func (r *ActivityRepository) Get(id int64) (activity.Activity, error) {
	row := r.DB.QueryRow("SELECT id, name, description FROM activities WHERE id = ?", id)
	
	return r.scanActivity(row)
}

func (r *ActivityRepository) Create(a activity.Activity) (activity.Activity, error) {
	row := r.DB.QueryRow("INSERT INTO activities(name, description) VALUES (?, ?) RETURNING id, name, description",
		a.Name, a.Description)

	return r.scanActivity(row)
}

func (r *ActivityRepository) scanActivity(row *sql.Row) (activity.Activity, error) {
	if row.Err() != nil {
		r.Logger.Print(row.Err())
		return activity.Activity{}, row.Err()
	}
	act := activity.Activity{}
	err := row.Scan(&act.ID, &act.Name, &act.Description)
	if err != nil {
		r.Logger.Print(err)
		return activity.Activity{}, err
	}

	return act, nil
}
