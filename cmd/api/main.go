package main

import "github.com/and-med/go-time-tracker/internal/api"

func main() {
	router := api.CreateRouter()

	router.Run("localhost:8080")
}
