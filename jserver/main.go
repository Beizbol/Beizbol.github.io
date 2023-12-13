package main

import (
	"log"
	"jakesite/jserver/handlers"
	"github.com/gofiber/fiber/v2"
)

// https://github.com/gofiber/boilerplate/tree/master
func main() {

	log.Println("Starting fiber...")

	// todo - make these configurable
	path := "../docs" // dist | output | public | www
	port := ":3000"   // 80 | 8080 | 4321

	app := fiber.New()
	app.Static("/", path) // serve files
	app.Use("/api", handlers.api)
	err := app.Listen(port)
	log.Fatal(err)
}
