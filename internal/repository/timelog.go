package repository

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/and-med/go-time-tracker/internal/timelog"
)

var (
	timelogFields    string = "id, activity_id, created_at, start_at, end_at"
	timelogTableName string = "time_logs"
)

func scanTimelog(row rowScanner) (timelog.TimeLog, error) {
	a := timelog.TimeLog{}
	err := row.Scan(&a.ID, &a.ActivityId, &a.CreatedAt, &a.StartAt, &a.EndAt)
	return a, err
}

type TimelogRepository struct {
	DB     *sql.DB
	Logger *log.Logger
}

func NewTimelogRepository(db *sql.DB) *TimelogRepository {
	return &TimelogRepository{
		DB:     db,
		Logger: log.Default(),
	}
}

func (r *TimelogRepository) GetByActivityId(activityId int) ([]timelog.TimeLog, error) {
	query := fmt.Sprintf("SELECT %s FROM %s WHERE activity_id = ?", timelogFields, timelogTableName)
	rows, err := r.DB.Query(query, activityId)
	timelogs := []timelog.TimeLog{}

	if err != nil {
		return timelogs, err
	}

	for rows.Next() {
		tl, err := scanTimelog(rows)
		if err != nil {
			return timelogs, err
		}
		timelogs = append(timelogs, tl)
	}

	if rows.Err() != nil {
		return timelogs, rows.Err()
	}

	return timelogs, nil
}

func (r *TimelogRepository) Get(id int) (timelog.TimeLog, error) {
	query := fmt.Sprintf("SELECT %s FROM %s WHERE id = ?", timelogFields, timelogTableName)
	row := r.DB.QueryRow(query, id)

	return scanTimelog(row)
}

func (r *TimelogRepository) Create(a timelog.TimeLog) (timelog.TimeLog, error) {
	query := fmt.Sprintf("INSERT INTO %s(activity_id, start_at) VALUES (?, ?) RETURNING %s", timelogTableName, timelogFields)
	row := r.DB.QueryRow(query, a.ActivityId, a.StartAt)

	return scanTimelog(row)
}
