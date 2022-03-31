package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {

	var start time.Time

	for i := 0; i < 1000; i++ {
		start = time.Now()
		_, err := http.Get("http://127.0.0.1:3000/hello/World?q=foo")
		if err != nil {
			fmt.Println(i, err)
		} else {
			fmt.Println(i, time.Since(start))
		}
	}

}
