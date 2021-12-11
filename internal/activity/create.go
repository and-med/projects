package activity

type CreateCommand struct {
	Repository
}

func NewCreateCommand(r Repository) *CreateCommand {
	return &CreateCommand{
		Repository: r,
	}
}

func (cc *CreateCommand) Create(a Activity) (Activity, error) {
	return cc.Repository.Create(a)
}
