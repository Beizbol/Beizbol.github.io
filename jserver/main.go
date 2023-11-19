package main

import (
	"fmt"
	"net/http"
	"os"
)

// func handler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "Hello, %s", r.URL.Path[1:])
// }

func main() {
	err := os.Chdir("..")
	if err != nil {
		fmt.Println(err)
	}

	cwd, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}

	fmt.Printf("Starting JServer! %s", cwd)
	// http.HandleFunc("/", handler)
	// http.Handle("/j", http.NotFoundHandler())
	http.Handle("/", http.FileServer(http.Dir("www")))

	http.ListenAndServe(":8080", nil)
}
