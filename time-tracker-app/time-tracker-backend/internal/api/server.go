package api

import (
	"github.com/gin-gonic/gin"
)

func RunServer() error {
	engine := gin.Default()

	engine.Use(AuthMidleware())

	apiRouter := engine.Group("/api")
	addAuthRoutes(apiRouter)
	addActivityRoutes(apiRouter.Group("/activity", mustAuthorize))
	addTimelogRoutes(apiRouter.Group("/timelog", mustAuthorize))

	return engine.Run(":8080")
}
