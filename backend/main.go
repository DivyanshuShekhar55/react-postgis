package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
)

type dbconfig struct {
	conn *pgx.Conn
	// maybe define some max conections (active/idle)
	// but abhi ke liye itna hi kaafi hai
}

type config struct {
	addr string
	db   dbconfig
	env  string
}

type Application struct {
	conf config
}

func main() {
	pg_conn_str := os.Getenv("PG_CONN")
	env := os.Getenv("ENV")

	if pg_conn_str == "" {
		fmt.Print("couldnt find conn string")
		return
	}

	ctx := context.Background()

	db, err := pgx.Connect(ctx, pg_conn_str)
	if err != nil {
		panic(err)
	}

	defer db.Close(ctx)

	pg := dbconfig{
		conn: db,
	}

	conf := config{
		addr: ":6969",
		db:   pg,
		env:  env,
	}

	app := Application{
		conf: conf,
	}

	srv := http.Server{
		Addr:         app.conf.addr,
		IdleTimeout:  time.Second * 30,
		WriteTimeout: time.Second * 60,
		ReadTimeout:  time.Second * 30,
	}

	err = srv.ListenAndServe()
	if err != nil {
		fmt.Printf("error starting server %v", err)
		panic(err)
	}

	defer srv.Close()

}
