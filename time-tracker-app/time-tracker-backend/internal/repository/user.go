package repository

import (
	"database/sql"
	"fmt"

	"github.com/and-med/go-time-tracker/internal/auth"
)

var (
	userFields    string = "id, username, first_name, last_name"
	userTableName string = "users"
)

func scanUser(row rowScanner) (auth.User, error) {
	u := auth.User{}
	err := row.Scan(&u.ID, &u.Username, &u.FirstName, &u.LastName)
	return u, err
}

type UserRepository struct {
	DB *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
	return &UserRepository{
		DB: db,
	}
}

func (ur *UserRepository) GetPasswordHash(username string) (string, error) {
	query := fmt.Sprintf("SELECT password_hash FROM %s WHERE username=$1", userTableName)
	row := ur.DB.QueryRow(query, username)

	var passwordHash string
	err := row.Scan(&passwordHash)
	return passwordHash, err
}

func (ur *UserRepository) GetByUsername(username string) (auth.User, error) {
	query := fmt.Sprintf("SELECT %s FROM %s WHERE username=$1", userFields, userTableName)
	row := ur.DB.QueryRow(query, username)

	return scanUser(row)
}

func (ur *UserRepository) GetById(id int) (auth.User, error) {
	query := fmt.Sprintf("SELECT %s FROM %s WHERE id=$1", userFields, userTableName)
	row := ur.DB.QueryRow(query, id)

	return scanUser(row)
}

func (ur *UserRepository) Create(u auth.User, passwordHash string) (auth.User, error) {
	query := fmt.Sprintf("INSERT INTO %s(username, first_name, last_name, password_hash) VALUES($1, $2, $3, $4) RETURNING %s", userTableName, userFields)
	row := ur.DB.QueryRow(query, u.Username, u.FirstName, u.LastName, passwordHash)

	return scanUser(row)
}
