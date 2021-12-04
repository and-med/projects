package api

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/and-med/go-time-tracker/internal/activity"
)

func getActivities(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, activity.GetAll())
}

func getActivityById(c *gin.Context) {
	id := c.Param("id")
	activity, err := activity.GetActivityById(id)
	if err == nil {
		c.IndentedJSON(http.StatusOK, activity)
		return
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Project Not Found!"})
}

func postActivity(c *gin.Context) {
	var newActivity activity.Activity

	if err := c.BindJSON(&newActivity); err != nil {
		return
	}

	activity.CreateActivity(newActivity)
	c.IndentedJSON(http.StatusCreated, newActivity)
}

func CreateRouter() *gin.Engine {
	router := gin.Default()
	router.GET("/activities", getActivities)
	router.GET("/activities/:id", getActivityById)
	router.POST("/activities", postActivity)

	return router
}
