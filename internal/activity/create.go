package activity

type CreateActivityCommand struct {
	Repository ActivityRepository
}

func NewCreateActivityCommand(r ActivityRepository) *CreateActivityCommand {
	return &CreateActivityCommand{
		Repository: r,
	}
}

func (c *CreateActivityCommand) Create(a Activity) (Activity, error) {
	return c.Repository.Create(a)
}

func (c *CreateActivityCommand) Close() error {
	return c.Repository.Close()
}
