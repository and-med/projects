package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/and-med/go-time-tracker/internal/activity"
	"github.com/and-med/go-time-tracker/internal/db"
	"github.com/and-med/go-time-tracker/internal/repository"
)

func newActivityRepo() (*repository.ActivityRepository, error) {
	db, err := db.OpenDB()
	return repository.NewActivityRepository(db), err
}

func newCreateActivityCommand(c *gin.Context) (*activity.CreateCommand, error) {
	repo, err := newActivityRepo()
	retriever := NewAuthorizedUserRetriever(c)
	return activity.NewCreateCommand(repo, retriever), err
}

func getActivities(c *gin.Context) {
	repo, err := newActivityRepo()
	if err != nil {
		errorConnectingToDatabase(c)
		return
	}

	activities, err := repo.GetAll()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error reading activities"})
		return
	}
	c.IndentedJSON(http.StatusOK, activities)
}

func getActivityById(c *gin.Context) {
	id_str := c.Param("id")
	repo, err := newActivityRepo()
	if err != nil {
		errorConnectingToDatabase(c)
		return
	}

	id, err := strconv.Atoi(id_str)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id parameter is invalid"})
		return
	}

	activity, err := repo.Get(int64(id))
	if err != nil {
		errorNotFound(c)
		return
	}
	c.IndentedJSON(http.StatusOK, activity)
}

func postActivity(c *gin.Context) {
	var newAct activity.Activity

	if err := c.BindJSON(&newAct); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "body is invalid"})
		return
	}

	cmd, err := newCreateActivityCommand(c)
	if err != nil {
		errorConnectingToDatabase(c)
		return
	}

	act, err := cmd.Create(newAct)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}
	c.IndentedJSON(http.StatusCreated, act)
}

func addActivityRoutes(router *gin.RouterGroup) {
	router.GET("", getActivities)
	router.GET(":id", getActivityById)
	router.POST("", postActivity)
}
