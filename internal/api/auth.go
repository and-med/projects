package api

import (
	"net/http"

	"github.com/and-med/go-time-tracker/internal/auth"
	"github.com/and-med/go-time-tracker/internal/db"
	"github.com/and-med/go-time-tracker/internal/repository"
	"github.com/gin-gonic/gin"
)

type Login struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func newUserRepository() (auth.Repository, error) {
	db, err := db.OpenDB()
	return repository.NewUserRepository(db), err
}

func newLoginService() (*auth.LoginService, error) {
	repo, err := newUserRepository()
	return auth.NewLoginService(repo), err
}

func login(c *gin.Context) {
	var l Login
	if err := c.ShouldBindJSON(&l); err != nil {
		internalServerError(c, err)
		return
	}

	service, err := newLoginService()
	if err != nil {
		errorConnectingToDatabase(c)
		return
	}

	if token, err := service.Login(l.Username, l.Password); err == nil {
		c.JSON(http.StatusOK, gin.H{"accessToken": token})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": err})
	}
}

func addAuthRoutes(router *gin.RouterGroup) {
	router.POST("/login", login)
}
