package main

import (
	"os"
	"path/filepath"
)

// func handler(w http.ResponseWriter, r *http.Request) {
// 	fmt.Fprintf(w, "Hello, %s", r.URL.Path[1:])
// }

func main() {
	m := newMin()
	in_dir := os.Args[1]
	out_dir := os.Args[2]

	// all files in in_dir and subdirs
	files, err := filepath.Glob(in_dir + "/**/*")
	if err != nil {
		panic(err)
	}

	err = shrink(m, files, out_dir)
	if err != nil {
		panic(err)
	}

}

func runPipe() {}
