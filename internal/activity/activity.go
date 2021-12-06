package activity

type Activity struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ActivityRepository interface {
	GetAll() ([]Activity, error)
	Get(int64) (Activity, error)
	Create(Activity) (Activity, error)
	Close() error
}
