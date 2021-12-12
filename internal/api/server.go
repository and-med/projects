package api

import (
	"github.com/gin-gonic/gin"
)

func RunServer() error {
	router := gin.Default()

	api := router.Group("/api")
	addAuthRoutes(api)
	addActivityRoutes(api.Group("/activity"))
	addTimelogRoutes(api.Group("/timelog"))

	return router.Run("localhost:8080")
}
