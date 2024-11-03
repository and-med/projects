package auth

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	repo Repository
}

func NewAuthService(r Repository) *AuthService {
	return &AuthService{
		repo: r,
	}
}

func (ls *AuthService) Login(username string, password string) (string, error) {
	hash, err := ls.repo.GetPasswordHash(username)
	if err != nil {
		log.Print("error retrieving password hash:", err)
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		log.Print("error comparing hash:", err)
		return "", err
	}

	user, err := ls.repo.GetByUsername(username)
	if err != nil {
		log.Print("error retrieving user by username:", err)
		return "", err
	}

	return ls.generateToken(user.ID)
}

func (ls *AuthService) Register(u User, password string) (User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		log.Print("error generating password:", err)
		return User{}, err
	}

	return ls.repo.Create(u, string(hash))
}

func (ls *AuthService) ParseToken(tokenString string) (User, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("ACCESS_SECRET")), nil
	})
	if err != nil {
		return User{}, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

		if userId, ok := (claims["user_id"]).(float64); !ok {
			return User{}, fmt.Errorf("error parsing user_id claim: %v", err)
		} else {
			return ls.repo.GetById(int(userId))
		}
	}

	return User{}, fmt.Errorf("token is not valid")
}

func (ls *AuthService) generateToken(userId int) (string, error) {
	claims := jwt.MapClaims{}
	claims["authorized"] = true
	claims["user_id"] = userId
	claims["exp"] = time.Now().Add(15 * time.Minute).Unix()
	tkn := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	if token, err := tkn.SignedString([]byte(os.Getenv("ACCESS_SECRET"))); err == nil {
		return token, nil
	} else {
		return "", err
	}
}
