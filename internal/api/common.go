package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func errorConnectingToDatabase(c *gin.Context) {
	c.JSON(http.StatusInternalServerError, gin.H{"error": "cannot connect to database"})
}

func errorNotFound(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
}