package auth

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

type AuthService struct {
	Repository
}

func NewAuthService(r Repository) *AuthService {
	return &AuthService{
		Repository: r,
	}
}

func (ls *AuthService) Login(username string, password string) (string, error) {
	hash, err := ls.Repository.GetPasswordHash(username)
	if err != nil {
		return "", err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		return "", err
	}

	user, err := ls.Repository.GetByUsername(username)
	if err != nil {
		return "", err
	}

	return generateToken(user.ID)
}

func (ls *AuthService) Register(u User, password string) (User, error) {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 14)

	if err != nil {
		return User{}, err
	}

	return ls.Repository.Create(u, string(hash))
}

func generateToken(userId int) (string, error) {
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
