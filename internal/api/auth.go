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

type Register struct {
	Username  string `json:"username"`
	Password  string `json:"password"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastname"`
}

func newUserRepository() (auth.Repository, error) {
	db, err := db.OpenDB()
	return repository.NewUserRepository(db), err
}

func newAuthService() (*auth.AuthService, error) {
	repo, err := newUserRepository()
	return auth.NewAuthService(repo), err
}

func login(c *gin.Context) {
	var l Login
	if err := c.ShouldBindJSON(&l); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	service, err := newAuthService()
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

func register(c *gin.Context) {
	var r Register
	if err := c.ShouldBindJSON(&r); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	service, err := newAuthService()
	if err != nil {
		errorConnectingToDatabase(c)
		return
	}

	user := auth.User{
		FirstName: r.FirstName,
		LastName:  r.LastName,
		Username:  r.Username,
	}
	if user, err := service.Register(user, r.Password); err == nil {
		c.JSON(http.StatusOK, user)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func addAuthRoutes(router *gin.RouterGroup) {
	router.POST("/login", login)
	router.POST("/register", register)
}
