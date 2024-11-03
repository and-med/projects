package api

import (
	"log"
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

type AuthorizedUserRetriever struct {
	Context *gin.Context
}

func NewAuthorizedUserRetriever(c *gin.Context) *AuthorizedUserRetriever {
	return &AuthorizedUserRetriever{
		Context: c,
	}
}

func (r *AuthorizedUserRetriever) Get() (auth.User, bool) {
	if value, exists := r.Context.Get("user"); exists {
		user, ok := value.(auth.User)
		return user, ok
	}

	return auth.User{}, false
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
		log.Print("error binding json", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	service, err := newAuthService()
	if err != nil {
		log.Print("error connecting to db", err)
		errorConnectingToDatabase(c)
		return
	}

	if token, err := service.Login(l.Username, l.Password); err == nil {
		c.JSON(http.StatusOK, gin.H{"accessToken": token})
	} else {
		log.Print("error logging in:", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "user is not authorized"})
	}
}

func register(c *gin.Context) {
	var r Register
	if err := c.ShouldBindJSON(&r); err != nil {
		log.Print("error binding json", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
		return
	}

	service, err := newAuthService()
	if err != nil {
		log.Print("error connecting to db", err)
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
		log.Print("error registering user:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err})
	}
}

func me(c *gin.Context) {
	retriever := NewAuthorizedUserRetriever(c)

	if user, ok := retriever.Get(); ok {
		c.JSON(http.StatusOK, user)
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
	}
}

func mustAuthorize(c *gin.Context) {
	if user, exist := c.Get("user"); exist {
		if _, ok := user.(auth.User); ok {
			return
		}
	}

	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
}

func addAuthRoutes(router *gin.RouterGroup) {
	router.POST("login", login)
	router.POST("register", register)
	router.GET("me", mustAuthorize, me)
}
