package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type Project struct {
	ID string `json:"id"`
	Name string `json:"name"`
	Description string `json:"description"`
}

var projects = []Project {
	{ ID: "1", Name: "Checkout", Description: "Some of the work I'm doing." },
	{ ID: "2", Name: "TimeTracker", Description: "My Time Tracker" },
}

func getProjects(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, projects)
}

func getProjectById(c *gin.Context) {
	id := c.Param("id")
	for _, project := range projects {
		if project.ID == id {
			c.IndentedJSON(http.StatusOK, project)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "Project Not Found!"})
}

func postProjects(c *gin.Context) {
	var newProject Project

	if err := c.BindJSON(&newProject); err != nil {
		return
	}

	projects = append(projects, newProject)
	c.IndentedJSON(http.StatusCreated, newProject)
}

func main() {
	router := gin.Default()
	router.GET("/projects", getProjects)
	router.GET("/projects/:id", getProjectById)
	router.POST("/projects", postProjects)

	router.Run("localhost:8080")
}
