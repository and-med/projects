package api

import (
	"github.com/gin-gonic/gin"
)

func RunServer() error {
	router := gin.Default()

	addActivityRoutes(router)

	return router.Run("localhost:8080")
}
