package activity

import (
	"errors"
)

type Activity struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`
}

var activities = []Activity {
	{ ID: "1", Name: "Checkout", Description: "Some of the work I'm doing." },
	{ ID: "2", Name: "TimeTracker", Description: "My Time Tracker" },
}

func GetAll() []Activity {
	return activities
}

func GetActivityById(id string) (*Activity, error) {
	for _, activity := range activities {
		if activity.ID == id {
			return &activity, nil
		}
	}

	return nil, errors.New("not found")
}

func CreateActivity(act Activity) {
	activities = append(activities, act)
}