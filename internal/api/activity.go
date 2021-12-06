package api

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"github.com/and-med/go-time-tracker/internal/activity"
	"github.com/and-med/go-time-tracker/internal/db"
	"github.com/and-med/go-time-tracker/internal/repository"
)

func newActivityRepo(c *gin.Context) (*repository.ActivityRepository, error) {
	db, err := db.InitDatabase()
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error with database!"})
		return nil, err
	}

	return repository.NewActivityRepository(db), nil
}

func newCreateActivityCommand(c *gin.Context) (*activity.CreateActivityCommand, error) {
	repo, err := newActivityRepo(c)
	if err != nil {
		return nil, err
	}
	cmd := activity.NewCreateActivityCommand(repo)
	return cmd, nil
}

func getActivities(c *gin.Context) {
	repo, err := newActivityRepo(c)
	if err != nil {
		return
	}
	defer repo.Close()

	activities, err := repo.GetAll()
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error reading activities!"})
		return
	}
	c.IndentedJSON(http.StatusOK, activities)
}

func getActivityById(c *gin.Context) {
	id_str := c.Param("id")
	repo, err := newActivityRepo(c)
	if err != nil {
		return
	}
	defer repo.Close()

	id, err := strconv.Atoi(id_str)
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "id parameter should be of integer type!"})
		return
	}

	activity, err := repo.Get(int64(id))
	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Activity Not Found!"})
		return
	}
	c.IndentedJSON(http.StatusOK, activity)
}

func postActivity(c *gin.Context) {
	var newAct activity.Activity

	if err := c.BindJSON(&newAct); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "Request body is not valid Activity object!"})
		return
	}

	cmd, err := newCreateActivityCommand(c)
	if err != nil {
		return
	}
	defer cmd.Close()

	act, err := cmd.Create(newAct)
	if err != nil {
		c.IndentedJSON(http.StatusInternalServerError, gin.H{"message": "Error creating activity!"})
	}
	c.IndentedJSON(http.StatusCreated, act)
}

func addActivityRoutes(engine *gin.Engine) {
	engine.GET("/activities", getActivities)
	engine.GET("/activities/:id", getActivityById)
	engine.POST("/activities", postActivity)
}
