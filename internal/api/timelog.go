package api

import (
	"net/http"
	"strconv"

	"github.com/and-med/go-time-tracker/internal/db"
	"github.com/and-med/go-time-tracker/internal/repository"
	"github.com/and-med/go-time-tracker/internal/timelog"
	"github.com/gin-gonic/gin"
)

func newTimelogRepo() (*repository.TimelogRepository, error) {
	db, err := db.OpenDB()
	return repository.NewTimelogRepository(db), err
}

func newTimelogCreateCommand() (*timelog.CreateCommand, error) {
	repo, err := newTimelogRepo()
	return timelog.NewCreateCommand(repo), err
}

func getTimelogById(c *gin.Context) {
	id_param := c.Param("id")
	id, err := strconv.Atoi(id_param)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id parameter is invalid"})
		return
	}

	repo, err := newTimelogRepo()
	if err != nil {
		errorConnectingToDatabase(c)
		return
	}
	
	if timelog, err := repo.Get(id); err == nil {
		c.IndentedJSON(http.StatusOK, timelog)
	} else {
		errorNotFound(c)
	}
}

func getTimelogsByActivityId(c *gin.Context) {
	repo, err := newTimelogRepo()
	if err != nil {
		errorConnectingToDatabase(c)
		return
	}

	id_param := c.Param("id")
	id, err := strconv.Atoi(id_param)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id parameter is invalid"})
		return
	}

	if timelogs, err := repo.GetByActivityId(id); err == nil {
		c.IndentedJSON(http.StatusOK, timelogs)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error reading timelogs"})
	}
}

func createTimelog(c *gin.Context) {
	cmd, err := newTimelogCreateCommand()
	if err != nil {
		errorConnectingToDatabase(c)
		return
	}

	var timelog timelog.TimeLog
	if err = c.ShouldBindJSON(&timelog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}


	if newTimelog, err := cmd.Create(timelog); err == nil {
		c.IndentedJSON(http.StatusOK, newTimelog)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error creating timelog"})
	}
}

func addTimelogRoutes(router *gin.RouterGroup) {
	router.GET("/:id", getTimelogById)
	router.GET("/activity/:id", getTimelogsByActivityId)
	router.POST("/", createTimelog)
}