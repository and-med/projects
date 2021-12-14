package auth

type User struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type Repository interface {
	GetPasswordHash(username string) (string, error)
	GetByUsername(username string) (User, error)
	GetById(id int) (User, error)
	Create(u User, passwordHash string) (User, error)
}
