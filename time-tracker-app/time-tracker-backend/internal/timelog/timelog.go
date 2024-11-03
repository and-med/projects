package timelog

import (
	"time"
)

type TimeLog struct {
	ID         int        `json:"id"`
	ActivityId int        `json:"activityId"`
	CreatedAt  time.Time  `json:"createdAt"`
	StartAt    time.Time  `json:"startAt"`
	EndAt      *time.Time `json:"endAt"`
}

type Repository interface {
	Get(int) (TimeLog, error)
	GetByActivityId(int) ([]TimeLog, error)
	Create(TimeLog) (TimeLog, error)
}
