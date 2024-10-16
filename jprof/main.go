package main

import (
	"fmt"
	"net/http"
)

func main() {

	println("Go serving port 4201")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {

		fmt.Printf("Go: %s %s", r.URL.Scheme, r.URL.Path)

		println("Request received")
		fmt.Fprintf(w, "Hello, World!")
	})

	http.ListenAndServe(":4201", nil)
}

// go run .
