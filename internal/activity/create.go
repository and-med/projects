package activity

type CreateCommand struct {
	Repository
}

func NewCreateCommand(r Repository) *CreateCommand {
	return &CreateCommand{
		Repository: r,
	}
}

func (c *CreateCommand) Create(a Activity) (Activity, error) {
	return c.Repository.Create(a)
}
