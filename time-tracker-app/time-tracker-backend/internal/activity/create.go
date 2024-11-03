package activity

import (
	"errors"

	"github.com/and-med/go-time-tracker/internal/auth"
)

type CreateCommand struct {
	Repository
	UserRetriever auth.AuthorizedUserRetriever
}

func NewCreateCommand(r Repository, aur auth.AuthorizedUserRetriever) *CreateCommand {
	return &CreateCommand{
		Repository:    r,
		UserRetriever: aur,
	}
}

func (cc *CreateCommand) Create(a Activity) (Activity, error) {
	if user, ok := cc.UserRetriever.Get(); ok {
		a.UserId = user.ID
		return cc.Repository.Create(a)
	}

	return Activity{}, errors.New("user not found")
}
