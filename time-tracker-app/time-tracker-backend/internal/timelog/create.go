package timelog

type CreateCommand struct {
	Repository
}

func NewCreateCommand(r Repository) *CreateCommand {
	return &CreateCommand{
		Repository: r,
	}
}

func (cc *CreateCommand) Create(tl TimeLog) (TimeLog, error) {
	return cc.Repository.Create(tl)
}
