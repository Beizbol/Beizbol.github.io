package main

import (
	"log"
	"os"
	"path/filepath"
	"regexp"

	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
	"github.com/tdewolff/minify/v2/html"
	"github.com/tdewolff/minify/v2/js"
	"github.com/tdewolff/minify/v2/json"
	"github.com/tdewolff/minify/v2/svg"
	"github.com/tdewolff/minify/v2/xml"
)

type jmin = *minify.M

func newMin() jmin {
	m := minify.New()
	m.AddFunc("text/css", css.Minify)
	m.AddFunc("text/html", html.Minify)
	m.AddFunc("image/svg+xml", svg.Minify)
	m.AddFuncRegexp(regexp.MustCompile("^(application|text)/(x-)?(java|ecma)script$"), js.Minify)
	m.AddFuncRegexp(regexp.MustCompile("[/+]json$"), json.Minify)
	m.AddFuncRegexp(regexp.MustCompile("[/+]xml$"), xml.Minify)
	return m
}

func shrink(m jmin, files []string, out string) error {
	for _, f := range files {
		err := _shrink(m, f, out)
		if err != nil {
			return err
		}
	}
	return nil
}

func asMinType(ext string) string {
	switch ext {
	case ".css":
		return "text/css"
	case ".html":
		return "text/html"
	case ".js":
		return "application/javascript"
	case ".json":
		return "application/json"
	case ".svg":
		return "image/svg+xml"
	case ".xml":
		return "application/xml"
	default:
		return ""
	}
}

func _shrink(m jmin, url string, out string) error {
	b, err := os.ReadFile(url)
	if err != nil {
		log.Fatalf("unable to read file: %v", err)
	}
	ext := filepath.Ext(url)
	mt := asMinType(ext)
	smol, err := m.Bytes(mt, b)
	if err != nil {
		return err
	}
	err = os.WriteFile(url, smol, 0644)
	if err != nil {
		return err
	}
	return nil
}
