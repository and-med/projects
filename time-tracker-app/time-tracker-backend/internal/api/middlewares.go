package api

import (
	"log"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMidleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		jwt := getJwt(c.Request.Header.Get("Authorization"))

		if jwt != "" {
			authService, err := newAuthService()
			if err != nil {
				log.Print("err connecting to database:", err)
				return
			}

			if user, err := authService.ParseToken(jwt); err == nil {
				c.Set("user", user)
			} else {
				log.Print("err parsing token:", err)
			}
		}

		c.Next()
	}
}

func getJwt(header string) string {
	values := strings.Split(header, " ")
	if len(values) == 2 && values[0] == "Bearer" {
		return values[1]
	}

	return ""
}
