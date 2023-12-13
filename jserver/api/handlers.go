package handlers

import "github.com/gofiber/fiber/v2"

// func api() fiber.Handler {
// 	return func(c *fiber.Ctx) error {
// 		return c.SendString("Hello, World 👋!")
// 	}
// }

// NotFound returns custom 404 page
func NotFound(c *fiber.Ctx) error {
	return c.Status(404).SendFile("./static/private/404.html")
}
