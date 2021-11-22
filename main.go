package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
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

func getActivities(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, activities)
}

func getActivityById(c *gin.Context) {
	id := c.Param("id")
	for _, activity := range activities {
		if activity.ID == id {
			c.IndentedJSON(http.StatusOK, activity)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Project Not Found!"})
}

func postActivity(c *gin.Context) {
	var newActivity Activity

	if err := c.BindJSON(&newActivity); err != nil {
		return
	}

	activities = append(activities, newActivity)
	c.IndentedJSON(http.StatusCreated, newActivity)
}

func main() {
	router := gin.Default()
	router.GET("/activities", getActivities)
	router.GET("/activities/:id", getActivityById)
	router.POST("/activities", postActivity)

	router.Run("localhost:8080")
}
